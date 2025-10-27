import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import { fileURLToPath } from "url";
import { parseStringPromise } from "xml2js";
import { JSDOM } from "jsdom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://ref-docs.bloomlibrary.org";
const OUTPUT_DIR = path.resolve(__dirname, "downloads");
const MANIFEST_FILE = path.resolve(__dirname, "previous-downloads.json");
const MAX_FILES = 20000;

const VERBOSE_MODE =
  process.argv.includes("--verbose") || process.argv.includes("-v");

interface FileManifest {
  [filePath: string]: {
    url: string;
    downloadedAt: string;
    lastModified?: string;
  };
}

interface DownloadStats {
  downloaded: number;
  skipped: number;
  deleted: number;
  imagesDownloaded: number;
  imagesSkipped: number;
  errors: string[];
}

const stats: DownloadStats = {
  downloaded: 0,
  skipped: 0,
  deleted: 0,
  imagesDownloaded: 0,
  imagesSkipped: 0,
  errors: [],
};

function loadManifest(): FileManifest {
  if (fs.existsSync(MANIFEST_FILE)) {
    const content = fs.readFileSync(MANIFEST_FILE, "utf-8");
    return JSON.parse(content);
  }
  return {};
}

function saveManifest(manifest: FileManifest) {
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), "utf-8");
}

function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

