#!/usr/bin/env python3
"""Build small JPEGs for the archive cover and article cards (Pillow, development only)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCES = (
    "sm-day.jpeg", "btm-exterior.jpeg", "haunted-exterior.jpg", "bb-castle.jpeg",
    "world-bazaar-seasonal.jpeg", "cinderella-castle-sunny.jpg", "tl-space-day.jpeg",
    "smallworld-exterior-day.jpeg", "tdl-ep-bluefairy.jpeg", "tot-exterior.jpg",
    "arabian-coast-market-street.jpeg", "fantasy-springs-rockwork-waterfall.jpeg",
    "soarin-exterior.jpeg", "raging-altar.jpeg", "indy-temple.jpeg",
    "aquatopia-entrance.jpeg",
)
WIDTHS = (800, 1200)


def output_name(source, width):
    suffix = "-800" if width == 800 else ""
    return f"{Path(source).stem}-archive{suffix}.jpg"


def main():
    original_bytes = optimized_bytes = 0
    for source in SOURCES:
        path = ROOT / source
        with Image.open(path) as original:
            base = ImageOps.exif_transpose(original).convert("RGB")
            for width in WIDTHS:
                destination = ROOT / output_name(source, width)
                if source == "fantasy-springs-rockwork-waterfall.jpeg":
                    # The card is 4:3 with object-position:center 20%; keep that visible crop.
                    image = ImageOps.fit(base, (width, width * 3 // 4),
                                         Image.Resampling.LANCZOS, centering=(0.5, 0.2))
                elif base.width > width:
                    image = base.resize((width, round(base.height * width / base.width)), Image.Resampling.LANCZOS)
                else:
                    image = base
                image.save(destination, format="JPEG", quality=80, optimize=True, progressive=True,
                           icc_profile=original.info.get("icc_profile"))
                if width == 800:
                    optimized_bytes += destination.stat().st_size
                print(f"{source} → {destination.name}: {path.stat().st_size:,} → {destination.stat().st_size:,} bytes")
        original_bytes += path.stat().st_size
    print(f"Card display bytes at 800px: {original_bytes:,} → {optimized_bytes:,} bytes")


if __name__ == "__main__":
    main()
