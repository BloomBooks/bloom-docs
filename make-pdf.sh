#!/usr/bin/env bash
set -e  # Exit on error

# Use en for the language if not set
if [ -z "$1" ]
then
  set -- 'en' "$@"
fi

if [ "$1" == "en" ]; then
    URL="https://docs.bloomlibrary.org"
else
    URL="https://docs.bloomlibrary.org/$1"
fi

LANGUAGENAME="english"
if [ $1 == "fr" ]; then
    LANGUAGENAME="french"
elif [ $1 == "es" ]; then
    LANGUAGENAME="spanish"
fi

# By generating the PDFs directly in the build (not static) dir, we can avoid having to build the
# docusaurus site all over again in the workflow.
# Also, if we generate the PDFs in the static folder,
# the docusaurus build copies all of them to each locale by default, so we get duplicates.
if [ "$1" == "en" ]; then
    mkdir -p "build/downloads"
    OUTPUTPATH="build/downloads/docs-bloomlibrary-$LANGUAGENAME-a4.pdf"
else
    mkdir -p "build/$1/downloads"
    OUTPUTPATH="build/$1/downloads/docs-bloomlibrary-$LANGUAGENAME-a4.pdf"
fi

# removed because of https://github.com/kohheepeace/mr-pdf/issues/60
# --coverImage="https://docs.bloomlibrary.org/pdf-cover.png" \

npx docu-pdf "$URL" \
--coverPath "./pdf-cover.htm" \
--pageSize "A4" \
--outputPath "$OUTPUTPATH" \
--tocLevel 1

if [ "$1" == "en" ]; then
    # Until we start generating language-specific PDFs, we'll just copy the English one to the other locales.
    mkdir -p "build/fr/downloads"
    cp "$OUTPUTPATH" "build/fr/downloads/docs-bloomlibrary-english-a4.pdf"
    mkdir -p "build/es/downloads"
    cp "$OUTPUTPATH" "build/es/downloads/docs-bloomlibrary-english-a4.pdf"
fi

# npx docu-pdf https://docs.bloomlibrary.org/fr \
# --coverTitle "Docs Bloom" \
# --coverSub="Créé à partir de docs.bloomlibrary.org le ${today}" \
# --pageSize "A4" \
# --outputPath "build/downloads/docs-bloomlibrary-french-a4.pdf" \

