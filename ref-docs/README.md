# Reference Documentation Pipeline

This folder contains scripts and downloads for incorporating our reference documentation into the docs.bloomlibrary.org site. These docs start out in RoboHelp where they make the .chm file that ships with Bloom. Marlon exports that as a website to an s3 bucket which we can get to from ref-docs.bloomlibrary.

The converted documentation is then integrated into the main Docusaurus site at https://docs.bloomlibrary.org

- **`download.ts`** - Starts with the sitemap.xml, and downloads those files that are new or changed based on what it finds in `previous-downloads.json`. It downloads them to `downloads/` and updates the `previous-downloads.json`.

- **`convert.ts`** - Converts downloaded HTML files to Markdown and copies images to `static/ref-docs-assets/`, where Docusaurus needs them.

- **`pull-ref-docs.yml`** - is a GitHub Actions workflow that does this.

## Usage

From the project root, run:

```bash
yarn ref-docs
```

Then start the server as usual, `yarn start`.
