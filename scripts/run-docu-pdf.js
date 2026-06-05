#!/usr/bin/env node

// Import the programmatic API so we can pass large exclusion lists without going through the CLI.
const { generatePDF } = require("docu-pdf/dist/utils");
const {
  getHelpReferenceExcludeUrls,
} = require("./get-help-reference-exclude-urls");

async function main() {
  const [initialDocUrl, outputPath, coverPath, pageSize, tocLevelArg, baseUrlForLinks] =
    process.argv.slice(2);

  if (
    !initialDocUrl ||
    !outputPath ||
    !coverPath ||
    !pageSize ||
    !tocLevelArg ||
    !baseUrlForLinks
  ) {
    throw new Error(
      "Usage: node ./scripts/run-docu-pdf.js <url> <outputPath> <coverPath> <pageSize> <tocLevel> <baseUrlForLinks>"
    );
  }

  // # Don't include the Reference docs (/Help/Reference) in the PDF; they're already available offline.
  const excludeURLs = getHelpReferenceExcludeUrls({
    baseUrl: process.env.PDF_BASE_URL,
    language: process.env.PDF_LANGUAGE,
  });

  await generatePDF({
    // Keep these aligned with the values we previously sent to the docu-pdf CLI.
    initialDocURLs: [initialDocUrl],
    excludeURLs,
    outputPath,
    coverPath,
    pageSize,
    tocLevel: Number(tocLevelArg),
    baseUrlForLinks,
    contentSelector: "article",
    nextPageSelector: "a.pagination-nav__link--next",
    excludeSelectors: [],
  });
}

main()
  .then(() => {
    // docu-pdf's programmatic API leaves Puppeteer browser handles open, so an explicit exit
    // is required here even after generatePDF() resolves.
    process.exit(0);
  })
  .catch((error) => {
    console.error(error.stack || error);
    process.exit(1);
  });