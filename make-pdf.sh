#!/usr/bin/env bash

# removed becuase of https://github.com/kohheepeace/mr-pdf/issues/60
# --coverImage="https://docs.bloomlibrary.org/pdf-cover.png" \

today=$(date +"%Y-%m-%d")

npx mr-pdf --initialDocURLs="https://docs.bloomlibrary.org/" \
--contentSelector="article" \
--paginationSelector="a.pagination-nav__link--next" \
--excludeSelectors=".theme-doc-breadcrumbs,a.theme-edit-this-page" \
--coverTitle="Bloom Docs" \
--coverSub="Created from docs.bloomlibrary.org on ${today}" \
--pdfFormat="A4" \
--outputPDFFilename="static/downloads/docs-bloomlibrary-english-a4.pdf"

