#!/usr/bin/env python3
"""Genera un video 3D (Santi + robot Claude) con voz, efectos y música a partir de un story.json.
Uso: python3 hacer.py story.json salida_dir [--rapido]
  --rapido: 720x1280 (para pruebas). Por defecto 1080x1920 a 24 fps.
Salida: salida_dir/video.mp4, caption.txt, miniatura.jpg
"""
import json, sys, os, subprocess, wave, base64, shutil, time
import numpy as np
from multiprocessing import Process
from scipy.signal import lfilter

HERE = os.path.dirname(os.path.abspath(__file__))
PIPER = '/tmp/voz/piper/piper'; MODEL = '/tmp/voz/carlfm/es-carlfm-x-low.onnx'
SR = 48000; FPS = 24

story = json.load(open(sys.argv[1], encoding='utf-8'))
OUT = sys.argv[2]; os.makedirs(OUT, exist_ok=True)
RAPIDO = '--rapido' in sys.argv
W, H = (720, 1280) if RAPIDO else (1080, 1920)
WORK = os.path.join(OUT, 'work'); os.makedirs(WORK, exist_ok=True)

def sh(*a): subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# ---------- 1) voces ----------
def readwav(f):
    w = wave.open(f); sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
    t = np.arange(int(len(x) * SR / sr)) * sr / SR
    return np.interp(t, np.arange(len(x)), x)

_V = {}
def _voice(n):
    from piper import PiperVoice
    if n not in _V: _V[n] = PiperVoice.load(f'/tmp/voz2/vits-piper-{n}/{n}.onnx')
    return _V[n]
VOZ = {'h': 'es_MX-claude-high', 'r': 'es_AR-daniela-high', None: 'es_ES-davefx-medium'}
def tts(txt, i, who):
    raw = f'{WORK}/l{i}_raw.wav'; out = f'{WORK}/l{i}.wav'
    with wave.open(raw, 'wb') as w: _voice(VOZ[who]).synthesize_wav(txt, w)
    # tono: Santi natural, robot un poco más grave, narrador natural
    f = {'h': 1.0, 'r': 0.93, None: 1.0}[who]
    sh('ffmpeg', '-y', '-i', raw, '-af', f'asetrate=22050*{f},aresample=22050,atempo={1/f}', out)
    x = readwav(out)
    if who == 'r':   # toque robótico suave (eco metálico corto), se entiende bien
        d = int(0.011 * SR); y = np.zeros_like(x); y[d:] = x[:-d]; x = x + 0.32 * y
        t = np.arange(len(x)) / SR; x = x * (0.82 + 0.18 * np.sin(2 * np.pi * 95 * t))
    x = np.trim_zeros(x, 'fb') if np.abs(x).max() > 0 else x
    return x / max(1e-6, np.abs(x).max()) * 0.9

cuts = story['cuts']
voices = []
for i, c in enumerate(cuts):
    txt = c.get('say') or c.get('sub')
    voices.append(tts(txt, i, c.get('who')) if txt and not c.get('card') else None)

# ---------- 2) tiempos ----------
t = 0.0; T = []
for i, c in enumerate(cuts):
    if c.get('card'): d = 1.8
    else:
        dv = len(voices[i]) / SR if voices[i] is not None else 0
        d = max(2.3, dv + 0.75)
        if c.get('type'): d = max(d, 0.3 + len(c['type']) / 9 + 0.5)
        if i == 0: d += 0.3
    T.append((t, d)); t += d
END = t + 0.6
for i, c in enumerate(cuts): c['t'] = round(T[i][0], 3)
robot_on = next((c['t'] for c in cuts if c.get('wake')), -1)
STORY = {'end': END, 'robotOn': robot_on, 'cuts': cuts}
json.dump(STORY, open(f'{WORK}/story_timed.json', 'w'), ensure_ascii=False, indent=1)

# ---------- 3) audio ----------
N = int(END * SR) + SR
rng = np.random.default_rng(11)
voz = np.zeros(N); fx = np.zeros(N); mus = np.zeros(N); amb = np.zeros(N)
def put(buf, x, at, g=1.0):
    i = int(at * SR)
    if i < 0 or i >= len(buf): return
    x = x[:len(buf) - i]; buf[i:i + len(x)] += x * g
def env(n, a=.003, d=None):
    tt = np.arange(n) / SR; return np.minimum(1, tt / a) * np.exp(-tt / (d or (n / SR / 4)))
