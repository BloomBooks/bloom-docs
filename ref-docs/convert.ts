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
  process.env.TARGET_ROOT ||
  path.resolve(__dirname, "..", "docs", "Help", "Reference");
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

interface SourceOrderLookup {
  docPositions: Map<string, number>;
  categoryPositions: Map<string, number>;
  docLabels: Map<string, string>;
  categoryLabels: Map<string, string>;
}

interface RoboHelpTocNode {
  key?: string;
  name?: string;
  tocid?: string;
  type?: string;
  url?: string;
  children?: RoboHelpTocNode[];
}

interface TocOrderEntry {
  type: "doc" | "category";
  relativePath: string;
}

interface TocOrderLookup {
  entriesByDirectory: Map<string, TocOrderEntry[]>;
  docLabels: Map<string, string>;
  categoryLabels: Map<string, string>;
}

const stats: ConversionStats = {
  processed: 0,
  skipped: 0,
  imagesCopied: 0,
  errors: [],
};

let sourceOrderLookup: SourceOrderLookup = {
  docPositions: new Map(),
  categoryPositions: new Map(),
  docLabels: new Map(),
  categoryLabels: new Map(),
};

// Track files with warnings for summary
const filesWithWarnings: string[] = [];

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

// On windows, the case of files can differ from the references to them,
// and it still works. But on a linux GitHub Actions server, it doesn't work.
// So, here we build a case-insensitive lookup map of all image files and
// paths to actual filesystem paths.
let imagePathLookup: Map<string, string> | null = null;

function buildImagePathLookup(): Map<string, string> {
  const lookup = new Map<string, string>();

  if (!fs.existsSync(IMAGES_SOURCE)) {
    return lookup;
  }

  const walkImages = (dir: string, baseDir: string = IMAGES_SOURCE) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walkImages(fullPath, baseDir);
      } else {
        // Get relative path from images source root
        const relativePath = path.relative(baseDir, fullPath);
        // Normalize path separators to forward slashes
        const normalizedPath = relativePath.replace(/\\/g, "/");
        // Store with lowercase key for case-insensitive lookup
        lookup.set(normalizedPath.toLowerCase(), normalizedPath);
      }
    }
  };

  walkImages(IMAGES_SOURCE);
  return lookup;
}

function normalizeImagePath(imagePath: string): string {
  // Lazy-load the image path lookup on first use
  if (imagePathLookup === null) {
    imagePathLookup = buildImagePathLookup();
  }

  // Try to find the correct case version in our lookup
  const normalizedPath = imagePath.replace(/\\/g, "/");
  const correctPath = imagePathLookup.get(normalizedPath.toLowerCase());

  if (correctPath) {
    return correctPath;
  }

  // If not found in lookup, return original path
  // (this will happen during incremental builds before images are copied)
  return imagePath;
}

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
        // Normalize the path to match actual filesystem case
        const normalizedPath = normalizeImagePath(imagePath);
        src = `/ref-docs-assets/${normalizedPath.replace(/ /g, "%20")}`;
      }
    }

    return src ? `![${alt}](${src})` : "";
  },
});

// Table support. By the time these rules run, normalizeTables() has
// restructured every table into thead (th cells) + tbody, with no
// colspan rows, so they can be emitted as GFM pipe tables.
turndownService.addRule("removeTableLayout", {
  filter: ["colgroup", "col", "caption"],
  replacement: () => "",
});

// Block content inside a cell (multiple paragraphs, lists) arrives as
// multi-line markdown; pipe tables are single-line, so collapse the
// blocks with <br/> and render list items with a bullet character.
function formatTableCellContent(content: string): string {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/^-\s+/, "• "))
    .join("<br/>")
    .replace(/\|/g, "\\|");
}

turndownService.addRule("tableCell", {
  filter: ["th", "td"],
  replacement: (content, node) => {
    const element = node as HTMLElement;
    const prefix = element.previousElementSibling ? " " : "| ";
    return `${prefix}${formatTableCellContent(content)} |`;
  },
});

turndownService.addRule("tableRow", {
  filter: "tr",
  replacement: (content, node) => {
    const element = node as HTMLElement;
    let output = `\n${content}`;

    if (element.parentElement?.tagName === "THEAD") {
      const cellCount = getRowCells(element).length;
      output += `\n|${" --- |".repeat(cellCount)}`;
    }

    return output;
  },
});

turndownService.addRule("tableSection", {
  filter: ["thead", "tbody", "tfoot"],
  replacement: (content) => content,
});

