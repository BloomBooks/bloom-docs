---
title: Editing stylesheets overview
sidebar_position: 1
slug: /ref-docs/editing-stylesheets-overview
---

## Editing stylesheets overview

Like other publishing systems, Bloom uses something called a "Stylesheet" to control fonts, styles, layouts, etc. The stylesheet system Bloom uses is same as that used by all web browsers,

which is "CSS" (Cascading Style Sheets).

In most situations, you will never see one of these stylesheets directly; Bloom maintains them for you using various parts of its user interface. However, occasionally you may need some layout or style feature that is not directly accessible from the Bloom user interface. In that case, Bloom lets you add rules directly to the stylesheet system.

The customCollectionStyles.css file is found at the root of each collection folder on your hard drive. You can [edit](Editing_stylesheets.md) it in a simple text editor like Notepad (Windows®) or a Linux equivalent. Any rules that you type or paste into this file will be applied to all books.

Normally, if you need a custom rule, Bloom support staff will give you the rule to paste into the file.

However, if you are interested in working with this yourself, here are topics with some useful examples of rules:

-   [Font Features](Font_features.md)
    
-   [Image-only or Text-only PDFs](Image-only_or_Text-only_PDFs.md)
    
-   [Sample stylesheet rules](Sample_stylesheet_rules.md)
    

#### Tip

-   Bloom will also use (but not create) a customBookStyles.css. It works just like customCollectionStyles.css, but only applies to the book.
    

You can copy and rename the customCollectionStyles.css. In needs to be in the same folder as the book that you want to control.

#### Related Topics

[Advanced tasks overview](Advanced_tasks_overview.md)

[Editing stylesheets](Editing_stylesheets.md)