#!/usr/bin/env bash
set -e  # Exit on error

# Parameters:
# $1: Language code (default: 'en') or base URL if it starts with 'http'
# $2: Language code if $1 is a URL

# Check if first parameter is a URL
if [[ "$1" =~ ^https?:// ]]; then
    BASE_URL="$1"
    LANGUAGE="${2:-en}"
else
    # Use en for the language if not set
    LANGUAGE="${1:-en}"
    BASE_URL="https://docs.bloomlibrary.org"
fi

if [ "$LANGUAGE" == "en" ]; then
    URL="$BASE_URL"
else
    URL="$BASE_URL/$LANGUAGE"
fi

LANGUAGENAME="english"
if [ "$LANGUAGE" == "fr" ]; then
    LANGUAGENAME="french"
elif [ "$LANGUAGE" == "es" ]; then
    LANGUAGENAME="spanish"
fi

# By generating the PDFs directly in the build (not static) dir, we can avoid having to build the
# docusaurus site all over again in the workflow.
# Also, if we generate the PDFs in the static folder,
# the docusaurus build copies all of them to each locale by default, so we get duplicates.
if [ "$LANGUAGE" == "en" ]; then
    mkdir -p "build/downloads"
    OUTPUTPATH="build/downloads/docs-bloomlibrary-$LANGUAGENAME-a4.pdf"
else
    mkdir -p "build/$LANGUAGE/downloads"
    OUTPUTPATH="build/$LANGUAGE/downloads/docs-bloomlibrary-$LANGUAGENAME-a4.pdf"
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