async function downloadFile(
  url: string,
  outputPath: string
): Promise<{ lastModified?: string; content: Buffer }> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          // Follow redirect
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            downloadFile(redirectUrl, outputPath).then(resolve).catch(reject);
            return;
          }
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${url}`));
          return;
        }

        const lastModified = response.headers["last-modified"];
        const chunks: Buffer[] = [];

        response.on("data", (chunk) => {
          if (typeof chunk === "string") {
            chunks.push(Buffer.from(chunk));
          } else {
            chunks.push(chunk);
          }
        });

        response.on("end", () => {
          const buffer = Buffer.concat(chunks);
          resolve({
            lastModified: lastModified as string | undefined,
            content: buffer,
          });
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function downloadSitemap(): Promise<string[]> {
  console.log("Downloading sitemap.xml...");

  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  const sitemapPath = path.join(OUTPUT_DIR, "sitemap.xml");

  try {
    const { content } = await downloadFile(sitemapUrl, sitemapPath);
    const sitemap = content.toString("utf-8");
    ensureDirectoryExists(sitemapPath);
    fs.writeFileSync(sitemapPath, sitemap, "utf-8");
    console.log("✓ Sitemap downloaded");

    // Parse sitemap XML
    const parsed = await parseStringPromise(sitemap);
    const urls: string[] = [];

    if (parsed.urlset && parsed.urlset.url) {
      for (const urlEntry of parsed.urlset.url) {
        if (urlEntry.loc && urlEntry.loc[0]) {
          const fullUrl = urlEntry.loc[0] as string;
          // Extract path relative to BASE_URL
          const relativePath = fullUrl.replace(BASE_URL, "").replace(/^\//, "");
          if (relativePath && relativePath !== "") {
            urls.push(relativePath);
          }
        }
      }
    }

    console.log(`Found ${urls.length} URLs in sitemap`);
    return urls;
  } catch (error) {
    console.error("Error downloading sitemap:", error);
    stats.errors.push(`Sitemap error: ${error}`);
    return [];
  }
}

async function downloadPage(
  relativePath: string,
  manifest: FileManifest
): Promise<boolean> {
  const url = `${BASE_URL}/${relativePath}`;
  const outputPath = path.join(OUTPUT_DIR, relativePath);

  // Check if we already have this file and it hasn't changed
  const existingEntry = manifest[relativePath];

  try {
    const { lastModified, content } = await downloadFile(url, outputPath);
    const htmlContent = content.toString("utf-8");

    // Skip if file hasn't changed (based on last-modified header)
    if (
      existingEntry &&
      lastModified &&
      existingEntry.lastModified === lastModified
    ) {
      if (VERBOSE_MODE) {
        console.log(`⊙ Skipped (unchanged): ${relativePath}`);
      }
      stats.skipped++;

      // Still check for images even if HTML hasn't changed
      const existingHtmlContent = fs.readFileSync(outputPath, "utf-8");
      await downloadImagesFromHtml(existingHtmlContent, relativePath, manifest);

      return false;
    }

    ensureDirectoryExists(outputPath);
    fs.writeFileSync(outputPath, htmlContent, "utf-8");

    // Update manifest
    manifest[relativePath] = {
      url: url,
      downloadedAt: new Date().toISOString(),
      lastModified: lastModified,
    };

    if (VERBOSE_MODE) {
      console.log(`✓ Downloaded: ${relativePath}`);
    }
    stats.downloaded++;

    // Extract and download images from the HTML
    await downloadImagesFromHtml(htmlContent, relativePath, manifest);

    return true;
  } catch (error) {
    console.error(`✗ Failed: ${relativePath} - ${error}`);
    stats.errors.push(`${relativePath}: ${error}`);
    return false;
  }
}

async function downloadImagesFromHtml(
  htmlContent: string,
  htmlPath: string,
  manifest: FileManifest
) {
  try {
    const dom = new JSDOM(htmlContent);
    const images = dom.window.document.querySelectorAll("img");

    for (const img of Array.from(images)) {
      const src = img.getAttribute("src");
      if (
        !src ||
        src.startsWith("http://") ||
        src.startsWith("https://") ||
        src.startsWith("data:")
      ) {
        continue;
      }

      // Resolve relative path
      const htmlDir = path.dirname(htmlPath);
      const imagePath = path
        .normalize(path.join(htmlDir, src))
        .replace(/\\/g, "/");

      // Check if already downloaded
      if (manifest[imagePath]) {
        stats.imagesSkipped++;
        continue;
      }

      // Download the image
      const imageUrl = `${BASE_URL}/${imagePath}`;
      const imageOutputPath = path.join(OUTPUT_DIR, imagePath);

      try {
        const { content: imageBuffer } = await downloadFile(
          imageUrl,
          imageOutputPath
        );
        ensureDirectoryExists(imageOutputPath);
        fs.writeFileSync(imageOutputPath, imageBuffer);

        manifest[imagePath] = {
          url: imageUrl,
          downloadedAt: new Date().toISOString(),
        };

        stats.imagesDownloaded++;
        if (VERBOSE_MODE) {
          console.log(`  🖼  Downloaded image: ${imagePath}`);
        }
      } catch (error) {
        // Images might not exist, that's okay
        if (VERBOSE_MODE) {
          console.log(`  ⊘  Image not found: ${imagePath}`);
        }
      }
    }
  } catch (error) {
    // If we can't parse HTML, just continue
    if (VERBOSE_MODE) {
      console.log(`  ⚠  Could not parse HTML for images`);
    }
  }
}

async function cleanupDeletedFiles(
  manifest: FileManifest,
  currentUrls: Set<string>
) {
  console.log("\nCleaning up deleted files...");

  const filesToDelete: string[] = [];

  // Find HTML files in manifest that are no longer in sitemap (don't delete images)
  for (const relativePath of Object.keys(manifest)) {
    if (
      !currentUrls.has(relativePath) &&
      relativePath !== "sitemap.xml" &&
      !relativePath.startsWith("assets/")
    ) {
      filesToDelete.push(relativePath);
    }
  }

  for (const relativePath of filesToDelete) {
    const fullPath = path.join(OUTPUT_DIR, relativePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      if (VERBOSE_MODE) {
        console.log(`✗ Deleted: ${relativePath}`);
      }
      stats.deleted++;
    }

    delete manifest[relativePath];
  }

  if (filesToDelete.length === 0) {
    console.log("  No files to delete");
  }
}

async function main() {
  console.log("=== Downloading Reference Documentation ===\n");
  console.log(`Source: ${BASE_URL}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Max files: ${MAX_FILES}\n`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load existing manifest
  const manifest = loadManifest();

  // Download sitemap and get list of URLs
  const urls = await downloadSitemap();

  if (urls.length === 0) {
    console.error("No URLs found in sitemap!");
    process.exit(1);
  }

  // Download first MAX_FILES pages
  console.log(`\nDownloading first ${MAX_FILES} pages...\n`);

  const urlsToDownload = urls.slice(0, MAX_FILES);
  const currentUrls = new Set<string>(urlsToDownload);

  // Add sitemap.xml to the set so it doesn't get deleted
  currentUrls.add("sitemap.xml");

  for (let i = 0; i < urlsToDownload.length; i++) {
    const url = urlsToDownload[i];
    await downloadPage(url, manifest);

    // Show progress every 50 files (or in verbose mode)
    if (!VERBOSE_MODE && (i + 1) % 50 === 0) {
      const progress = Math.round(((i + 1) / urlsToDownload.length) * 100);
      console.log(`Progress: ${i + 1}/${urlsToDownload.length} (${progress}%)`);
    }

    // Small delay to be nice to the server
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Clean up files that no longer exist in sitemap
  await cleanupDeletedFiles(manifest, currentUrls);

  // Save updated manifest
  saveManifest(manifest);

  // Print statistics
  console.log("\n=== Download Complete ===");
  console.log(`Downloaded: ${stats.downloaded} files`);
  console.log(`Images downloaded: ${stats.imagesDownloaded} files`);
  console.log(`Images skipped: ${stats.imagesSkipped} files`);
  console.log(`Skipped (unchanged): ${stats.skipped} files`);
  console.log(`Deleted: ${stats.deleted} files`);

  if (stats.errors.length > 0) {
    console.log(`\nErrors (${stats.errors.length}):`);
    stats.errors.forEach((err) => console.error(`  - ${err}`));
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