def tone(f0, f1, dur, shape='sin', amp=.5, a=.004, dec=None):
    n = int(dur * SR); f = np.linspace(f0, f1, n); ph = 2 * np.pi * np.cumsum(f) / SR
    y = np.sin(ph) if shape == 'sin' else np.sign(np.sin(ph)) * .6 if shape == 'sq' else 2 * np.abs(2 * ((ph / (2 * np.pi)) % 1) - 1) - 1
    return y * env(n, a, dec or dur / 3) * amp
def noise_burst(dur, lp=30, amp=.5, dec=None):
    n = int(dur * SR); x = np.convolve(rng.normal(0, 1, n), np.ones(lp) / lp, 'same')
    return x * env(n, .001, dec or dur / 3) * amp * 3
def S(*xs):
    n=max(len(x) for x in xs);o=np.zeros(n)
    for x in xs:o[:len(x)]+=x
    return o
def whoosh(dur=.28, amp=.35):
    n = int(dur * SR); x = np.convolve(rng.normal(0, 1, n), np.ones(60) / 60, 'same')
    return x * np.sin(np.pi * np.arange(n) / n) ** 2 * amp * 5
def click():
    return S(noise_burst(.03, 4, .35, .006), tone(1800, 900, .02, 'sin', .1, .001, .008))
def ding():
    return S(tone(1320, 1320, 1.0, 'sin', .35, .002, .35), tone(1980, 1980, .8, 'sin', .15, .002, .25))
def boot():   # robot despierta: bip-bip ascendente
    out = np.zeros(int(.9 * SR))
    for k, f in enumerate([523, 659, 784, 1047]): put(out, tone(f, f, .11, 'sq', .22, .002, .06), k * .13)
    return out
def scratch():   # disco rayado
    n = int(.45 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(900 - 700 * tt / tt[-1]) / SR) * np.convolve(rng.normal(0, 1, n), np.ones(5) / 5, 'same') * 1.3 * np.exp(-tt * 4) * .6
def bonk():
    return S(tone(260, 120, .3, 'sin', .6, .002, .1), noise_burst(.04, 6, .3, .01))
def wah():
    out = np.zeros(int(2.0 * SR))
    for k, (a, b) in enumerate([(392, 370), (370, 349), (349, 330), (311, 220)]):
        d = .38 if k < 3 else 1.0
        n = int(d * SR); f = np.linspace(a, b, n) * (1 + .035 * np.sin(2 * np.pi * 6 * np.arange(n) / SR))
        y = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .5 + np.sin(2 * np.pi * np.cumsum(f) / SR) * .5
        put(out, y * env(n, .01, d * .6) * .35, k * .4)
    return out
def tada():
    out = np.zeros(int(1.6 * SR))
    for k, f in enumerate([523, 659, 784, 1047]): put(out, tone(f, f, .5, 'sq', .2, .005, .3), k * .12)
    return out
def blip_panic():
    out = np.zeros(int(1.5 * SR))
    for k in range(9): put(out, tone(700 + 200 * (k % 3), 700 + 200 * (k % 3), .06, 'sq', .15, .002, .03), k * .13)
    return out

for i, c in enumerate(cuts):
    s, d = T[i]
    if voices[i] is not None: put(voz, voices[i], s + 0.2)
    if i > 0 and not c.get('card') and not cuts[i - 1].get('card'): put(fx, whoosh(.22, .5), s - .06)
    if c.get('card'):
        put(fx, ding(), s + .1); put(fx, whoosh(.3, .6), s - .1)
        for k in range(4): put(fx, tone(900, 900, .03, 'sin', .12, .001, .01), s + .15 + k * .4)   # tic tac
    if c.get('type'):
        for k in range(len(c['type'])): put(fx, click(), s + .3 + k / 9 + rng.uniform(-.01, .01), rng.uniform(.5, 1.0))
    if c.get('wake'): put(fx, scratch(), s - .05); put(fx, boot(), s + .3)
    if c.get('surprise'): put(fx, bonk(), s + .15)
    if c.get('panic'): put(fx, blip_panic(), s + .1, .5)
    if c.get('screen') == 'B' and c.get('cam') == 'monitor' and c.get('who') == 'h':
        for k in range(10): put(fx, click(), s + .1 + k * .09, .4)
    if c.get('end'):
        if c.get('end') == 'tada': put(fx, tada(), s + .2, 1.0)
        elif c.get('end') != 'none': put(fx, wah(), s + max(1.2, d - 1.1), 1.0)

