---
name: bloom-release-notes
description: >-
  Drafts a Bloom release notes file for the bloom-docs repo by pulling Features
  and Improvements from the Bloom YouTrack and writing a Docusaurus markdown
  page in the established style.

  Use whenever the user asks to draft, write, or generate release notes for a
  Bloom version (e.g. "write release notes for 6.5", "make a release notes
  file for 7.0"). The user supplies the version number; everything else
  follows from that.
---

# Bloom Release Notes

## Where things live

- Repo: `c:\dev\bloom-docs`
- Release notes folder: `docs/About-Bloom/Release-Notes/`
- Filename convention: `release-notes-<major>-<minor>.md` (e.g. `release-notes-6-4.md`)
- Notion-pulled images sit alongside as `release-notes-<major>-<minor>.<guid>.png` (do not invent these — see "Images" below)

Read the two most recent release notes before drafting (e.g. `release-notes-6-3.md`, `release-notes-6-2.md`) to mirror the current style — tone, section depth, use of `:::note` / `:::tip` admonitions, and any Notion-style two-column `<div class='notion-row'>...</div>` blocks.

## Pulling issues from YouTrack

Public, no auth needed. Endpoint:

```
https://issues.bloomlibrary.org/youtrack/api/issues
```

Query for a version's Features + Improvements (URL-encoded):

```
?query=%23%7BBloom+X.Y%7D+%23Feature+%23Improvement
&fields=id,idReadable,summary,description,customFields(name,value(name))
&%24top=300
```

That's the YouTrack search `#{Bloom X.Y} #Feature #Improvement`. Save to a file under `C:/temp/` (the Bash tool's `/tmp` is not visible to the Read tool on this Windows setup) and parse with `node` — Python is not on PATH:

```bash
curl -s "https://issues.bloomlibrary.org/youtrack/api/issues?query=%23%7BBloom+X.Y%7D+%23Feature+%23Improvement&fields=id,idReadable,summary,description,customFields(name,value(name))&%24top=300" -H "Accept: application/json" -o "C:/temp/yt-XY.json"
```

```bash
node -e "const fs=require('fs');const issues=JSON.parse(fs.readFileSync('C:/temp/yt-XY.json','utf8'));console.log('Total: '+issues.length);issues.forEach(i=>{const cfs={};i.customFields.forEach(c=>{cfs[c.name]=(c.value&&typeof c.value==='object'&&c.value.name)?c.value.name:null;});console.log(i.idReadable.padEnd(12)+' ['+(cfs.Type||'?').padEnd(11)+'] ['+(cfs.State||'?').padEnd(10)+'] '+i.summary);});"
```

Read each issue's `description` to understand what shipped — summaries alone are too terse for good release notes.

## Filtering caveats

- Items whose summary is prefixed with `[6.X]` (a previous version) are sometimes still on the new version's Kanban board. Cross-check against that older release's published notes — if it's already documented there, skip it. (Example: BL-15829 "[6.3] Switch full-bleed control to Book Settings" was already covered in 6.3's Full Bleed section.)
- The query returns only Features and Improvements. Bug fixes are tracked separately and are usually not listed in release notes.

## Frontmatter

```markdown
---
title: Bloom X.Y Beta Release Notes
slug: /release-notes-X-Y
keywords: [Release Notes]
---
```

## Writing style

- Group items thematically (Custom Front Cover, QR Codes, Color/Eyedropper, Bloom Apps, etc.) rather than listing them by ticket. One YouTrack item often becomes part of a larger section.
- Lead each section with one or two sentences explaining what changed for the user; follow with a bulleted list of specifics if helpful.
- Address the reader as "you". Use "we've added", "we've redesigned" — friendly first-person plural.
- Use `:::note` and `:::tip` admonitions for caveats and side info, matching prior versions' usage.
- Don't include subscription tier markers ("Subscription Tier: Pro and Above") unless recent versions use them — 6.3 dropped them.
- A single short "Other Improvements" bullet list at the end is fine for small items that don't warrant their own section.
- Don't invent details that aren't in the YouTrack issue's summary or description. If a detail is ambiguous, leave it out.

## Images

YouTrack descriptions include image references like `![](image.png){width=70%}`. These point to attachments inside YouTrack — the actual image files used in published release notes are pulled separately from Notion via the GHAction. **Do not** invent `release-notes-X-Y.<guid>.png` filenames. Either:

1. Leave image placeholders out entirely and tell the user screenshots will need to be added, or
2. If the user already has images in the folder for this version (check with Glob `release-notes-X-Y.*.png`), reference real filenames only.

## Final step

After writing, tell the user:

- The path of the new file.
- Which YouTrack items mapped into which sections (helps them sanity-check).
- Any tickets you skipped (e.g. tagged `[older-version]` and already shipped) and why.
