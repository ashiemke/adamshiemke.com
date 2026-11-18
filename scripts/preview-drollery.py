#!/usr/bin/env python3
"""Render drollery SVGs to PNG for review: light and dark versions, 3x size, via macOS Quick Look.

usage: python3 scripts/preview-drollery.py OUT_DIR src/assets/drolleries/NAME.svg [...]
Writes OUT_DIR/<name>.png (light) and OUT_DIR/<name>-dark.png (dark).
"""
import pathlib, re, subprocess, sys, tempfile

STYLE = """<style>
.dr-art { filter: url(#dr-rough); }
.dr-o { stroke: var(--dr-ink); stroke-width: 1.3; stroke-linejoin: round; stroke-linecap: round; }
.dr-l { fill: none; stroke: var(--dr-ink); stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; }
.dr-t { fill: none; stroke: var(--dr-ink); stroke-width: 0.9; stroke-linecap: round; stroke-dasharray: 0.5 3.5; }
.dr-r { fill: var(--dr-red); } .dr-b { fill: var(--dr-blue); } .dr-g { fill: var(--dr-gold); }
.dr-v { fill: var(--dr-green); } .dr-s { fill: var(--dr-skin); } .dr-p { fill: var(--dr-paper); }
.dr-m { fill: var(--dr-steel); } .dr-k { fill: var(--dr-ink); } .dr-n { fill: var(--dr-brown); }
.dr-text { font-family: 'Alegreya', Georgia, serif; font-style: italic; font-size: 9px; fill: var(--dr-ink); }
</style>
<filter id="dr-rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>
"""
THEMES = {
    '': ('#f4ecda', '--dr-ink:#3b2d1f;--dr-paper:#f6eedc;--dr-steel:#d3cec2;--dr-skin:#ecd2b4;--dr-red:#b5452b;--dr-blue:#35589e;--dr-gold:#c9a03c;--dr-green:#6f8a4c;--dr-brown:#8a6a45'),
    '-dark': ('#1b1711', '--dr-ink:#cdbf9f;--dr-paper:#3a3226;--dr-steel:#7f7a6e;--dr-skin:#c9a988;--dr-red:#c9573a;--dr-blue:#5a7cc4;--dr-gold:#d6b25c;--dr-green:#8aa565;--dr-brown:#a7845a'),
}
out = pathlib.Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
for f in sys.argv[2:]:
    p = pathlib.Path(f); s = p.read_text()
    vb = re.search(r'viewBox="([\d.\s-]+)"', s).group(1).split()
    w, h = float(vb[2]) * 3, float(vb[3]) * 3
    for suffix, (bg, vars_) in THEMES.items():
        doc = re.sub(r'<svg ([^>]*)>', lambda m: f'<svg {m.group(1)} width="{w:.0f}" height="{h:.0f}" style="background:{bg};{vars_}">' + STYLE, s, count=1)
        with tempfile.TemporaryDirectory() as td:
            tmp = pathlib.Path(td) / f'{p.stem}{suffix}.svg'
            tmp.write_text(doc)
            subprocess.run(['qlmanage', '-t', '-s', str(int(max(w, h))), '-o', td, str(tmp)], capture_output=True)
            png = pathlib.Path(td) / f'{tmp.name}.png'
            if png.exists():
                png.rename(out / f'{p.stem}{suffix}.png')
                print('wrote', out / f'{p.stem}{suffix}.png')
            else:
                print('FAILED', p.name, suffix)
