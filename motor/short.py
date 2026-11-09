#!/usr/bin/env python3
"""Hace un YouTube Short (vertical 1080x1920, ~28 s) a partir del video completo de un animal.
Uso: python3 short.py video.mp4 timeline.json salida.mp4 "NACER COMO UN PULPO APESTA"
Toma el título, 4 escenas repartidas a lo largo del video y el cierre con la llamada a suscribirse."""
import json, sys, subprocess, os, glob, tempfile
video, tl, out, title = sys.argv[1:5]
T = json.load(open(tl, encoding='utf-8'))
shots = [s for s in T if not s['id'].startswith('cap') and s['id'] not in ('titulo', 'sub')]
pick = [shots[int(len(shots) * q)] for q in (0.15, 0.38, 0.62, 0.85)]
def window(sh, maxlen):
    ls = sh['lines']
    if not ls: return sh['start'], min(sh['end'], sh['start'] + maxlen)
    a = max(sh['start'], ls[0]['start'] - 0.3)
    fits = [l['start'] + l['dur'] + 0.3 for l in ls if l['start'] + l['dur'] + 0.3 <= a + maxlen]
    return a, (max(fits) if fits else a + maxlen)
segs = []
tit = next(s for s in T if s['id'] == 'titulo'); segs.append((0.0, min(tit['end'], 3.0)))
for s in pick: segs.append(window(s, 6.6))
fin = next((s for s in T if s['id'] == 'sub'), T[-1]); segs.append(window(fin, 4.6))
fonts = glob.glob('/usr/share/fonts/**/DejaVuSans-Bold.ttf', recursive=True) or glob.glob('/usr/share/fonts/**/*Bold*.ttf', recursive=True)
font = fonts[0] if fonts else ''
import textwrap
def esc(s): return s.replace(':', '\\:').replace("'", '')
words = title.split(); half = max(1, len(words) // 2 + (len(words) % 2)); title2 = ' '.join(words[:half]) + '\n' + ' '.join(words[half:])
tmp = tempfile.mkdtemp(); parts = []
TFS = min(84, int(1000 / (max(len(x) for x in title2.split('\n')) * 0.66)))
open(f'{tmp}/title.txt', 'w', encoding='utf-8').write(title2)
for i, (a, b) in enumerate(segs):
    d = b - a; f = f'{tmp}/p{i}.mp4'
    vf = ("[0:v]scale=-2:1920,crop=1080:1920,boxblur=30:3,eq=brightness=-0.3[bg];"
          "[0:v]crop=1400:975:260:0,scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:560[v1];"
          f"[v1]drawtext=fontfile={font}:textfile={tmp}/title.txt:fontsize={TFS}:line_spacing=10:fontcolor=white:borderw=7:bordercolor=black:x=(w-text_w)/2:y=190[v2];")
    cur = 'v2'; n = 0
    for L in (l for sh in T for l in sh['lines']):
        t0, t1 = L['start'] - a, L['start'] + L['dur'] - a
        if t1 <= 0 or t0 >= d: continue
        fn = f'{tmp}/s{i}_{n}.txt'; open(fn, 'w', encoding='utf-8').write('\n'.join(textwrap.wrap(L['txt'], 24)))
        vf += f"[{cur}]drawtext=fontfile={font}:textfile={fn}:fontsize=58:line_spacing=8:fontcolor=white:borderw=7:bordercolor=black:x=(w-text_w)/2:y=1330:enable='between(t,{max(0,t0):.2f},{t1:.2f})'[s{n}];"
        cur = f's{n}'; n += 1
    vf += f"[{cur}]drawtext=fontfile={font}:text='VIDEO COMPLETO EN EL CANAL':fontsize=48:fontcolor=#ffd51f:borderw=6:bordercolor=black:x=(w-text_w)/2:y=1700[v]"
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(a), '-i', video, '-t', str(d), '-filter_complex', vf, '-map', '[v]', '-map', '0:a',
                    '-af', f'afade=t=in:d=0.12,afade=t=out:st={max(0, d - 0.2)}:d=0.2', '-r', '30', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21',
                    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', f], check=True)
    parts.append(f)
open(f'{tmp}/l.txt', 'w').write(''.join(f"file '{p}'\n" for p in parts))
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{tmp}/l.txt', '-c', 'copy', '-movflags', '+faststart', out], check=True)
tot = sum(b - a for a, b in segs); print('short', round(tot, 1), 's ->', out)
