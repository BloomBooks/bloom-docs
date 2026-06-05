#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

// # Don't include the Reference docs (/Help/Reference) in the PDF; they're already available offline.
function getHelpReferenceExcludeUrls({
  baseUrl = process.env.PDF_BASE_URL || "",
  language = process.env.PDF_LANGUAGE || "en",
  cwd = process.cwd(),
} = {}) {
  const docsDir = path.join(cwd, "docs", "Help", "Reference");

  if (!fs.existsSync(docsDir)) {
    return [];
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const localePrefix = language === "en" ? "" : "/" + language;

  return walk(docsDir)
    .filter((filePath) => /\.mdx?$/.test(filePath))
    .map((filePath) => fs.readFileSync(filePath, "utf8"))
    .map((contents) => {
      const match = contents.match(/^slug:\s*(.+)\s*$/m);
      return match ? match[1].trim() : "";
    })
    .filter(Boolean)
    .map((slug) => slug.replace(/^["\x27]|["\x27]$/g, ""))
    .map((slug) => (slug.startsWith("/") ? slug : "/" + slug))
    // Docusaurus is configured with trailingSlash=true, and docu-pdf compares exclusion URLs
    // by exact string equality, so normalize to the final routed form here.
    .map(
      (slug) =>
        normalizedBaseUrl + localePrefix + (slug.endsWith("/") ? slug : slug + "/")
    )
    .sort((left, right) => left.localeCompare(right));
}

if (require.main === module) {
  process.stdout.write(getHelpReferenceExcludeUrls().join(","));
}

module.exports = { getHelpReferenceExcludeUrls };