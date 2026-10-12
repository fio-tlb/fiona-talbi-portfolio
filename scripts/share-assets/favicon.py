"""Monogramme « FT » du favicon : lettres de Fraunces converties en tracés (aucune police requise).

Usage (pip install fonttools brotli), réglages de public/favicon.svg :
  python3 scripts/share-assets/favicon.py \
    node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2 \
    18 560 43 public/favicon.svg -110
Arguments : police, opsz, graisse, corps (unités du viewBox 64), sortie, approche (unités de la police).
Relancer ensuite render.mjs pour régénérer apple-touch-icon.png.
"""

import sys

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SRC = sys.argv[1]
opsz, wght, size, out = float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), sys.argv[5]
track = float(sys.argv[6]) if len(sys.argv) > 6 else 0
radius = sys.argv[7] if len(sys.argv) > 7 else "8"

font = instancer.instantiateVariableFont(TTFont(SRC), {"opsz": opsz, "wght": wght})
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm
names = [cmap[ord(c)] for c in "FT"]

x = 0
placements = []
for n in names:
    placements.append((n, x))
    x += gs[n].width + track

bp = BoundsPen(gs)
for n, dx in placements:
    gs[n].draw(TransformPen(bp, (1, 0, 0, 1, dx, 0)))
xmin, ymin, xmax, ymax = bp.bounds
scale = size / upm
w = (xmax - xmin) * scale
h = (ymax - ymin) * scale
ox = (64 - w) / 2 - xmin * scale
oy = (64 + h) / 2 + ymin * scale


def fmt(v):
    s = "%.2f" % v
    return s.rstrip("0").rstrip(".") if "." in s else s


pen = SVGPathPen(gs, ntos=fmt)
for n, dx in placements:
    gs[n].draw(TransformPen(pen, (scale, 0, 0, -scale, ox + dx * scale, oy)))
d = pen.getCommands()
rect = f'<rect width="64" height="64" rx="{radius}" fill="#f7efe4"/>' if radius != "none" else '<rect width="64" height="64" fill="#f7efe4"/>'
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    f'{rect}<path fill="#7a1e2c" d="{d}"/></svg>\n'
)
with open(out, "w") as fh:
    fh.write(svg)
print(out, len(svg), "bytes; glyph box", round(w, 1), "x", round(h, 1))
