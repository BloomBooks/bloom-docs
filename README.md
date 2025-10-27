# SIL-Bloom-Docs

This creates a static website using [Docusaurus](https://docusaurus.io/). Content comes from two sources:

1. **Main documentation**: Pulled from Notion using [docu-notion](https://github.com/sillsdev/docu-notion)
2. **Reference documentation**: Downloaded from https://ref-docs.bloomlibrary.org

### Installation

```
$ yarn
```

### Local Development

Set these 3 environment variables:

- SIL_BLOOM_DOCS_NOTION_ROOT_PAGE (see [docu-notion](https://github.com/sillsdev/docu-notion) docs)
- SIL_BLOOM_DOCS_NOTION_TOKEN (see [docu-notion](https://github.com/sillsdev/docu-notion) docs)
- SIL_BLOOM_DOCS_CROWDIN_TOKEN (see [Docusaurus Crowdin docs](https://docusaurus.io/docs/i18n/crowdin))

#### Pull content from both sources:

```bash
# Pull main docs from Notion
$ yarn docu-notion

# Download and convert reference docs
$ yarn ref-docs
```

#### Start the development server:

```bash
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.
