#!/usr/bin/env node

"use strict";

/**
 * TEMPORARY ONLY.
 *
 * Normalize docu-notion Markdown output for Docusaurus 3.10 until
 * @sillsdev/docu-notion emits the new syntax directly.
 *
 * This shim is intentionally narrow and idempotent:
 * - classic explicit heading ids:  ## Heading {#my-id}
 *   -> MDX comment syntax:         ## Heading {slash-star #my-id star-slash}
 * - deprecated admonition kind:    :::caution
 *   -> recommended temporary form: :::warning[caution]
 *
 * Once docu-notion is updated upstream, this script should become a no-op and
 * can be deleted. Until then, it is safest to run it immediately after pull.
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const targetInput = args.find((arg) => arg !== "--check") || "docs";
const targetPath = path.resolve(process.cwd(), targetInput);

function collectMarkdownFiles(entryPath, results = []) {
  if (!fs.existsSync(entryPath)) {
    return results;
  }

  const stat = fs.statSync(entryPath);
  if (stat.isFile()) {
    if (entryPath.endsWith(".md")) {
      results.push(entryPath);
    }
    return results;
  }

  for (const dirent of fs.readdirSync(entryPath, {withFileTypes: true})) {
    const childPath = path.join(entryPath, dirent.name);
    if (dirent.isDirectory()) {
      collectMarkdownFiles(childPath, results);
    } else if (dirent.isFile() && childPath.endsWith(".md")) {
      results.push(childPath);
    }
  }

  return results;
}

function transformMarkdown(sourceText) {
  const eol = sourceText.includes("\r\n") ? "\r\n" : "\n";
  const lines = sourceText.split(/\r?\n/);
  const output = [];
  const counts = {
    headingIds: 0,
    cautions: 0,
  };

  let activeFence = null;

  for (const line of lines) {
    const fenceMatch = line.match(/^([ \t]*)(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[2][0];
      const length = fenceMatch[2].length;

      if (!activeFence) {
        activeFence = {marker, length};
      } else if (
        activeFence.marker === marker &&
        length >= activeFence.length
      ) {
        activeFence = null;
      }

      output.push(line);
      continue;
    }

    if (activeFence) {
      output.push(line);
      continue;
    }

    const cautionMatch = line.match(/^([ \t]*):::caution([ \t]*)$/);
    if (cautionMatch) {
      counts.cautions += 1;
      output.push(
        `${cautionMatch[1]}:::warning[caution]${cautionMatch[2]}`,
      );
      continue;
    }

    const headingMatch = line.match(
      /^(\s{0,3}#{1,6}\s+.*?)[ \t]+\{#([A-Za-z0-9:_-]+)\}([ \t]*)$/,
    );
    if (headingMatch) {
      counts.headingIds += 1;
      output.push(
        `${headingMatch[1]} {/* #${headingMatch[2]} */}${headingMatch[3]}`,
      );
      continue;
    }

    output.push(line);
  }

  return {
    text: output.join(eol),
    counts,
  };
}

if (!fs.existsSync(targetPath)) {
  console.log(
    `[temporary-docu-notion-docusaurus-v3-shim] Skipping missing path: ${targetInput}`,
  );
  process.exit(0);
}

const markdownFiles = collectMarkdownFiles(targetPath);
const totals = {
  filesChanged: 0,
  headingIds: 0,
  cautions: 0,
};

for (const filePath of markdownFiles) {
  const originalText = fs.readFileSync(filePath, "utf8");
  const transformed = transformMarkdown(originalText);
  const changed = transformed.text !== originalText;

  if (!changed) {
    continue;
  }

  totals.filesChanged += 1;
  totals.headingIds += transformed.counts.headingIds;
  totals.cautions += transformed.counts.cautions;

  if (!checkOnly) {
    fs.writeFileSync(filePath, transformed.text, "utf8");
  }
}

if (totals.filesChanged === 0) {
  console.log(
    `[temporary-docu-notion-docusaurus-v3-shim] No legacy docu-notion syntax found in ${targetInput}.`,
  );
  process.exit(0);
}

const action = checkOnly ? "Would update" : "Updated";
console.log(
  `[temporary-docu-notion-docusaurus-v3-shim] ${action} ${totals.filesChanged} files in ${targetInput} (${totals.headingIds} heading ids, ${totals.cautions} caution admonitions).`,
);