#!/usr/bin/env bash

# removed becuase of https://github.com/kohheepeace/mr-pdf/issues/60
# --coverImage="https://docs.bloomlibrary.org/pdf-cover.png" \

today=$(date +"%Y-%m-%d")

npx docu-pdf https://docs.bloomlibrary.org \
--coverPath "./pdf-cover.htm" \
--pageSize "A4" \
--outputPath "static/downloads/docs-bloomlibrary-english-a4.pdf" \
--tocLevel 1

# npx docu-pdf https://docs.bloomlibrary.org/fr \
# --coverTitle "Docs Bloom" \
# --coverSub="Créé à partir de docs.bloomlibrary.org le ${today}" \
# --pageSize "A4" \
# --outputPath "static/downloads/docs-bloomlibrary-french-a4.pdf" \

