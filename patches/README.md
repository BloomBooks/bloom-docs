# Patches

This directory contains patches for npm packages that are automatically applied during `pnpm install` using pnpm's native `patchedDependencies` support.

## @docusaurus/utils

**File**: `@docusaurus__utils@3.10.1.patch`

**Purpose**:
1. Forces Docusaurus' markdown image `urlLoaderLimit` to `0`, so markdown images are emitted as regular asset files instead of inline `data:image` blobs.

**Why**:

Algolia's crawler can reject records when the page HTML becomes too large. Docusaurus was inlining markdown images into the rendered HTML, which inflated records enough to trip that limit. This patch keeps those images as normal asset URLs.

**Implementation note**:

The published `@docusaurus/utils` package only ships the compiled webpack helper in `lib/webpackUtils.js`, so that is the file patched here even though the corresponding upstream Docusaurus source lives in its webpack utils source file.

This native pnpm patch is referenced from `pnpm-workspace.yaml` under `patchedDependencies`.

**Maintenance**: This patch will need to be recreated if/when `@docusaurus/utils` is upgraded to a version that doesn't include this fix upstream.

These patches can be regenerated with `pnpm patch` and `pnpm patch-commit`.