# ambiente nocturno: zumbido grave + grillos
tt = np.arange(N) / SR
amb += .012 * np.sin(2 * np.pi * 60 * tt) + .02 * np.convolve(rng.normal(0, 1, N), np.ones(400) / 400, 'same')
chirp = (np.sin(2 * np.pi * 4300 * tt) * (np.sin(2 * np.pi * 7 * tt) > .6) * (np.sin(2 * np.pi * .35 * tt) > -.2))
amb += .012 * chirp

# música lo-fi suave (Am - F - C - G), acordes + bajo + kick/hat
bpm = 84; beat = 60 / bpm; chords = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [48, 52, 55]), (55, [55, 59, 62])]
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
nbars = int(END / (beat * 4)) + 2
for b in range(nbars):
    root, notes = chords[b % 4]; s = b * beat * 4
    dur = beat * 4
    for m in notes:
        n = int(dur * SR); y = (np.sin(2 * np.pi * mf(m + 12) * np.arange(n) / SR) + .4 * np.sin(2 * np.pi * mf(m + 24) * np.arange(n) / SR))
        put(mus, y * np.minimum(1, np.arange(n) / (.15 * SR)) * np.exp(-np.arange(n) / SR / 2.2) * .05, s)
    for k in (0, 2):   # bajo
        put(mus, tone(mf(root - 12), mf(root - 12), beat * 1.6, 'sin', .18, .01, .5), s + k * beat)
    for k in range(4):  # kick
        if k in (0, 2): put(mus, tone(120, 45, .2, 'sin', .32, .002, .07), s + k * beat)
    for k in range(8):  # hat
        put(mus, noise_burst(.04, 3, .05, .012), s + k * beat / 2 + (.02 if k % 2 else 0))
    put(mus, noise_burst(.12, 14, .12, .04), s + beat)      # caja
    put(mus, noise_burst(.12, 14, .12, .04), s + 3 * beat)

# sidechain: baja la música cuando hay voz
vo = np.abs(voz); k = int(.06 * SR)
venv = np.convolve(vo, np.ones(k) / k, 'same'); venv = np.minimum(1, venv * 8)
duck = 1 - .65 * venv
mus *= duck
# fundido de música
fade = np.minimum(1, np.minimum(tt / 1.2, np.maximum(0, (END - tt) / 1.5)))
mus *= fade; amb *= fade
voz *= 1.0
mix = voz * .95 + fx * .6 + mus * .75 + amb * .8
mix *= .9 / max(1e-6, np.abs(mix).max())
wavf = f'{WORK}/audio.wav'
w = wave.open(wavf, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.clip(mix[:int(END * SR)], -1, 1) * 32767).astype(np.int16).tobytes()); w.close()

# ---------- 4) fotogramas ----------
FR = f'{WORK}/frames'; shutil.rmtree(FR, ignore_errors=True); os.makedirs(FR)
NF = int(END * FPS)
def worker(idx, nproc):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"])
        pg = b.new_page(viewport={'width': 540, 'height': 960})
        pg.add_init_script('window.__STORY=' + json.dumps(STORY, ensure_ascii=False))
        pg.goto('file://' + os.path.join(HERE, 'index.html')); pg.wait_for_timeout(700)
        pg.evaluate(f'window.__rec({W},{H})')
        for f in range(idx, NF, nproc):
            d = pg.evaluate(f'window.__frame({f / FPS})')
            open(f'{FR}/f{f:05d}.jpg', 'wb').write(base64.b64decode(d))
        b.close()
t0 = time.time()
NP = 2
ps = [Process(target=worker, args=(i, NP)) for i in range(NP)]
[p.start() for p in ps]; [p.join() for p in ps]
print('frames', NF, 'en', round(time.time() - t0), 's', flush=True)

# ---------- 5) video final ----------
sh('ffmpeg', '-y', '-framerate', str(FPS), '-i', f'{FR}/f%05d.jpg', '-i', wavf,
   '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p',
   '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', f'{OUT}/video.mp4')
_ci = next((i for i, c in enumerate(cuts) if c.get('cam') == 'human'), 1)
shutil.copy(f'{FR}/f{min(NF - 1, int(cuts[_ci]["t"] * FPS) + 20):05d}.jpg', f'{OUT}/miniatura.jpg')
open(f'{OUT}/caption.txt', 'w', encoding='utf-8').write(story.get('caption', ''))
print('listo', END, 's ->', f'{OUT}/video.mp4')
