#!/usr/bin/env bash
# Converte uma foto original nos tamanhos usados pelo site (WebP 800 e 1600 px).
#
#   tools/otimizar-imagem.sh <foto-original> <caminho-base>
#   ex.: tools/otimizar-imagem.sh ~/fotos/infinity.jpg assets/img/produtos/pista-de-led/infinity
#
# Gera public/<caminho-base>-800.webp e public/<caminho-base>-1600.webp.
# Requer ImageMagick (comando `convert`). Depois rode `node build.js`.
set -euo pipefail
src="$1"
base="$(cd "$(dirname "$0")/.." && pwd)/public/${2#public/}"
mkdir -p "$(dirname "$base")"
for w in 800 1600; do
  convert "$src" -auto-orient -resize "${w}x${w}>" -strip -quality 78 -define webp:method=6 "${base}-${w}.webp"
done
ls -lh "${base}"-*.webp
