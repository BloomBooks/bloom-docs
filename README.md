# SIL-Bloom-Docs

This creates a static website using [Docusaurus 2](https://docusaurus.io/) and [docu-notion](https://github.com/sillsdev/docu-notion) docs.

### Installation

```
pnpm install
```

### Local Development

Set these 3 environment variables:

- SIL_BLOOM_DOCS_NOTION_ROOT_PAGE (see [docu-notion](https://github.com/sillsdev/docu-notion) docs)
- SIL_BLOOM_DOCS_NOTION_TOKEN (see [docu-notion](https://github.com/sillsdev/docu-notion) docs)
- SIL_BLOOM_DOCS_CROWDIN_TOKEN (see [Docusaurus Crowdin docs](https://docusaurus.io/docs/i18n/crowdin))

```bash
pnpm pull
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Dependency Management

- Direct dependencies should stay on exact versions. `pnpm-workspace.yaml` sets `savePrefix: ''`, so `pnpm add` and `pnpm update` will write exact versions by default.
- Add or update packages with an explicit version, for example `pnpm add react@17.0.2` or `pnpm add -D typescript@4.9.5`.
- If pnpm blocks a dependency build script, review it with `pnpm approve-builds` and commit the resulting `allowBuilds` changes in `pnpm-workspace.yaml` only after confirming the package is required.
