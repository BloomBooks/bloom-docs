# Patches

This directory contains patches for npm packages that are automatically applied after `yarn install` using [patch-package](https://github.com/ds300/patch-package).

## @docusaurus/theme-search-algolia

**File**: `@docusaurus+theme-search-algolia+3.9.1.patch`

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
