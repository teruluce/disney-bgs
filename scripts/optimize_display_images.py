#!/usr/bin/env python3
"""Rebuild display-only image variants (requires Pillow; originals stay untouched)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]

ARTICLE_PHOTOS = (
    "aquatopia-boarding.jpeg",
    "fantasy-springs-rockwork-waterfall.jpeg",
    "indy-altar.jpeg",
    "indy-footprint.jpeg",
    "indy-plane.jpeg",
    "indy-queue.jpeg",
    "indy-temple.jpeg",
    "smallworld-exterior-night.jpeg",
    "sm-night.jpeg",
    "tdl-entrance-sunset.jpg",
    "tot-exterior.jpg",
)


def build_article_photos():
    for source in ARTICLE_PHOTOS:
        path = ROOT / source
        with Image.open(path) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            # The portrait is limited to a 480px frame. A 1000px candidate covers 2x.
            larger_width = 1000 if source == "fantasy-springs-rockwork-waterfall.jpeg" else 1200
            for width in (800, larger_width):
                if width >= image.width:
                    continue
                size = (width, round(image.height * width / image.width))
                output = ROOT / f"{path.stem}-display-{width}.jpg"
                image.resize(size, Image.Resampling.LANCZOS).save(
                    output, quality=88, optimize=True, progressive=True,
                    icc_profile=original.info.get("icc_profile"),
                )
                print(f"{output.name}: {output.stat().st_size:,} bytes")


def main():
    variants = (("teru-profile.jpg", (164, 328, 492)), ("tot-logo.png", (120, 240, 360)))
    for source, widths in variants:
        path = ROOT / source
        with Image.open(path) as original:
            image = ImageOps.exif_transpose(original)
            if path.suffix == ".png":
                image = image.convert("RGBA")
            for width in widths:
                size = (width, round(image.height * width / image.width))
                output = ROOT / f"{path.stem}-{width}{path.suffix}"
                resized = image.resize(size, Image.Resampling.LANCZOS)
                if path.suffix == ".jpg":
                    resized.save(output, quality=90, optimize=True, progressive=True,
                                 icc_profile=original.info.get("icc_profile"))
                else:
                    resized.save(output, optimize=True)
                print(f"{output.name}: {output.stat().st_size:,} bytes")
    build_article_photos()

if __name__ == "__main__":
    main()
