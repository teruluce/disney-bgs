#!/usr/bin/env python3
"""Rebuild display-only image variants (requires Pillow; originals stay untouched)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]

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

if __name__ == "__main__":
    main()
