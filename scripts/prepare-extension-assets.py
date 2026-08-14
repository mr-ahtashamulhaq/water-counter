from pathlib import Path

from PIL import Image


source = Path("/home/ubuntu/webdev-static-assets/water-counter-icon-clean.png")
extension_dir = Path("client/src/extension/icons")
public_dir = Path("client/public")
extension_dir.mkdir(parents=True, exist_ok=True)
public_dir.mkdir(parents=True, exist_ok=True)

image = Image.open(source).convert("RGBA")
alpha = image.getchannel("A")
bounds = alpha.getbbox()
if bounds is None:
    raise SystemExit("Generated icon has no visible pixels")

image = image.crop(bounds)
side = max(image.size)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.alpha_composite(image, ((side - image.width) // 2, (side - image.height) // 2))

for size in (16, 32, 48, 128):
    resized = canvas.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(extension_dir / f"icon{size}.png", optimize=True)

canvas.resize((32, 32), Image.Resampling.LANCZOS).save(public_dir / "favicon.png", optimize=True)
print("Prepared extension icons and favicon")
