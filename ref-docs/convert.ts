import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_ROOT =
  process.env.SOURCE_ROOT || path.resolve(__dirname, "downloads");
const TARGET_ROOT =
  process.env.TARGET_ROOT || path.resolve(__dirname, "..", "docs", "ref-docs");
const IMAGES_SOURCE =
  process.env.IMAGES_SOURCE || path.resolve(__dirname, "downloads", "assets");
const IMAGES_TARGET =
  process.env.IMAGES_TARGET ||
  path.resolve(__dirname, "..", "static", "ref-docs-assets");

const VERBOSE_MODE =
  process.argv.includes("--verbose") || process.argv.includes("-v");
const INCREMENTAL_MODE = process.argv.includes("--incremental");

interface ConversionStats {
  processed: number;
  skipped: number;
  imagesCopied: number;
  errors: string[];
}

const stats: ConversionStats = {
  processed: 0,
  skipped: 0,
  imagesCopied: 0,
  errors: [],
};

// Initialize Turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// Add custom rules for better conversion
turndownService.addRule("removeScripts", {
  filter: ["script", "style"],
  replacement: () => "",
});

turndownService.addRule("cleanMetadata", {
  filter: (node) => {
    return (
      node.nodeName === "META" ||
      (node.nodeName === "DIV" &&
        node.classList &&
        (node.classList.contains("topic-header") ||
          node.classList.contains("topic-header-shadow")))
    );
  },
  replacement: () => "",
});

// Custom rule to handle images and preserve original src attributes
turndownService.addRule("images", {
  filter: "img",
  replacement: (content, node) => {
    const element = node as HTMLImageElement;
    const alt = element.alt || "";
    let src = element.getAttribute("src") || "";

    // Skip data URIs and use original src attribute
    if (src.startsWith("data:")) {
      // Try to get the original src from the element if it was converted
      // This shouldn't happen, but if it does, we skip it
      console.warn(
        `Skipping data URI image in conversion: ${src.substring(0, 50)}...`
      );
      return "";
    }

    // Convert relative paths to absolute paths for Docusaurus
    if (src.match(/^(?:\.\.\/)+assets\/(images\/[^)]+)/)) {
      const imagePath = src.match(/^(?:\.\.\/)+assets\/(images\/.+)$/)?.[1];
      if (imagePath) {
        src = `/ref-docs-assets/${imagePath.replace(/ /g, "%20")}`;
      }
    }

    return src ? `![${alt}](${src})` : "";
  },
});

function extractTitle(dom: JSDOM): string {
  const titleElement = dom.window.document.querySelector("title");
  if (titleElement && titleElement.textContent) {
    return titleElement.textContent.trim();
  }

  const h1 = dom.window.document.querySelector("h1");
  if (h1 && h1.textContent) {
    return h1.textContent.trim();
  }

  const h2 = dom.window.document.querySelector("h2");
  if (h2 && h2.textContent) {
    return h2.textContent.trim();
  }

  return "Untitled";
}

function cleanHtmlContent(dom: JSDOM): string {
  const doc = dom.window.document;

  // Remove header elements
  const headers = doc.querySelectorAll(".topic-header, .topic-header-shadow");
  headers.forEach((el) => el.remove());

  // Get the main content (usually in body or a div)
  let content = doc.querySelector("body > div") || doc.querySelector("body");

  if (!content) {
    content = doc.body;
  }

  return content?.innerHTML || "";
}

function convertHtmlToMarkdown(htmlPath: string): {
  markdown: string;
  title: string;
} {
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  const dom = new JSDOM(htmlContent);

  const title = extractTitle(dom);
  const cleanedHtml = cleanHtmlContent(dom);
  let markdown = turndownService.turndown(cleanedHtml);

  // Fix internal links: convert .htm/.html to .md
  markdown = markdown.replace(/\]\(([^)]+?)\.html?\)/g, "]($1.md)");

  return { markdown, title };
}

function generateFrontMatter(title: string, relativePath: string): string {
  // Generate a slug from the filename
  const filename = path.basename(relativePath, path.extname(relativePath));
  const slug = `/ref-docs/${filename.toLowerCase().replace(/_/g, "-")}`;

  return `---
title: ${title}
sidebar_position: 1
slug: ${slug}
---

`;
}

function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function processHtmlFile(
  htmlPath: string,
  sourceRoot: string,
  targetRoot: string
) {
  try {
    if (VERBOSE_MODE) {
      console.log(`Processing: ${htmlPath}`);
    }

    // Skip index.html files as they're typically navigation
    if (path.basename(htmlPath).toLowerCase() === "index.html") {
      if (VERBOSE_MODE) {
        console.log("  Skipping index.html");
      }
      stats.skipped++;
      return;
    }

    // Calculate relative path and create target path
    const relativePath = path.relative(sourceRoot, htmlPath);
    const targetPath = path.join(
      targetRoot,
      relativePath.replace(/\.htm[l]?$/, ".md")
    );

    // In incremental mode, check if target is newer than source
    if (INCREMENTAL_MODE && fs.existsSync(targetPath)) {
      const sourceStats = fs.statSync(htmlPath);
      const targetStats = fs.statSync(targetPath);

      if (targetStats.mtime >= sourceStats.mtime) {
        if (VERBOSE_MODE) {
          console.log(`  ⊙ Skipped (up-to-date): ${relativePath}`);
        }
        stats.skipped++;
        return;
      }
    }

    // Convert HTML to Markdown
    const { markdown, title } = convertHtmlToMarkdown(htmlPath);

    // Generate front matter
    const frontMatter = generateFrontMatter(title, relativePath);
    const fullContent = frontMatter + markdown;

    // Ensure target directory exists
    ensureDirectoryExists(targetPath);

    // Write the markdown file
    fs.writeFileSync(targetPath, fullContent, "utf-8");
    if (VERBOSE_MODE) {
      console.log(`  ✓ Created: ${targetPath}`);
    }
    stats.processed++;
  } catch (error) {
    const errorMsg = `Error processing ${htmlPath}: ${error}`;
    console.error(errorMsg);
    stats.errors.push(errorMsg);
  }
}

