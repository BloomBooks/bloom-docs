#!/usr/bin/env bash

# removed becuase of https://github.com/kohheepeace/mr-pdf/issues/60
# --coverImage="https://docs.bloomlibrary.org/pdf-cover.png" \

today=$(date +"%Y-%m-%d")

npx docu-pdf https://docs.bloomlibrary.org \
--coverTitle "Bloom Docs" \
--coverSub "Created from docs.bloomlibrary.org on ${today}" \
--pageSize "A4" \
--outputPath "static/downloads/docs-bloomlibrary-english-a4.pdf" \

# npx docu-pdf https://docs.bloomlibrary.org/fr \
# --coverTitle "Docs Bloom" \
# --coverSub="Créé à partir de docs.bloomlibrary.org le ${today}" \
# --pageSize "A4" \
# --outputPath "static/downloads/docs-bloomlibrary-french-a4.pdf" \

