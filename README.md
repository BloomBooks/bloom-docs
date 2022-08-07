# SIL-Bloom-Docs

This creates a static website using [Docusaurus 2](https://docusaurus.io/) and [docu-notion](https://github.com/sillsdev/docu-notion) docs.

### Installation

```
$ yarn
```

### Local Development

Set these 3 environment variables:

- SIL_BLOOM_DOCS_NOTION_ROOT_PAGE (see [docu-notion](https://github.com/sillsdev/docu-notion) docs)
- SIL_BLOOM_DOCS_NOTION_TOKEN (see [docu-notion](https://github.com/sillsdev/docu-notion) docs)
- SIL_BLOOM_DOCS_CROWDIN_TOKEN (see [Docusaurus Crowdin docs](https://docusaurus.io/docs/i18n/crowdin))

```
$ yarn docu-notion
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.