function walkDirectory(dir: string, sourceRoot: string, targetRoot: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip template and asset directories
      if (
        ["template", "assets", "whxdata"].includes(entry.name.toLowerCase())
      ) {
        continue;
      }
      walkDirectory(fullPath, sourceRoot, targetRoot);
    } else if (entry.isFile() && /\.html?$/i.test(entry.name)) {
      processHtmlFile(fullPath, sourceRoot, targetRoot);
    }
  }
}

function collectHtmlFiles(
  dir: string,
  showProgress: boolean = false
): string[] {
  const htmlFiles: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip template and asset directories
      if (
        ["template", "assets", "whxdata"].includes(entry.name.toLowerCase())
      ) {
        continue;
      }
      htmlFiles.push(...collectHtmlFiles(fullPath, showProgress));
    } else if (entry.isFile() && /\.html?$/i.test(entry.name)) {
      htmlFiles.push(fullPath);
      if (showProgress) {
        if (htmlFiles.length === 1) {
          console.log("  Scanning... found first HTML file");
        } else if (htmlFiles.length < 50 && htmlFiles.length % 10 === 0) {
          console.log(`  Scanning... found ${htmlFiles.length} files so far`);
        } else if (htmlFiles.length % 50 === 0) {
          console.log(`  Scanning... found ${htmlFiles.length} files so far`);
        }
      }
    }
  }

  return htmlFiles;
}

function copyImages() {
  if (VERBOSE_MODE) {
    console.log("\nCopying images...");
  }

  if (!fs.existsSync(IMAGES_SOURCE)) {
    if (VERBOSE_MODE) {
      console.log("No images directory found in raw-ref-docs");
    }
    return;
  }

  // Ensure target directory exists
  if (!fs.existsSync(IMAGES_TARGET)) {
    fs.mkdirSync(IMAGES_TARGET, { recursive: true });
  }

  // Copy entire assets directory
  const copyRecursive = (src: string, dest: string) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        stats.imagesCopied++;
        if (!VERBOSE_MODE) {
          if (stats.imagesCopied === 1) {
            console.log("  Copied 1 image...");
          } else if (stats.imagesCopied < 50 && stats.imagesCopied % 10 === 0) {
            console.log(`  Copied ${stats.imagesCopied} images...`);
          } else if (stats.imagesCopied % 50 === 0) {
            console.log(`  Copied ${stats.imagesCopied} images...`);
          }
        }
      }
    }
  };

  copyRecursive(IMAGES_SOURCE, IMAGES_TARGET);
  if (VERBOSE_MODE) {
    console.log(`✓ Copied ${stats.imagesCopied} images`);
  }
}

function main() {
  const sourceRoot = SOURCE_ROOT;
  const targetRoot = TARGET_ROOT;

  console.log("\n\n");
  console.log("=".repeat(60));
  console.log("=== Converting Reference Docs to Markdown ===");
  console.log("=".repeat(60));
  console.log(`Source: ${sourceRoot}`);
  console.log(`Target: ${targetRoot}`);
  console.log(
    `Mode: ${INCREMENTAL_MODE ? "Incremental" : "Full conversion"}\n`
  );

  if (!fs.existsSync(sourceRoot)) {
    console.error(`Source directory does not exist: ${sourceRoot}`);
    process.exit(1);
  }

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetRoot)) {
    fs.mkdirSync(targetRoot, { recursive: true });
  }

  // Collect all HTML files first to show progress
  console.log("Scanning for HTML files to convert...");
  const htmlFiles = collectHtmlFiles(sourceRoot, true);
  console.log(`Found ${htmlFiles.length} HTML files to convert\n`);

  // Process all files with progress reporting
  for (let i = 0; i < htmlFiles.length; i++) {
    processHtmlFile(htmlFiles[i], sourceRoot, targetRoot);

    // Show progress every 50 files (or in verbose mode)
    if (!VERBOSE_MODE && (i + 1) % 50 === 0) {
      const progress = Math.round(((i + 1) / htmlFiles.length) * 100);
      console.log(`Progress: ${i + 1}/${htmlFiles.length} (${progress}%)`);
    }
  }

  // Copy images to static directory
  console.log("\nCopying images to static directory...");
  copyImages();

  // Print statistics
  console.log("\n=== Conversion Complete ===");
  console.log(`Processed: ${stats.processed} files`);
  console.log(`Skipped: ${stats.skipped} files`);
  console.log(`Images copied: ${stats.imagesCopied} files`);
  if (stats.errors.length > 0) {
    console.log(`\nErrors: ${stats.errors.length}`);
    stats.errors.forEach((err) => console.error(`  - ${err}`));
  }
}

main();
