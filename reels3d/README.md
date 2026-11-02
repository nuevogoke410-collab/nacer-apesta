# Santi y Claude — reels 3D (TikTok + Instagram)

Cada día un video distinto (~28 s, vertical 1080x1920) con los mismos dos personajes:
**Santi** (programador low-poly, sudadera amarilla) y **Claude** (robot con asterisco naranja).

## Flujo
1. `bash preparar.sh`  → instala voces (Piper), Three.js y genera `index.html`.
2. Escribir un `story.json` nuevo (ver `story_santi.json` como ejemplo) con un tema de `temas.md`.
3. `python3 hacer.py story.json salida_dir` → `salida_dir/video.mp4`, `caption.txt`, `miniatura.jpg` (render ~12 min).
4. Subir `video.mp4` a la rama `media-reels` y programar el MISMO video en TikTok e Instagram (Reel) con Metricool.
5. Anotar el tema y la fecha en `registro.md`.

## Formato de story.json
`{"title","caption","cuts":[...]}` — cada corte:
- `cam`: `general` | `human` | `monitor` | `robot`  (o `card` con texto: `{"card":"3 HORAS\nDESPUÉS"}`)
- `sub`: subtítulo que se ve; `say`: texto hablado si difiere del subtítulo
- `who`: `"h"` (Santi) | `"r"` (Claude) | `null` (narrador)
- `screen`: `A` (buscador) | `B` (web retro años 90) | `T` (terminal/chat genérico) | `off`
  - Para `T`: `screenTitle` y `screenLines` (líneas; prefijo `!` rojo, `$` verde, `>` azul, `?` amarillo)
  - Con `type`: texto que se escribe en el buscador (pantalla `A`)
- `panic`: Santi en pánico · `surprise`: el robot se sorprende · `wake`: el robot despierta en ese corte
  (si ningún corte tiene `wake`, el robot está despierto desde el inicio)
- `end`: en el último corte: `true` (wah-wah triste) | `"tada"` (final feliz) | `"none"`
Duración: la define la voz de cada línea (mínimo 2.3 s). Total objetivo 24–32 s, 9–11 cortes.
