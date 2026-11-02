import sys
from PIL import Image, ImageDraw
fs = sys.argv[2:]; out = sys.argv[1]; cols = 4; w, h = 480, 270
rows = (len(fs) + cols - 1) // cols; im = Image.new('RGB', (cols * w, rows * (h + 24)), 'white'); d = ImageDraw.Draw(im)
for i, f in enumerate(fs):
    t = Image.open(f).resize((w, h)); x, y = (i % cols) * w, (i // cols) * (h + 24); im.paste(t, (x, y + 24)); d.text((x + 6, y + 6), f.split('/')[-1], fill='black')
im.save(out, quality=85)
