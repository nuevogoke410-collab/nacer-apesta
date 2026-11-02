import json, wave, numpy as np
SR = 48000
TL = json.load(open('timeline.json')); EV = json.load(open('eventos.json'))
total = TL[-1]['end'] + 1.5
N = int(total * SR) + SR
voz = np.zeros(N); fx = np.zeros(N); mus = np.zeros(N)
rng = np.random.default_rng(7)
def read(f):
    w = wave.open(f); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
    t = np.arange(int(len(x) * SR / sr)) * sr / SR
    return np.interp(t, np.arange(len(x)), x)
for s in TL:
    for l in s['lines']:
        x = read(l['file']); i = int(l['start'] * SR); voz[i:i + len(x)] += x[:N - i]
voz *= 0.9 / max(1e-6, np.abs(voz).max())
def env(n, a=0.005, d=None):
    t = np.arange(n) / SR; e = np.minimum(1, t / a)
    return e * np.exp(-t / (d or (n / SR / 4)))
def sfx(kind):
    if kind == 'pop':
        n = int(.14 * SR); f = np.linspace(380, 950, n)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .002, .04) * .6
    if kind == 'gulp':
        n = int(.25 * SR); f = np.linspace(500, 160, n)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .005, .08) * .6
    if kind == 'thud':
        n = int(.4 * SR); t = np.arange(n) / SR
        return (np.sin(2 * np.pi * 70 * t) * env(n, .002, .12) + rng.normal(0, 1, n) * env(n, .001, .015) * .4) * .9
    if kind == 'boing':
        n = int(.6 * SR); t = np.arange(n) / SR; f = 220 + 120 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 3) + 200 * np.exp(-t * 4)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .003, .25) * .5
    if kind == 'whoosh':
        n = int(.45 * SR); t = np.arange(n) / SR; x = rng.normal(0, 1, n)
        x = np.convolve(x, np.ones(40) / 40, 'same'); e = np.sin(np.pi * t / t[-1]) ** 2
        return x * e * 1.2
    if kind == 'zas':
        a = sfx('whoosh')[:int(.2 * SR)]; b = sfx('thud'); n = int(.2 * SR); hit = rng.normal(0, 1, n) * env(n, .001, .05) * .7
        out = np.zeros(len(a) + len(b)); out[:len(a)] += a; out[len(a):] += b; out[len(a):len(a) + n] += hit; return out
    if kind == 'splash':
        n = int(.9 * SR); x = rng.normal(0, 1, n); x = np.convolve(x, np.ones(12) / 12, 'same')
        return x * env(n, .004, .22) * 1.4
    return np.zeros(1)
for e in EV:
    x = sfx(e['type']) * e['vol']; i = int(e['t'] * SR); fx[i:i + len(x)] += x[:N - i]
bpm = 96; beat = 60 / bpm
notes = [0, 2, 4, 7, 9, 12, 14]; pat = [0, 4, 2, 5, 3, 4, 1, 2]
def note(freq, dur, amp):
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * freq * t) + .3 * np.sin(2 * np.pi * freq * 4 * t) * np.exp(-t * 12)) * np.exp(-t * 6) * amp
step = beat / 2; k = 0; t0 = 0.0
while t0 < total:
    bar = int(t0 / (beat * 4)) % 4; root = [0, 5, -3, -5][bar]
    f = 392 * 2 ** ((notes[pat[k % 8]] + root) / 12)
    x = note(f, .6, .5 if k % 2 == 0 else .35); i = int(t0 * SR); mus[i:i + len(x)] += x[:N - i]
    if k % 4 == 0:
        y = note(98 * 2 ** (root / 12), 1.2, .7); mus[i:i + len(y)] += y[:N - i]
    k += 1; t0 += step
mus *= 0.07 / max(1e-6, np.abs(mus).max())
talk = np.convolve((np.abs(voz) > .02).astype(float), np.ones(int(.3 * SR)) / (.3 * SR), 'same')
mus *= 1 - .45 * np.clip(talk * 3, 0, 1)
mix = voz + fx * .5 + mus
mix *= 0.95 / np.abs(mix).max()
out = (mix * 32767).astype(np.int16)
w = wave.open('audio.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes()); w.close()
print('audio', round(len(out) / SR, 1), 's')
