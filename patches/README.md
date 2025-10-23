# Patches

This directory contains patches for npm packages that are automatically applied after `yarn install` using [patch-package](https://github.com/ds300/patch-package).

## @docusaurus/theme-search-algolia

**File**: `@docusaurus+theme-search-algolia+3.9.1.patch`

**Purpose**: Makes `apiKey` and `appId` optional in the Algolia `askAi` configuration, matching the behavior of the Algolia API itself which treats these fields as optional.

**Changes**:

- Changed `apiKey` and `appId` from `.required()` to `.optional()` in the validation schema for the `askAi` configuration object

**Why**: The Algolia API considers these fields optional, so the Docusaurus library should too. This allows you to omit them when not needed:

```javascript
algolia: {
  appId: "...",
  apiKey: "...",
  indexName: "bloom",
  askAi: {
    assistantId: "...",
    indexName: "...",
    // apiKey:
    // appId:
  },
}
```

**Maintenance**: This patch will need to be recreated if/when `@docusaurus/theme-search-algolia` is upgraded to a version that doesn't include this fix upstream.
