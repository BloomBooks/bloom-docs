---
title: Sample stylesheet rules
sidebar_position: 1
slug: /ref-docs/sample-stylesheet-rules
---

## Sample stylesheets rules

[Editing stylesheets overview](Editing_stylesheets_overview.md) describes stylesheets in Bloom. Normally, if you need a custom rule, Bloom support staff will give you the rule to paste into the file.

However, if you are interested in working with this yourself, here are some useful examples of rules:

-   Make room for staples on the left of the front cover by moving everything to the right and making it a bit more narrow:
    

.A5Portrait.frontCover .marginBox `{` left: 20mm; width: 112mm;`}`

-   Draw a horizontal line between languages in multi-lingual books:
    

.bloom-page:not(.cover) .bloom-content1 + .bloom-content2, .bloom-page:not(.cover) .bloom-content2 + .bloom-content3 `{`

border-top: solid 1px rgb(100,100,100); `}`

#### Note

-   [Font Features](Font_features.md) and [Image-only or Text-only PDFs](Image-only_or_Text-only_PDFs.md) also contain rules you can use or use as examples.
    

#### Related Topics

[Advanced tasks overview](Advanced_tasks_overview.md)