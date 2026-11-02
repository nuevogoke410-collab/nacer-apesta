#!/bin/bash
# Prepara una sesión nueva (nube) para generar los videos de Santi y Claude. Tarda unos minutos.
set -e
pip install piper-tts scipy numpy --break-system-packages -q 2>&1 | tail -1 || true
mkdir -p /tmp/voz2 && cd /tmp/voz2
for m in vits-piper-es_MX-claude-high vits-piper-es_AR-daniela-high vits-piper-es_ES-davefx-medium; do
  if [ ! -d $m ]; then curl -sSL -o $m.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/$m.tar.bz2 && tar xjf $m.tar.bz2 && rm $m.tar.bz2; fi
done
cd "$(dirname "$0")"
npm i three@0.128.0 --silent --no-audit --no-fund --prefix /tmp/three3d
python3 - <<'PY'
s=open('src.html',encoding='utf-8').read()
t=open('/tmp/three3d/node_modules/three/build/three.min.js',encoding='utf-8').read()
open('index.html','w',encoding='utf-8').write(s.replace('/*THREE_INLINE*/',t.replace('</script>','<\\/script>')))
PY
echo "listo: ahora python3 hacer.py story.json salida_dir"
