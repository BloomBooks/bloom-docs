---
title: Image-only or Text-only PDFs
sidebar_position: 1
slug: /ref-docs/image-only-or-text-only-pdfs
---

## Image-only or Text-only PDFs

You may want to produce PDF files that contain only the images or only the words. This could permit you to use different printers. For example, you may want to use a black and white printer for the words, but a more expensive color printer for the images.

### For a single book

1.  Use [Show in File Explorer](../../User_Interface/Tabs/Collections_tab_commands.md) to find your collection folder.
    
2.  Open the folder for the particular book.
    
3.  Create or [edit](Editing_stylesheets_overview.md) (if already created) the customBookStyles.css file in a text editor.
    

Do either of these steps:

1.  -   To make a PDF that has only words, paste this into the file:
        

/\* The media section below will keep any pictures from appearing in the pdf of this

book. \*/

@media print `{`

 .bloom-imageContainer, img

`{`

visibility: hidden;

border: transparent;

`}`

`}`

1.  -   To make a PDF that has only pictures, paste this into the file:
        

/\* The media section below will keep any text from appearing in the pdf of this

book (except where it is part of an image, such as some branding images). \*/

@media print `{`

.bloom-translationGroup `{`

visibility: hidden;

border: transparent;

`}`

.cover DIV\[data-book\], .titlePage DIV\[data-book\] `{`

border: transparent;

`}`

.bloom-page \* `{`

color: transparent !important;

`}`

.numberedPage::after `{`

visibility: hidden;

`}`

`}`

4.  Save the changes to the customBookStyles.css file.
    
5.  [Generate](../Publish_tasks/PDF_and_Print.md) the PDF file(s) in the Publish tab.
    
6.  Repeat steps 1 through 5 as needed.
    

### For an entire collection

1.  Use [Show in File Explorer](../../User_Interface/Tabs/Collections_tab_commands.md) to find your collection folder.
    
2.  [Edit](Editing_stylesheets_overview.md) the customCollectionStyles.css file in a text editor.
    

Do either of these steps:

1.  -   To make a PDF that has only words, paste this into the file:
        

/\* The media section below will keep any pictures from appearing  
in the pdf of any book in this collection. \*/  
@media print `{`

 .bloom-imageContainer, img

`{`

visibility: hidden;

border: transparent;

`}`

`}`

1.  -   To make a PDF that has only pictures, paste this into the file:
        

/\* The media section below will keep any text from appearing  
in the pdf of any book in this collection (except where it is part of an image, such as some branding images). \*/  
@media print `{`

.bloom-translationGroup `{`

visibility: hidden;

border: transparent;

`}`

.cover DIV\[data-book\], .titlePage DIV\[data-book\] `{`

border: transparent;

`}`

.bloom-page \* `{`

color: transparent !important;

`}`

.numberedPage::after `{`

visibility: hidden;

`}`

`}`

3.  Save the changes to the customCollectionStyles.css file.
    
4.  [Generate](../Publish_tasks/PDF_and_Print.md) the PDF file(s) in the Publish tab.
    
5.  Repeat steps 1 through 4 as needed.
    

#### Note

-   When you paste content into a \*.css file, be careful to not put it in a place where it is commented-out.
    

To return a \*.css file to its previous state, remove or comment-out the contents you pasted into it. Otherwise, delete the file if no longer needed.

-   The Edit tab is not affected; the Publish tab will change.
    
-   If necessary, [get more help](../../Overview/Get_More_Help.md).
    

#### Related Topics

[Advanced tasks overview](Advanced_tasks_overview.md)

[Tasks overview](../Tasks_overview.md)