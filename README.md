# SIL-Bloom-Docs

This creates a static website using [Docusaurus 2](https://docusaurus.io/) and [notion-pull](https://github.com/sillsdev/notion-pull) docs.

### Installation

```
$ yarn
```

### Local Development

Set these 3 environment variables:

- SIL_BLOOM_DOCS_NOTION_ROOT_PAGE (see [notion-pull](https://github.com/sillsdev/notion-pull) docs)
- SIL_BLOOM_DOCS_NOTION_TOKEN (see [notion-pull](https://github.com/sillsdev/notion-pull) docs)
- SIL_BLOOM_DOCS_CROWDIN_TOKEN (see [Docusaurus Crowdin docs](https://docusaurus.io/docs/i18n/crowdin))

```
$ yarn notion-pull
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.
