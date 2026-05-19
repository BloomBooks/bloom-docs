# Patches

This directory contains patches for npm packages that are automatically applied during `pnpm install` using pnpm's native `patchedDependencies` support.

## @docusaurus/utils

**File**: `@docusaurus__utils@3.9.1.patch`

**Purpose**:
1. Forces Docusaurus' markdown image `urlLoaderLimit` to `0`, so markdown images are emitted as regular asset files instead of inline `data:image` blobs.

**Why**:

Algolia's crawler can reject records when the page HTML becomes too large. Docusaurus was inlining markdown images into the rendered HTML, which inflated records enough to trip that limit. This patch keeps those images as normal asset URLs.

**Implementation note**:

The published `@docusaurus/utils` package only ships the compiled webpack helper in `lib/webpackUtils.js`, so that is the file patched here even though the corresponding upstream Docusaurus source lives in its webpack utils source file.

This native pnpm patch is referenced from the root `package.json` under `pnpm.patchedDependencies`.

**Maintenance**: This patch will need to be recreated if/when `@docusaurus/utils` is upgraded to a version that doesn't include this fix upstream.

## @docusaurus/theme-search-algolia

**File**: `@docusaurus__theme-search-algolia@3.9.1.patch`

**Purpose**: 
1. Makes `apiKey` and `appId` optional in the Algolia `askAi` configuration, matching the behavior of the Algolia API itself which treats these fields as optional.
2. Opens external links in search results in a new browser window/tab (configurable).

**Changes**:

- Changed `apiKey` and `appId` from `.required()` to `.optional()` in the validation schema for the `askAi` configuration object
- Modified the `Hit` component in `SearchBar/index.js` to detect external URLs and render them as anchor tags with `target="_blank"` and `rel="noopener noreferrer"` instead of using the internal `Link` component
- Added `openExternalLinksInNewTab` configuration option to control this behavior

**Why**: The Algolia API considers these fields optional, so the Docusaurus library should too. This allows you to omit them when not needed:

```javascript
algolia: {
  appId: "...",
  apiKey: "...",
  indexName: "bloom",
  openExternalLinksInNewTab: true, // Open external search results in new tab (optional, defaults to false)
  askAi: {
    assistantId: "...",
    indexName: "...",
    // apiKey: // optional
    // appId: // optional
  },
}
```

**Maintenance**: This patch will need to be recreated if/when `@docusaurus/theme-search-algolia` is upgraded to a version that doesn't include this fix upstream.
These patches can be regenerated with `pnpm patch` and `pnpm patch-commit`.
