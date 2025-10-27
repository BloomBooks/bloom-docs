---
title: Font features
sidebar_position: 1
slug: /Help/Reference/font-features
---

## Font features

Some [fonts](../../Concepts/Font.md) have "font features". They control how individual characters appear. See [https://software.sil.org/](https://software.sil.org/fonts/ "https://software.sil.org/fonts/") and [https://scriptsource.org/](https://scriptsource.org/cms/scripts/page.php? "https://scriptsource.org/cms/scripts/page.php?") for more information.

Currently there is no Bloom UI support for this. However, advanced users can [edit](Editing_stylesheets.md) the customCollectionStyles.css or customBookStyles.css file and add a rule.

### Examples

-   This rule changes the number "4" to be open instead of closed:
    

\[lang="kdj"\]

```css
{  
  font-feature-settings: "dig4" 1;  
  -moz-font-feature-settings: "dig4" 1;  
}
```

-   To add support for multiple languages, separate each language definition with a comma:
    

\[lang="kdj"\], \[long="tpi"\]

-   To add support for multiple glyphs, separate each glyph's rule with a comma:
    

```css
{  
  font-feature-settings: "dig4" 1, "i\_tl" 1, "Qalt" 1;  
  -moz-font-feature-settings: "dig4" 1, "i\_tl" 1, "Qalt" 1;  
}
```

-   If you use Calibri, you may see that ![](/ref-docs-assets/images/Tasks/Advanced_tasks/FontReplaced.png).
    

In this case, you need to enable "Stylistic set 2". Then, the correct glyph will appear.

To do this, [edit](Editing_stylesheets.md) your customCollectionStyles.css or customBookStyles.css file.

Here is an example of the rule to add.

\[lang="kdj"\]

```css
{  
  font-feature-settings: "ss02" 1;  
```
  \-moz-font-feature-settings: "ss02" 1;  
`}`

#### Note

-   Use [http://clagnut.com/sandbox/css3/](http://clagnut.com/sandbox/css3/) to test fonts and get codes like this.
    
-   You will need to change the language identifiers to use these examples.
    
-   [Get more help](../../Overview/Get_More_Help.md) because how to edit .css stylesheets is beyond the scope of Bloom Help.
    

#### Related Topics

[Editing stylesheets overview](Editing_stylesheets_overview.md)