turndownService.addRule("table", {
  filter: "table",
  replacement: (content) => `\n\n${content.trim()}\n\n`,
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

function normalizePathSeparators(filePath: string): string {
  return filePath.replace(/\\/g, "/");
}

function isBlankText(text: string | null | undefined): boolean {
  if (!text) {
    return true;
  }

  return text.replace(/\u00a0/g, " ").trim() === "";
}

function isHtmlFileName(filename: string): boolean {
  return /\.html?$/i.test(filename);
}

function isIndexHtmlFileName(filename: string): boolean {
  return /^index\.html?$/i.test(filename);
}

function getDecodedPathname(href: string): string {
  const hrefWithoutFragment = href.split("#")[0].split("?")[0];

  try {
    return decodeURIComponent(hrefWithoutFragment);
  } catch {
    return hrefWithoutFragment;
  }
}

function isInternalHtmlHref(href: string): boolean {
  return (
    !/^(?:[a-z]+:|\/\/|#)/i.test(href) && /\.html?(?:[?#].*)?$/i.test(href)
  );
}

function rewriteInternalHrefToMarkdown(href: string): string {
  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  if (!match) {
    return encodeURI(href.replace(/\.html?(?=([?#].*)?$)/i, ".md"));
  }

  const [, pathPart, queryPart = "", hashPart = ""] = match;
  const markdownPath = pathPart.replace(/\.html?$/i, ".md");

  return `${encodeURI(markdownPath)}${queryPart}${hashPart}`;
}

function normalizeRelativeDirectory(relativePath: string): string {
  const normalizedPath = normalizePathSeparators(relativePath);
  return normalizedPath === "." ? "" : normalizedPath;
}

function isFilenameLikeLabel(label: string): boolean {
  return /\.html?$/i.test(label.trim());
}

function getRelativeDirectoryForPath(relativePath: string): string {
  return normalizeRelativeDirectory(path.dirname(relativePath));
}

function parseRoboHelpTocScript(scriptContent: string): RoboHelpTocNode[] {
  const match = scriptContent.match(/var\s+toc\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    return [];
  }

  try {
    const parsed = JSON.parse(match[1]);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadRoboHelpTocTree(
  tocPath: string,
  whxdataRoot: string,
  visitedPaths: Set<string> = new Set()
): RoboHelpTocNode[] {
  const normalizedTocPath = normalizePathSeparators(tocPath);
  if (visitedPaths.has(normalizedTocPath) || !fs.existsSync(tocPath)) {
    return [];
  }

  visitedPaths.add(normalizedTocPath);
  const nodes = parseRoboHelpTocScript(fs.readFileSync(tocPath, "utf-8"));

  for (const node of nodes) {
    if (node.type !== "book" || !node.key) {
      continue;
    }

    node.children = loadRoboHelpTocTree(
      path.join(whxdataRoot, `${node.key}.new.js`),
      whxdataRoot,
      visitedPaths
    );
  }

  return nodes;
}

function resolveTocUrlToRelativePath(
  sourceRoot: string,
  url: string | undefined
): string | null {
  if (!url) {
    return null;
  }

  const resolvedPath = path.resolve(sourceRoot, getDecodedPathname(url));
  const relativePath = normalizePathSeparators(
    path.relative(sourceRoot, resolvedPath)
  );

  if (relativePath.startsWith("../") || !fs.existsSync(resolvedPath)) {
    return null;
  }

  return relativePath;
}

function getDescendantTocRelativePaths(
  node: RoboHelpTocNode,
  sourceRoot: string
): string[] {
  const descendantPaths: string[] = [];

  if (node.type === "item") {
    const relativePath = resolveTocUrlToRelativePath(sourceRoot, node.url);
    if (relativePath) {
      descendantPaths.push(relativePath);
    }
  }

  node.children?.forEach((child) => {
    descendantPaths.push(...getDescendantTocRelativePaths(child, sourceRoot));
  });

  return descendantPaths;
}

function inferBookDirectoryRelativePath(
  node: RoboHelpTocNode,
  sourceRoot: string
): string | null {
  const descendantPaths = getDescendantTocRelativePaths(node, sourceRoot);
  if (descendantPaths.length === 0) {
    return null;
  }

  return getRelativeDirectoryForPath(descendantPaths[0]);
}

function addUniqueOrderedTocEntry(
  lookup: Map<string, TocOrderEntry[]>,
  key: string,
  entry: TocOrderEntry
) {
  const existingEntries = lookup.get(key) ?? [];
  if (
    !existingEntries.some(
      (existingEntry) =>
        existingEntry.type === entry.type &&
        existingEntry.relativePath === entry.relativePath
    )
  ) {
    existingEntries.push(entry);
    lookup.set(key, existingEntries);
  }
}

function buildTocOrderLookup(sourceRoot: string): TocOrderLookup | null {
  const whxdataRoot = path.join(sourceRoot, "whxdata");
  const rootTocPath = path.join(whxdataRoot, "toc.new.js");
  if (!fs.existsSync(rootTocPath)) {
    return null;
  }

  const rootNodes = loadRoboHelpTocTree(rootTocPath, whxdataRoot);
  if (rootNodes.length === 0) {
    return null;
  }

  const entriesByDirectory = new Map<string, TocOrderEntry[]>();
  const docLabels = new Map<string, string>();
  const categoryLabels = new Map<string, string>();

  const walkToc = (nodes: RoboHelpTocNode[], currentDirectory: string) => {
    for (const node of nodes) {
      if (node.type === "item") {
        const relativePath = resolveTocUrlToRelativePath(sourceRoot, node.url);
        if (
          relativePath &&
          getRelativeDirectoryForPath(relativePath) === currentDirectory
        ) {
          addUniqueOrderedTocEntry(entriesByDirectory, currentDirectory, {
            type: "doc",
            relativePath,
          });
          if (node.name && !docLabels.has(relativePath)) {
            docLabels.set(relativePath, node.name.trim());
          }
        }
        continue;
      }

      if (node.type !== "book") {
        continue;
      }

      const childDirectory = inferBookDirectoryRelativePath(node, sourceRoot);
      if (childDirectory === null) {
        continue;
      }

      if (node.name && !categoryLabels.has(childDirectory)) {
        categoryLabels.set(childDirectory, node.name.trim());
      }

      if (
        childDirectory !== currentDirectory &&
        getRelativeDirectoryForPath(childDirectory) === currentDirectory
      ) {
        addUniqueOrderedTocEntry(entriesByDirectory, currentDirectory, {
          type: "category",
          relativePath: childDirectory,
        });
      }

      if (node.children && node.children.length > 0) {
        walkToc(node.children, childDirectory);
      }
    }
  };

  walkToc(rootNodes, "");
  return {
    entriesByDirectory,
    docLabels,
    categoryLabels,
  };
}

function getSourceDocSortKey(htmlPath: string): string {
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  const dom = new JSDOM(htmlContent);

  return extractTitle(dom).toLocaleLowerCase();
}

function hasMeaningfulContentOutsideNestedLists(listItem: HTMLElement): boolean {
  return Array.from(listItem.childNodes).some((child) => {
    if (child.nodeType === child.TEXT_NODE) {
      return !isBlankText(child.textContent);
    }

    if (child.nodeType !== child.ELEMENT_NODE) {
      return false;
    }

    const element = child as HTMLElement;
    if (["UL", "OL"].includes(element.tagName)) {
      return false;
    }

    return !isBlankText(element.textContent);
  });
}

function getMarginLeftPx(element: HTMLElement): number {
  const marginLeft = element.style.marginLeft;
  const match = marginLeft.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function findPreviousSiblingList(element: HTMLElement): HTMLElement | null {
  let sibling = element.previousElementSibling as HTMLElement | null;

  while (sibling) {
    if (["UL", "OL"].includes(sibling.tagName)) {
      return sibling;
    }

    if (sibling.tagName === "P" && isBlankText(sibling.textContent)) {
      sibling = sibling.previousElementSibling as HTMLElement | null;
      continue;
    }

    return null;
  }

  return null;
}

function findNextSiblingList(element: HTMLElement): HTMLElement | null {
  let sibling = element.nextElementSibling as HTMLElement | null;

  while (sibling) {
    if (["UL", "OL"].includes(sibling.tagName)) {
      return sibling;
    }

    if (sibling.tagName === "P" && isBlankText(sibling.textContent)) {
      sibling = sibling.nextElementSibling as HTMLElement | null;
      continue;
    }

    return null;
  }

  return null;
}

function getDirectListItems(list: HTMLElement): HTMLElement[] {
  return Array.from(list.children).filter(
    (child): child is HTMLElement => child.tagName === "LI"
  );
}

function normalizeListStructure(root: ParentNode) {
  let changed = true;

  while (changed) {
    changed = false;

    for (const listItem of Array.from(root.querySelectorAll("li"))) {
      const nestedLists = Array.from(listItem.children).filter(
        (child): child is HTMLElement => ["UL", "OL"].includes(child.tagName)
      );

      if (nestedLists.length === 0) {
        continue;
      }

      const isPresentationalWrapper =
        !hasMeaningfulContentOutsideNestedLists(listItem) &&
        (listItem.style.listStyle === "none" ||
          listItem.style.listStyleType === "none" ||
          listItem.style.display === "inline");

      if (!isPresentationalWrapper) {
        continue;
      }

      const parentList = listItem.parentElement as HTMLElement | null;
      const previousListItem = listItem.previousElementSibling as HTMLElement | null;

      if (previousListItem && previousListItem.tagName === "LI") {
        nestedLists.forEach((nestedList) => {
          previousListItem.appendChild(nestedList);
        });
        listItem.remove();
        changed = true;
        break;
      }

      nestedLists.forEach((nestedList) => {
        if (!parentList || !["UL", "OL"].includes(parentList.tagName)) {
          return;
        }

        if (nestedList.tagName === parentList.tagName) {
          getDirectListItems(nestedList).forEach((nestedItem) => {
            parentList.insertBefore(nestedItem, listItem);
          });
          return;
        }

        parentList.insertBefore(nestedList, listItem);
      });
      listItem.remove();
      changed = true;
      break;
    }

    if (changed) {
      continue;
    }

    for (const list of Array.from(root.querySelectorAll("ul, ol"))) {
      const htmlList = list as HTMLElement;
      const directItems = getDirectListItems(htmlList);
      if (directItems.length === 0) {
        continue;
      }

      const visuallyIndentedSublist = directItems.every(
        (item) => getMarginLeftPx(item) > 0
      );

      if (!visuallyIndentedSublist) {
        continue;
      }

      const previousList = findPreviousSiblingList(htmlList);
      if (!previousList) {
        continue;
      }

      const previousItems = getDirectListItems(previousList);
      const parentListItem = previousItems.at(-1);
      if (!parentListItem) {
        continue;
      }

      parentListItem.appendChild(list);
      changed = true;
      break;
    }

    if (changed) {
      continue;
    }

    for (const paragraph of Array.from(root.querySelectorAll("p"))) {
      const htmlParagraph = paragraph as HTMLElement;

      if (
        isBlankText(htmlParagraph.textContent) ||
        getMarginLeftPx(htmlParagraph) <= 0
      ) {
        continue;
      }

      const previousList = findPreviousSiblingList(htmlParagraph);
      const nextList = findNextSiblingList(htmlParagraph);

      if (
        !previousList ||
        !nextList ||
        previousList.parentElement !== htmlParagraph.parentElement ||
        nextList.parentElement !== htmlParagraph.parentElement
      ) {
        continue;
      }

      const parentListItem = getDirectListItems(previousList).at(-1);
      if (!parentListItem) {
        continue;
      }

      parentListItem.appendChild(htmlParagraph);
      changed = true;
      break;
    }
  }
}

function getDirectRows(table: HTMLElement): HTMLElement[] {
  return Array.from(table.querySelectorAll("tr")).filter(
    (row) => row.closest("table") === table
  ) as HTMLElement[];
}

function getRowCells(row: HTMLElement): HTMLElement[] {
  return Array.from(row.children).filter((child): child is HTMLElement =>
    ["TD", "TH"].includes(child.tagName)
  );
}

function getCellColSpan(cell: HTMLElement): number {
  const colSpan = Number(cell.getAttribute("colspan"));
  return Number.isFinite(colSpan) && colSpan > 0 ? colSpan : 1;
}

// RoboHelp wraps single table-cell entries in <ul><li><p>...</p></li></ul>
// purely for the bullet glyph. Unwrap those so the cell content is plain
// blocks; genuine multi-item lists are left alone.
function unwrapPresentationalListsInCell(cell: HTMLElement) {
  let changed = true;

  while (changed) {
    changed = false;

    for (const list of Array.from(cell.querySelectorAll("ul, ol"))) {
      const items = getDirectListItems(list as HTMLElement);
      if (items.length !== 1) {
        continue;
      }

      list.replaceWith(...Array.from(items[0].childNodes));
      changed = true;
      break;
    }
  }
}

function isCellBlank(cell: HTMLElement): boolean {
  return isBlankText(cell.textContent) && !cell.querySelector("img");
}

// Some RoboHelp tables pad rows with blank cells (often paired with a
// colspan header cell), which would emit a dangling empty column. Drop any
// column where no cell with content starts, shrinking colspans that merely
// stretch across it.
function removeEmptyTableColumns(rows: HTMLElement[]) {
  let changed = true;

  while (changed) {
    changed = false;

    const rowCellInfos = rows.map((row) => {
      let column = 0;
      return getRowCells(row).map((cell) => {
        const start = column;
        const span = getCellColSpan(cell);
        column += span;
        return { cell, start, span };
      });
    });

    const tableWidth = Math.max(
      0,
      ...rowCellInfos.map((infos) =>
        infos.reduce((sum, info) => sum + info.span, 0)
      )
    );

    if (tableWidth <= 1) {
      return;
    }

    for (let column = tableWidth - 1; column >= 0; column--) {
      const cellsStartingHere = rowCellInfos
        .flat()
        .filter((info) => info.start === column);

      if (!cellsStartingHere.every((info) => isCellBlank(info.cell))) {
        continue;
      }

      cellsStartingHere.forEach((info) => info.cell.remove());
      rowCellInfos
        .flat()
        .filter((info) => info.start < column && info.start + info.span > column)
        .forEach((info) =>
          info.cell.setAttribute("colspan", String(info.span - 1))
        );
      changed = true;
      break;
    }
  }
}

// RoboHelp header rows are usually th cells, but some tables instead mark
// the header with shaded (bgcolor) td cells.
function isShadedHeaderRow(cells: HTMLElement[]): boolean {
  return (
    cells.length > 0 &&
    cells.every(
      (cell) =>
        cell.hasAttribute("bgcolor") ||
        /background(?:-color)?\s*:/i.test(cell.getAttribute("style") || "")
    )
  );
}

// Markdown tables need a uniform grid, but RoboHelp tables use full-width
// colspan rows as section dividers (e.g. "Edit tab:"). Split each table at
// those rows: the divider content becomes a paragraph between sub-tables,
// and each sub-table repeats the original header row.
function normalizeTables(root: ParentNode) {
  for (const table of Array.from(root.querySelectorAll("table"))) {
    const doc = table.ownerDocument;
    const rows = getDirectRows(table as HTMLElement);

    if (rows.length === 0) {
      table.remove();
      continue;
    }

    rows.forEach((row) =>
      getRowCells(row).forEach(unwrapPresentationalListsInCell)
    );
    removeEmptyTableColumns(rows);

    const columnCount = Math.max(
      ...rows.map((row) =>
        getRowCells(row).reduce((sum, cell) => sum + getCellColSpan(cell), 0)
      )
    );

    const firstRowCells = getRowCells(rows[0]);
    const hasHeaderRow =
      firstRowCells.length > 0 &&
      (firstRowCells.every((cell) => cell.tagName === "TH") ||
        isShadedHeaderRow(firstRowCells));
    const headerRow = hasHeaderRow ? rows[0] : null;
    const bodyRows = hasHeaderRow ? rows.slice(1) : rows;

    const isSectionRow = (row: HTMLElement) => {
      const cells = getRowCells(row);
      return (
        columnCount > 1 &&
        cells.length === 1 &&
        getCellColSpan(cells[0]) === columnCount
      );
    };

    const replacement = doc.createDocumentFragment();
    let pendingRows: HTMLElement[] = [];

    const flushSubTable = () => {
      if (pendingRows.length === 0) {
        return;
      }

      const subTable = doc.createElement("table");
      const thead = doc.createElement("thead");
      const headTr = doc.createElement("tr");

      if (headerRow) {
        for (const cell of getRowCells(headerRow)) {
          const th = doc.createElement("th");
          th.append(...Array.from(cell.cloneNode(true).childNodes));
          headTr.appendChild(th);
        }
      }

      // GFM drops any row cells beyond the header width, so pad the header
      // (and expand remaining colspans below) to the full column count.
      while (headTr.children.length < columnCount) {
        headTr.appendChild(doc.createElement("th"));
      }

      thead.appendChild(headTr);
      subTable.appendChild(thead);

      const tbody = doc.createElement("tbody");
      pendingRows.forEach((row) => {
        for (const cell of getRowCells(row)) {
          const span = getCellColSpan(cell);
          cell.removeAttribute("colspan");
          for (let i = 1; i < span; i++) {
            cell.after(doc.createElement("td"));
          }
        }
        tbody.appendChild(row);
      });
      subTable.appendChild(tbody);
      replacement.appendChild(subTable);
      pendingRows = [];
    };

    for (const row of bodyRows) {
      if (isSectionRow(row)) {
        flushSubTable();
        const sectionBlock = doc.createElement("div");
        sectionBlock.append(...Array.from(getRowCells(row)[0].childNodes));
        replacement.appendChild(sectionBlock);
      } else {
        pendingRows.push(row);
      }
    }

    flushSubTable();
    table.replaceWith(replacement);
  }
}

function rewriteInternalLinks(root: ParentNode) {
  for (const link of Array.from(root.querySelectorAll("a[href]"))) {
    const href = link.getAttribute("href");
    if (!href || !isInternalHtmlHref(href)) {
      continue;
    }

    link.setAttribute("href", rewriteInternalHrefToMarkdown(href));
  }
}

// The source docs link to the live site by absolute URL
// (https://docs.bloomlibrary.org/...). Docusaurus treats any absolute URL as
// external, even one pointing at our own site: such links skip
// onBrokenLinks validation and trigger a full page reload instead of
// client-side navigation. Rewrite them to root-relative paths so they're
// treated as internal links, matching the convention the Notion-sourced docs
// already use (e.g. /ePUB-notes). This must stay in sync with `url` in
// docusaurus.config.js.
const SITE_URL_PATTERN = /^https?:\/\/docs\.bloomlibrary\.org(?=\/|$)/i;

// Stopgap corrections for links whose target is mis-cased/misspelled in the
// upstream RoboHelp source. These were harmless while the links were external,
// but once rewritten to internal links they're validated by onBrokenLinks and
// would fail the build. Remove entries here once the source is fixed.
const SITE_LINK_CORRECTIONS = new Map<string, string>([
  ["/EditTimings/", "/edit-timings/"],
]);

function rewriteAbsoluteSiteLinks(root: ParentNode) {
  for (const link of Array.from(root.querySelectorAll("a[href]"))) {
    const href = link.getAttribute("href");
    if (!href || !SITE_URL_PATTERN.test(href)) {
      continue;
    }

    const relativeHref = href.replace(SITE_URL_PATTERN, "") || "/";
    link.setAttribute(
      "href",
      SITE_LINK_CORRECTIONS.get(relativeHref) ?? relativeHref
    );

    // These were authored as external links; drop the new-tab target and the
    // redundant title (RoboHelp duplicates the URL there) so they render as
    // ordinary internal links.
    link.removeAttribute("target");
    if (link.getAttribute("title") === href) {
      link.removeAttribute("title");
    }
  }
}

function getOverviewFile(entries: fs.Dirent[], dirPath: string): string | null {
  const htmlFiles = entries.filter((entry) => entry.isFile() && isHtmlFileName(entry.name));
  const directoryName = path.basename(dirPath).toLowerCase();
  const exactOverview = htmlFiles.find(
    (entry) =>
      path.basename(entry.name, path.extname(entry.name)).toLowerCase() ===
      `${directoryName}_overview`
  );

  if (exactOverview) {
    return path.join(dirPath, exactOverview.name);
  }

  const anyOverview = htmlFiles.find((entry) => /_overview\.html?$/i.test(entry.name));
  return anyOverview ? path.join(dirPath, anyOverview.name) : null;
}

function getOrderedInternalTargets(
  overviewPath: string,
  sourceRoot: string
): string[] {
  const html = fs.readFileSync(overviewPath, "utf-8");
  const dom = new JSDOM(html);
  const seen = new Set<string>();
  const orderedTargets: string[] = [];
  const structuredAnchors = Array.from(
    dom.window.document.querySelectorAll("ul a[href], ol a[href], table a[href]")
  );
  const anchorsToProcess =
    structuredAnchors.length > 0
      ? structuredAnchors
      : Array.from(dom.window.document.querySelectorAll("a[href]"));

  for (const anchor of anchorsToProcess) {
    const href = anchor.getAttribute("href");
    if (!href || !isInternalHtmlHref(href)) {
      continue;
    }

    const resolvedPath = path.resolve(
      path.dirname(overviewPath),
      getDecodedPathname(href)
    );
    const relativeTarget = normalizePathSeparators(
      path.relative(sourceRoot, resolvedPath)
    );

    if (relativeTarget.startsWith("../") || !fs.existsSync(resolvedPath)) {
      continue;
    }

    if (seen.has(relativeTarget)) {
      continue;
    }

    seen.add(relativeTarget);
    orderedTargets.push(relativeTarget);
  }

  return orderedTargets;
}

function buildSourceOrderLookup(sourceRoot: string): SourceOrderLookup {
  const docPositions = new Map<string, number>();
  const categoryPositions = new Map<string, number>();
  const tocOrderLookup = buildTocOrderLookup(sourceRoot);

  const walk = (dirPath: string) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const relativeDirectory = normalizeRelativeDirectory(
      path.relative(sourceRoot, dirPath)
    );
    const overviewPath = getOverviewFile(entries, dirPath);
    const orderedTargets = overviewPath
      ? getOrderedInternalTargets(overviewPath, sourceRoot)
      : [];
    const orderedEntriesFromToc =
      tocOrderLookup?.entriesByDirectory.get(relativeDirectory) ?? [];

    const directHtmlFiles = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          isHtmlFileName(entry.name) &&
          !isIndexHtmlFileName(entry.name)
      )
      .map((entry) => ({
        name: entry.name,
        sortKey: getSourceDocSortKey(path.join(dirPath, entry.name)),
      }))
      .sort(
        (left, right) =>
          left.sortKey.localeCompare(right.sortKey) ||
          left.name.localeCompare(right.name)
      );

    const childDirectories = entries
      .filter((entry) => entry.isDirectory() && !isSkippedDirectory(entry.name))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right));

    const orderedCategories: string[] = [];

    if (!tocOrderLookup) {
      for (const target of orderedTargets) {
        const resolvedTarget = path.join(sourceRoot, target);
        const relativeToDirectory = normalizePathSeparators(
          path.relative(dirPath, resolvedTarget)
        );

        if (relativeToDirectory.startsWith("../")) {
          continue;
        }

        const segments = relativeToDirectory.split("/");
        if (segments.length === 1) {
          continue;
        }

        const directChildDirectory = segments[0];
        if (
          childDirectories.includes(directChildDirectory) &&
          !orderedCategories.includes(directChildDirectory)
        ) {
          orderedCategories.push(directChildDirectory);
        }
      }
    }

    const seenDocs = new Set<string>();
    const seenCategories = new Set<string>();
    let nextPosition = 1;

    if (orderedEntriesFromToc.length > 0) {
      for (const entry of orderedEntriesFromToc) {
        if (entry.type === "doc") {
          const docName = path.basename(entry.relativePath);
          if (
            seenDocs.has(docName) ||
            !directHtmlFiles.some((file) => file.name === docName)
          ) {
            continue;
          }

          docPositions.set(entry.relativePath, nextPosition++);
          seenDocs.add(docName);
          continue;
        }

        const directoryName = path.basename(entry.relativePath);
        if (
          seenCategories.has(directoryName) ||
          !childDirectories.includes(directoryName)
        ) {
          continue;
        }

        categoryPositions.set(
          normalizePathSeparators(
            path.relative(sourceRoot, path.join(dirPath, directoryName))
          ),
          nextPosition++
        );
        seenCategories.add(directoryName);
      }
    } else if (overviewPath) {
      const overviewRelativePath = normalizePathSeparators(
        path.relative(sourceRoot, overviewPath)
      );
      docPositions.set(overviewRelativePath, nextPosition++);
      seenDocs.add(path.basename(overviewPath));
    }

    for (const directoryName of orderedCategories) {
      if (seenCategories.has(directoryName)) {
        continue;
      }

      categoryPositions.set(
        normalizePathSeparators(
          path.relative(sourceRoot, path.join(dirPath, directoryName))
        ),
        nextPosition++
      );
      seenCategories.add(directoryName);
    }

    for (const { name } of directHtmlFiles) {
      if (seenDocs.has(name)) {
        continue;
      }

      docPositions.set(
        normalizePathSeparators(
          path.relative(sourceRoot, path.join(dirPath, name))
        ),
        nextPosition++
      );
      seenDocs.add(name);
    }

    for (const directoryName of childDirectories) {
      if (seenCategories.has(directoryName)) {
        continue;
      }

      categoryPositions.set(
        normalizePathSeparators(
          path.relative(sourceRoot, path.join(dirPath, directoryName))
        ),
        nextPosition++
      );
      seenCategories.add(directoryName);
    }

    childDirectories.forEach((directoryName) => {
      walk(path.join(dirPath, directoryName));
    });
  };

  walk(sourceRoot);
  return {
    docPositions,
    categoryPositions,
    docLabels: tocOrderLookup?.docLabels ?? new Map(),
    categoryLabels: tocOrderLookup?.categoryLabels ?? new Map(),
  };
}

function getInlineFormattingTags(element: Element): Array<"strong" | "em"> {
  const tags: Array<"strong" | "em"> = [];
  const style = element.getAttribute("style") || "";

  if (
    element.classList.contains("Strong") ||
    element.classList.contains("UserInterface") ||
    /font-weight\s*:\s*(bold|[5-9]00)\b/i.test(style)
  ) {
    tags.push("strong");
  }

  if (
    element.classList.contains("Emphasis") ||
    /font-style\s*:\s*(italic|oblique)\b/i.test(style)
  ) {
    tags.push("em");
  }

  return tags;
}

function hasMeaningfulInlineText(element: Element): boolean {
  return (element.textContent || "").replace(/\u00a0/g, " ").trim().length > 0;
}

function createFormattingWrappers(
  document: Document,
  formattingTags: Array<"strong" | "em">
): { outermost: Element; innermost: Element } {
  let outermost: Element | null = null;
  let innermost: Element | null = null;

  for (const tagName of formattingTags) {
    const wrapper = document.createElement(tagName);

    if (!outermost) {
      outermost = wrapper;
    }

    if (innermost) {
      innermost.appendChild(wrapper);
    }

    innermost = wrapper;
  }

  return {
    outermost: outermost!,
    innermost: innermost!,
  };
}

function normalizeInlineFormatting(root: Element) {
  for (const span of Array.from(root.querySelectorAll("span"))) {
    const formattingTags = getInlineFormattingTags(span);

    if (formattingTags.length === 0 || !hasMeaningfulInlineText(span)) {
      continue;
    }

    const replacement = root.ownerDocument.createDocumentFragment();
    let activeWrapper:
      | { outermost: Element; innermost: Element }
      | null = null;

    for (const childNode of Array.from(span.childNodes)) {
      if (childNode.nodeType === root.ownerDocument.ELEMENT_NODE) {
        const childElement = childNode as Element;

        if (childElement.tagName === "IMG") {
          if (activeWrapper) {
            replacement.appendChild(activeWrapper.outermost);
            activeWrapper = null;
          }

          replacement.appendChild(childNode);
          continue;
        }
      }

      if (!activeWrapper) {
        activeWrapper = createFormattingWrappers(
          root.ownerDocument,
          formattingTags
        );
      }

      activeWrapper.innermost.appendChild(childNode);
    }

    if (activeWrapper) {
      replacement.appendChild(activeWrapper.outermost);
    }

    span.replaceWith(replacement);
  }
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

  rewriteInternalLinks(content);
  rewriteAbsoluteSiteLinks(content);
  normalizeTables(content);
  normalizeListStructure(content);
  normalizeInlineFormatting(content);

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

  // Remove Cloudflare email protection links (they don't work in static sites)
  // These are obfuscated email links that won't work in a static site
  // The HTML contains: <a href="/cdn-cgi/l/email-protection#hash" title="mailto:email@domain.com">
  // After Turndown this becomes: [\[email protected\]](/cdn-cgi/l/email-protection#hash "mailto:email@domain.com")
  // Note: The brackets in [email protected] are escaped as \[ and \]
  // We want to extract the email from the title attribute
  markdown = markdown.replace(
    /\[.*?\]\(\/cdn-cgi\/l\/email-protection#[a-z0-9]+\s+"mailto:\s*([^"]+)"\)/gi,
    (match, email) => {
      // Return just the email address from the mailto: title
      return email.trim();
    }
  );

  // Escape angle bracket placeholders that look like HTML/JSX tags
  // Split by code blocks (triple backticks and single backticks) to avoid escaping inside them
  const parts: string[] = [];
  let inCodeBlock = false;
  let inInlineCode = false;
  let buffer = "";
  let i = 0;

  while (i < markdown.length) {
    // Check for triple backtick code blocks
    if (markdown.substring(i, i + 3) === "```") {
      if (buffer) {
        parts.push({
          text: buffer,
          escape: !inCodeBlock && !inInlineCode,
        } as any);
        buffer = "";
      }
      buffer += "```";
      i += 3;
      // Find the end of the line to include language specifier
      while (i < markdown.length && markdown[i] !== "\n") {
        buffer += markdown[i];
        i++;
      }
      if (i < markdown.length) {
        buffer += markdown[i]; // include the newline
        i++;
      }
      parts.push({ text: buffer, escape: false } as any);
      buffer = "";
      inCodeBlock = !inCodeBlock;
      continue;
    }

    // Check for inline code (single backtick)
    if (!inCodeBlock && markdown[i] === "`") {
      if (buffer) {
        parts.push({ text: buffer, escape: !inInlineCode } as any);
        buffer = "";
      }
      buffer += "`";
      i++;
      inInlineCode = !inInlineCode;
      parts.push({ text: buffer, escape: false } as any);
      buffer = "";
      continue;
    }

    buffer += markdown[i];
    i++;
  }

  if (buffer) {
    parts.push({ text: buffer, escape: !inCodeBlock && !inInlineCode } as any);
  }

  // Now process parts and escape angle brackets in non-code parts
  markdown = parts
    .map((part: any) => {
      if (part.escape) {
        // Escape <word> or <word1 word2> patterns that look like placeholders
        // Now also matches phrases with commas, punctuation, etc.
        return part.text.replace(/<([a-z][a-z0-9\s\-_,\.;:]+)>/gi, "`<$1>`");
      }
      return part.text;
    })
    .join("");

  // Additional MDX safety: Find sections with curly braces outside code blocks
  // and wrap them in HTML comments or convert to proper code blocks
  const lines = markdown.split("\n");
  const safeLines: string[] = [];
  let inFencedBlock = false;
  let consecutiveBraceLines = 0;
  let braceLineBuffer: string[] = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];

    // Track fenced code blocks
    if (line.trim().startsWith("```")) {
      inFencedBlock = !inFencedBlock;
      // Flush any buffered brace lines as code block
      if (braceLineBuffer.length > 0) {
        safeLines.push("```css");
        safeLines.push(...braceLineBuffer);
        safeLines.push("```");
        braceLineBuffer = [];
        consecutiveBraceLines = 0;
      }
      safeLines.push(line);
      continue;
    }

    // If in code block, just pass through
    if (inFencedBlock) {
      safeLines.push(line);
      continue;
    }

    // Check for lines that look like CSS/code with braces or other problematic patterns
    const hasCurlyBraces = /[\{\}]/.test(line);
    const looksLikeCSSOrCode =
      /^\s*[\{\}]\s*$/.test(line) || // standalone braces
      /^\s*[a-z\-]+:\s*[^;]+;?\s*$/i.test(line) || // CSS property
      /^\[lang=/.test(line); // CSS selector

    if (hasCurlyBraces || looksLikeCSSOrCode) {
      braceLineBuffer.push(line);
      consecutiveBraceLines++;
    } else {
      // If we had brace lines buffered, convert them to a code block
      if (braceLineBuffer.length > 0) {
        // Only convert if we have enough lines to justify a code block
        if (consecutiveBraceLines >= 2) {
          safeLines.push("```css");
          safeLines.push(...braceLineBuffer);
          safeLines.push("```");
        } else {
          // Just escape the braces inline
          safeLines.push(
            ...braceLineBuffer.map((l) =>
              l.replace(/\{/g, "`{`").replace(/\}/g, "`}`")
            )
          );
        }
        braceLineBuffer = [];
        consecutiveBraceLines = 0;
      }
      safeLines.push(line);
    }
  }

  // Flush any remaining buffered lines
  if (braceLineBuffer.length > 0) {
    if (consecutiveBraceLines >= 2) {
      safeLines.push("```css");
      safeLines.push(...braceLineBuffer);
      safeLines.push("```");
    } else {
      safeLines.push(
        ...braceLineBuffer.map((l) =>
          l.replace(/\{/g, "`{`").replace(/\}/g, "`}`")
        )
      );
    }
  }

  markdown = safeLines.join("\n");

  // Log warnings for patterns that might still cause issues
  const problematicPatterns = [
    {
      pattern: /<[a-z]+\s+[^>]*,/i,
      desc: "Angle brackets with commas (potential JSX attribute)",
    },
  ];

  let hasIssues = false;
  for (const { pattern, desc } of problematicPatterns) {
    if (pattern.test(markdown)) {
      if (!hasIssues) {
        console.warn(`\n⚠️  Warning in ${htmlPath}:`);
        hasIssues = true;
        filesWithWarnings.push(htmlPath);
      }
      console.warn(`   - ${desc}`);
    }
  }

  if (hasIssues) {
    console.warn(
      `   → This file may need manual review for MDX compatibility.\n`
    );
  }

  return { markdown, title };
}

function generateFrontMatter(title: string, relativePath: string): string {
  // Generate a slug from the filename
  const filename = path.basename(relativePath, path.extname(relativePath));
  const slug = `/Help/Reference/${filename.toLowerCase().replace(/_/g, "-")}`;
  const normalizedRelativePath = normalizePathSeparators(relativePath);
  const sidebarPosition =
    sourceOrderLookup.docPositions.get(normalizedRelativePath) ?? 1;
  const sidebarLabel = sourceOrderLookup.docLabels.get(normalizedRelativePath);
  const sanitizedSidebarLabel =
    sidebarLabel && !isFilenameLikeLabel(sidebarLabel) ? sidebarLabel : undefined;

  return `---
title: ${title}
hide_title: true
${sanitizedSidebarLabel && sanitizedSidebarLabel !== title ? `sidebar_label: ${JSON.stringify(sanitizedSidebarLabel)}\n` : ""}sidebar_position: ${sidebarPosition}
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

function isSkippedDirectory(name: string): boolean {
  return ["template", "assets", "whxdata"].includes(name.toLowerCase());
}

function formatCategoryLabel(name: string): string {
  return name.replace(/_/g, " ").trim();
}

function createCategoryKey(dirPath: string): string {
  const relativePath = path.relative(TARGET_ROOT, dirPath).replace(/\\/g, "/");
  return ["help-reference", relativePath.toLowerCase()]
    .filter(Boolean)
    .join("-")
    .replace(/[\/\s]+/g, "-");
}

function writeCategoryMetadata(sourceDir: string, targetDir: string, label: string) {
  const categoryPath = path.join(targetDir, "_category_.json");
  let existingMetadata: Record<string, unknown> = {};
  const relativeSourceDir = normalizePathSeparators(
    path.relative(SOURCE_ROOT, sourceDir)
  );
  const categoryPosition = sourceOrderLookup.categoryPositions.get(relativeSourceDir);
  const categoryLabel =
    sourceOrderLookup.categoryLabels.get(relativeSourceDir) ?? label;

  if (fs.existsSync(categoryPath)) {
    existingMetadata = JSON.parse(fs.readFileSync(categoryPath, "utf-8"));
  }

  const metadata = {
    ...existingMetadata,
    label: categoryLabel,
    key: existingMetadata.key ?? createCategoryKey(targetDir),
    ...(categoryPosition === undefined ? {} : { position: categoryPosition }),
  };

  fs.writeFileSync(
    categoryPath,
    `${JSON.stringify(metadata)}\n`,
    "utf-8"
  );
}

function createCategoryMetadata(sourceDir: string, targetDir: string) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || isSkippedDirectory(entry.name)) {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (fs.existsSync(targetPath)) {
      writeCategoryMetadata(sourcePath, targetPath, formatCategoryLabel(entry.name));
    }

    createCategoryMetadata(sourcePath, targetPath);
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

    // Skip layout index files as they're navigation rather than content
    if (isIndexHtmlFileName(path.basename(htmlPath))) {
      if (VERBOSE_MODE) {
        console.log("  Skipping index file");
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
      if (isSkippedDirectory(entry.name)) {
        continue;
      }
      walkDirectory(fullPath, sourceRoot, targetRoot);
    } else if (entry.isFile() && isHtmlFileName(entry.name)) {
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
      if (isSkippedDirectory(entry.name)) {
        continue;
      }
      htmlFiles.push(...collectHtmlFiles(fullPath, showProgress));
    } else if (entry.isFile() && isHtmlFileName(entry.name)) {
      if (isIndexHtmlFileName(entry.name)) {
        continue;
      }

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

  sourceOrderLookup = buildSourceOrderLookup(sourceRoot);

  // Process all files with progress reporting
  for (let i = 0; i < htmlFiles.length; i++) {
    processHtmlFile(htmlFiles[i], sourceRoot, targetRoot);

    // Show progress every 50 files (or in verbose mode)
    if (!VERBOSE_MODE && (i + 1) % 50 === 0) {
      const progress = Math.round(((i + 1) / htmlFiles.length) * 100);
      console.log(`Progress: ${i + 1}/${htmlFiles.length} (${progress}%)`);
    }
  }

  createCategoryMetadata(sourceRoot, targetRoot);

  // Copy images to static directory
  console.log("\nCopying images to static directory...");
  copyImages();

  // Print statistics
  console.log("\n=== Conversion Complete ===");
  console.log(`Processed: ${stats.processed} files`);
  console.log(`Skipped: ${stats.skipped} files`);
  console.log(`Images copied: ${stats.imagesCopied} files`);
  if (filesWithWarnings.length > 0) {
    console.log(`\n⚠️  Files with warnings: ${filesWithWarnings.length}`);
    console.log("These files were converted but may need manual review:");
    filesWithWarnings.forEach((file) => {
      const relativePath = path.relative(sourceRoot, file);
      console.log(`  - ${relativePath}`);
    });
  }
  if (stats.errors.length > 0) {
    console.log(`\nErrors: ${stats.errors.length}`);
    stats.errors.forEach((err) => console.error(`  - ${err}`));
  }
  console.log(
    "\nNote: MDX-unsafe patterns have been automatically wrapped or escaped."
  );
  console.log("If build errors occur, check the warning list above.\n");
}

main();
