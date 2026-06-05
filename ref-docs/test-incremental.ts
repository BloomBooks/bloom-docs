import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test directories
const TEST_ROOT = path.resolve(__dirname, "test-data");
const TEST_DOWNLOADS = path.join(TEST_ROOT, "downloads");
const TEST_DOCS = path.join(TEST_ROOT, "docs", "ref-docs");
const TEST_STATIC = path.join(TEST_ROOT, "static", "ref-docs-assets");

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function log(message: string, level: "info" | "success" | "error" = "info") {
  const prefix = level === "success" ? "✓" : level === "error" ? "✗" : "•";
  console.log(`${prefix} ${message}`);
}

function cleanTestDir() {
  if (fs.existsSync(TEST_ROOT)) {
    fs.rmSync(TEST_ROOT, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DOWNLOADS, { recursive: true });
  fs.mkdirSync(TEST_DOCS, { recursive: true });
  fs.mkdirSync(TEST_STATIC, { recursive: true });
}

function createTestHtml(filename: string, title: string, content: string) {
  const htmlPath = path.join(TEST_DOWNLOADS, filename);
  const dir = path.dirname(htmlPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
</head>
<body>
  <h1>${title}</h1>
  <p>${content}</p>
</body>
</html>`;

  fs.writeFileSync(htmlPath, html, "utf-8");
  return htmlPath;
}

function createTestMarkdown(
  filename: string,
  title: string,
  content: string,
  olderThan?: string
) {
  const mdPath = path.join(TEST_DOCS, filename.replace(/\.html?$/, ".md"));
  const dir = path.dirname(mdPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const markdown = `---
title: ${title}
sidebar_position: 1
slug: /ref-docs/${path.basename(filename, path.extname(filename))}
---

# ${title}

${content}`;

  fs.writeFileSync(mdPath, markdown, "utf-8");

  // If olderThan is specified, make this file older
  if (olderThan) {
    const sourceStats = fs.statSync(olderThan);
    const oldTime = new Date(sourceStats.mtime.getTime() - 1000); // 1 second older
    fs.utimesSync(mdPath, oldTime, oldTime);
  }

  return mdPath;
}

function runConversion(incremental: boolean): {
  processed: number;
  skipped: number;
} {
  const mode = incremental ? "--incremental" : "";
  const output = execSync(`npx tsx ref-docs/convert-ref-docs.ts ${mode}`, {
    cwd: path.resolve(__dirname, ".."),
    encoding: "utf-8",
    env: {
      ...process.env,
      SOURCE_ROOT: TEST_DOWNLOADS,
      TARGET_ROOT: TEST_DOCS,
      IMAGES_SOURCE: path.join(TEST_DOWNLOADS, "assets"),
      IMAGES_TARGET: TEST_STATIC,
    },
  }).toString();

  // Parse output to get stats
  const processedMatch = output.match(/Processed: (\d+)/);
  const skippedMatch = output.match(/Skipped: (\d+)/);

  return {
    processed: processedMatch ? parseInt(processedMatch[1]) : 0,
    skipped: skippedMatch ? parseInt(skippedMatch[1]) : 0,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testCase(
  name: string,
  testFn: () => Promise<void> | void
): Promise<void> {
  try {
    log(`Running: ${name}`, "info");
    await testFn();
    results.push({ name, passed: true });
    log(`PASSED: ${name}`, "success");
  } catch (error) {
    results.push({
      name,
      passed: false,
      error: error instanceof Error ? error.message : String(error),
    });
    log(`FAILED: ${name} - ${error}`, "error");
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

// ============================================================================
// TEST CASES
// ============================================================================

async function test_fullConversion_convertsAllFiles() {
  cleanTestDir();

  // Create test files
  createTestHtml("page1.html", "Page 1", "Content 1");
  createTestHtml("page2.html", "Page 2", "Content 2");
  createTestHtml("subdir/page3.html", "Page 3", "Content 3");

  const stats = runConversion(false);

  assert(stats.processed === 3, `Expected 3 processed, got ${stats.processed}`);
  assert(
    fs.existsSync(path.join(TEST_DOCS, "page1.md")),
    "page1.md should exist"
  );
  assert(
    fs.existsSync(path.join(TEST_DOCS, "page2.md")),
    "page2.md should exist"
  );
  assert(
    fs.existsSync(path.join(TEST_DOCS, "subdir", "page3.md")),
    "subdir/page3.md should exist"
  );
}

async function test_incremental_skipsUpToDateFiles() {
  cleanTestDir();

  // Create HTML file
  const htmlPath = createTestHtml("page1.html", "Page 1", "Content 1");

  // Wait to ensure different timestamps
  await sleep(100);

  // Create markdown file that is newer than HTML
  const mdPath = path.join(TEST_DOCS, "page1.md");
  fs.mkdirSync(path.dirname(mdPath), { recursive: true });
  fs.writeFileSync(mdPath, "---\ntitle: Page 1\n---\n\nOld content", "utf-8");

  // Make markdown newer by touching it
  await sleep(100);
  const now = new Date();
  fs.utimesSync(mdPath, now, now);

  const stats = runConversion(true);

  assert(
    stats.skipped >= 1,
    `Expected at least 1 skipped, got ${stats.skipped}`
  );
  const content = fs.readFileSync(mdPath, "utf-8");
  assert(
    content.includes("Old content"),
    "Markdown should not have been overwritten"
  );
}

async function test_incremental_convertsOutdatedFiles() {
  cleanTestDir();

  // Create HTML file
  const htmlPath = createTestHtml("page1.html", "Page 1", "New Content");

  // Wait to ensure different timestamps
  await sleep(100);

  // Create markdown file that is older
  const mdPath = path.join(TEST_DOCS, "page1.md");
  fs.mkdirSync(path.dirname(mdPath), { recursive: true });
  fs.writeFileSync(mdPath, "---\ntitle: Page 1\n---\n\nOld content", "utf-8");

  // Make markdown older
  const htmlStats = fs.statSync(htmlPath);
  const oldTime = new Date(htmlStats.mtime.getTime() - 2000);
  fs.utimesSync(mdPath, oldTime, oldTime);

  const stats = runConversion(true);

  assert(
    stats.processed >= 1,
    `Expected at least 1 processed, got ${stats.processed}`
  );
  const content = fs.readFileSync(mdPath, "utf-8");
  assert(
    content.includes("New Content"),
    "Markdown should have been updated with new content"
  );
}

async function test_incremental_convertsMissingFiles() {
  cleanTestDir();

  // Create HTML files
  createTestHtml("page1.html", "Page 1", "Content 1");
  createTestHtml("page2.html", "Page 2", "Content 2");

  const stats = runConversion(true);

  assert(stats.processed === 2, `Expected 2 processed, got ${stats.processed}`);
  assert(
    fs.existsSync(path.join(TEST_DOCS, "page1.md")),
    "page1.md should exist"
  );
  assert(
    fs.existsSync(path.join(TEST_DOCS, "page2.md")),
    "page2.md should exist"
  );
}

async function test_fullConversion_ignoresExistingFiles() {
  cleanTestDir();

  // Create HTML file
  createTestHtml("page1.html", "Page 1", "New Content");

  // Create existing markdown
  const mdPath = path.join(TEST_DOCS, "page1.md");
  fs.mkdirSync(path.dirname(mdPath), { recursive: true });
  fs.writeFileSync(mdPath, "---\ntitle: Page 1\n---\n\nOld content", "utf-8");

  await sleep(100);

  const stats = runConversion(false);

  assert(
    stats.processed >= 1,
    `Expected at least 1 processed, got ${stats.processed}`
  );
  const content = fs.readFileSync(mdPath, "utf-8");
  assert(
    content.includes("New Content"),
    "Full conversion should overwrite existing files"
  );
}

async function test_indexHtml_alwaysSkipped() {
  cleanTestDir();

  // Create index.html files
  createTestHtml("index.html", "Index", "Index content");
  createTestHtml("subdir/index.html", "Subdir Index", "Subdir content");
  createTestHtml("page1.html", "Page 1", "Content 1");

  const stats = runConversion(false);

  assert(
    stats.processed === 1,
    `Expected 1 processed (not index.html), got ${stats.processed}`
  );
  assert(
    stats.skipped >= 2,
    `Expected at least 2 skipped (index files), got ${stats.skipped}`
  );
  assert(
    !fs.existsSync(path.join(TEST_DOCS, "index.md")),
    "index.md should not exist"
  );
  assert(
    !fs.existsSync(path.join(TEST_DOCS, "subdir", "index.md")),
    "subdir/index.md should not exist"
  );
}

async function test_emptyDirectory_handlesGracefully() {
  cleanTestDir();

  const stats = runConversion(false);

  assert(stats.processed === 0, `Expected 0 processed, got ${stats.processed}`);
}

async function test_mixedScenario_incrementalMode() {
  cleanTestDir();

  // Scenario with multiple conditions:
  // 1. New HTML file (no markdown) - should convert
  const html1 = createTestHtml("new.html", "New File", "New content");

  await sleep(100);

  // 2. HTML with older markdown - should convert
  const html2 = createTestHtml("outdated.html", "Outdated", "Updated content");
  await sleep(100);
  const md2Path = path.join(TEST_DOCS, "outdated.md");
  fs.mkdirSync(path.dirname(md2Path), { recursive: true });
  fs.writeFileSync(md2Path, "---\ntitle: Outdated\n---\n\nOld", "utf-8");
  const html2Stats = fs.statSync(html2);
  const oldTime = new Date(html2Stats.mtime.getTime() - 2000);
  fs.utimesSync(md2Path, oldTime, oldTime);

  // 3. HTML with newer markdown - should skip
  const html3 = createTestHtml("uptodate.html", "Up to Date", "Content");
  await sleep(100);
  const md3Path = path.join(TEST_DOCS, "uptodate.md");
  fs.mkdirSync(path.dirname(md3Path), { recursive: true });
  fs.writeFileSync(md3Path, "---\ntitle: Up to Date\n---\n\nCurrent", "utf-8");
  const now = new Date();
  fs.utimesSync(md3Path, now, now);

  // 4. index.html - should always skip
  createTestHtml("index.html", "Index", "Index");

  const stats = runConversion(true);

  assert(
    stats.processed === 2,
    `Expected 2 processed (new + outdated), got ${stats.processed}`
  );
  assert(
    stats.skipped >= 2,
    `Expected at least 2 skipped (uptodate + index), got ${stats.skipped}`
  );

  // Verify files
  assert(fs.existsSync(path.join(TEST_DOCS, "new.md")), "new.md should exist");

  const outdatedContent = fs.readFileSync(md2Path, "utf-8");
  assert(
    outdatedContent.includes("Updated content"),
    "outdated.md should be updated"
  );

  const uptodateContent = fs.readFileSync(md3Path, "utf-8");
  assert(
    uptodateContent.includes("Current"),
    "uptodate.md should not be changed"
  );
}

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("=== Testing Incremental Conversion Logic ===");
  console.log("=".repeat(70) + "\n");

  // Modify convert-ref-docs.ts temporarily to use test directories
  // Actually, we'll pass env vars - but the script needs to be modified to accept them
  // For now, let's create a wrapper that modifies the paths

  await testCase(
    "Full conversion: converts all files",
    test_fullConversion_convertsAllFiles
  );

  await testCase(
    "Incremental mode: skips up-to-date files",
    test_incremental_skipsUpToDateFiles
  );

  await testCase(
    "Incremental mode: converts outdated files",
    test_incremental_convertsOutdatedFiles
  );

  await testCase(
    "Incremental mode: converts missing files",
    test_incremental_convertsMissingFiles
  );

  await testCase(
    "Full conversion: overwrites existing files",
    test_fullConversion_ignoresExistingFiles
  );

  await testCase("Index files: always skipped", test_indexHtml_alwaysSkipped);

  await testCase(
    "Empty directory: handles gracefully",
    test_emptyDirectory_handlesGracefully
  );

  await testCase(
    "Mixed scenario: incremental mode with various conditions",
    test_mixedScenario_incrementalMode
  );

  // Print summary
  console.log("\n" + "=".repeat(70));
  console.log("=== Test Summary ===");
  console.log("=".repeat(70));

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log(`\nTotal: ${results.length} tests`);
  log(`Passed: ${passed}`, "success");
  if (failed > 0) {
    log(`Failed: ${failed}`, "error");
    console.log("\nFailed tests:");
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        console.log(`  ✗ ${r.name}`);
        console.log(`    ${r.error}`);
      });
  }

  // Cleanup
  if (fs.existsSync(TEST_ROOT)) {
    fs.rmSync(TEST_ROOT, { recursive: true, force: true });
  }

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
