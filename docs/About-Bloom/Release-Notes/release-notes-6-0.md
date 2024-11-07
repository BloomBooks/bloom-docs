---
title: Bloom 6.0 Beta Release Notes
sidebar_position: 2
slug: /release-notes-6-0
keywords: [Release Notes]
---



We are proud to present Bloom 6.0 to you. We finally tackled a few long-standing needs that required re-modeling how some things work deep inside Bloom and our servers. Everyone will benefit from Bloom books that are now a bit more beautiful and professional-looking. If you ever need to update books on BloomLibrary.org, you will notice much quicker updates. Bloom Enterprise subscribers can finally take ownership of all their books, regardless of which team member uploaded them.


## Book Settings {#c29cb0c6a6d44842b1c207b884f34c37}


### Cover Settings {#bcdc092e15674cd4ab897fd5f8a8aad5}


You can now control what information to show on the cover page:


![](./release-notes-6-0.a59a0e55-5613-4a9e-acc4-54276835682b.png)


### Content Page Settings: Page Themes {#bd291e96f2d2400d860d1c6636cd8df8}


Previously, _very_ advanced Bloom users could customize Bloom pages using CSS stylesheets. They could also publish template books using these to share their work with others. Bloom 6.0 makes this much easier by letting you choose from a small number of _Page Themes._  Page Themes are a bundle of margins, borders, and other page settings that work together to shape the look of a book.


![](./release-notes-6-0.39beadde-10be-458e-a643-71346b2a97ee.png)


For more information on these themes, see the [Page Themes Catalog](/page-themes-catalog).


:::tip

Very advanced users can still create custom CSS stylesheets if they need to. In fact, we’ve made writing them [much easier](/appearance-system-css). However, we hope this will become a rare practice restricted to experimentation. Anything that can be done with a custom stylesheet can now be moved into a new _theme_ or setting, where it will be available to Bloom users of all skill levels.

:::




### Content Page Settings: Show Page Numbers {#2fa052330ea64f3791781a1919d1e754}


You can now control whether page numbers are visible. Note that with some combinations of book layouts and ebook themes, long texts could collide with page numbers.


### Content Page Settings: Text Padding {#1044bb19df12809a8369dbee37f0234e}


Smart text padding is a new feature in Bloom 6.1. You can see examples of it later in these Release Notes. 


![](./release-notes-6-0.1044bb19-df12-804b-beff-f15ab8bc0815.png)


:::tip

The default padding setting from the Default Theme is “1em”, which means it grows in proportion to your font size (approximately the width of the font’s “m” character). Normally this looks great but if you have really large characters, it can be a problem. In that case, choose one of the millimetre (mm) choices.

:::




:::caution

If you have a custom page layout where Bloom isn’t getting the padding right, you can use this control to turn padding off by setting it to “0mm”.

:::




## Margins {#ad8a99c4ae414b74aa742f70491b7e75}


In previous versions of Bloom, the default margins were rather large, especially on small page sizes. In Bloom 6.0, we’ve reduced [the default margins](/margins) for many page sizes. _Page Themes_ (new in Bloom 6.0) can also change the margin.


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.c8f6cbea-13b4-4c09-b29e-b49a098b1048.png)



Bloom 5.6 had large margins and always showed a page number.


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.b6d4a925-92b1-4170-8e06-c1bd9dafc931.png)



Bloom 6.0 ebook with default theme


</div><div className='notion-spacer'></div>
</div>


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.ad3c3977-6676-42aa-9a73-0c44dcd10f51.png)



Bloom 6.0 ebook with the “Zero Margin” theme


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.c96e5fc3-1312-4b3d-8c78-d912404cd93f.png)



Bloom 6.0 with the “Zero Margin” theme


</div><div className='notion-spacer'></div>
</div>


:::tip

Due to changes in the margins, you might need to modify the split between the image and text to resize the image for an ideal fit.

:::




### Front and Back Cover Margins {#bb5d8a2d9d934e31b88ba11637c9d67f}


The smaller default page margins affect the front and back covers as well as the inside pages.  This results in the various cover elements such as titles, pictures, credits, and logos moving slightly and possibly becoming a bit larger.  (The changed text wrapping of the title is discussed below.)


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.de0bb84e-6e63-4477-a3c4-2077f081a283.png)



Bloom 5.6


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.de773b31-cecd-45b5-869e-1c4e3c204c50.png)



Bloom 6.0


</div><div className='notion-spacer'></div>
</div>


## Padding {#02bad6edddbd4ab0be35b0f744a68e1b}


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


In previous versions of Bloom, text was often very close to images:



</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.3cffffc1-dcb6-4a14-a131-8f0ab7ba1ce5.png)



Bloom 5.6, text is too close to the image and edge of page.


</div><div className='notion-spacer'></div>
</div>


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


Bloom can now add padding to text boxes so that they will look a lot better. This “smart padding” appears as a light blue area when you’re editing. It is smart in two ways:


1. It considers page margins so that less padding is added if it's not needed to separate the text from the edge of the page.

2. It grows as the font size grows.


:::note

In multilingual books, the padding will be based on the font size of the first language.

:::




</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.9035a424-1fd2-481d-aca7-775195d9d141.png)



Bloom 6.0, Bloom adds padding around the text. It can tell that there is no page margin here, so it adds padding next to the edge of the page, too.


</div><div className='notion-spacer'></div>
</div>


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


You can now click in the dark area outside of the page in order to hide all the markup. This helps you see the page just as your readers will see it.



</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.a67f53fe-3fd3-41b1-9d4e-d1332bfb2c02.png)



In Bloom 6.0, if you click outside of the page, all the extra editing markup disappears so that you can evaluate how your page will look to readers.


</div><div className='notion-spacer'></div>
</div>


You can control the size of the padding in the Text Padding control:


![](./release-notes-6-0.46c1699d-2d2a-4771-ae06-5c88abffb5c3.png)


:::caution

While Bloom tries to be “smart” about applying padding, it’s actually quite fragile. It often fails to apply padding to text boxes that have been added via “Change Layout”. If this happens to you, you have a couple options:
1. Turn Text Padding off by opening the Book Settings and set “Text Padding” to “0mm”.

2. If you are an Enterprise Subscription customer and you have a template page that needs to work with padding, create a Problem Report showing the problem and we’ll fix Bloom to handle your template page.

:::




## Edit Tab {#7989dbabeb354bffb02132c00ae8a4af}


### Text Formatting {#fcd9a64087fe49f4836dbc7b28dacb47}


In overlays (comics), you can now control how much padding to add on the left and right:


![](./release-notes-6-0.c7203b3e-7b97-4607-9524-404698431c02.png)


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.3125)'}}>


![](./release-notes-6-0.40e8b7b8-6f3b-4fb7-8100-1b46cc9f5139.png)


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.6875)'}}>


![](./release-notes-6-0.aa68cd90-f943-4a8c-9673-27c9ab7076a9.png)


</div><div className='notion-spacer'></div>
</div>


### Justified Alignment ([Feature Request](https://community.software.sil.org/t/justified-text-alignment/8091)) {#2b21fd203ff546adabfb4f7ed73d3156}


![](./release-notes-6-0.e8fc58f1-a6df-4a91-aae8-cbba7560e33a.png)


### Text Wrapping {#30ac975047114e1593170902683743d3}


We’ve made Bloom smarter about where to wrap text, leading to a more balanced and appealing typography.


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.e2f4af9a-8cd1-418a-8e32-879df197ba9a.png)


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.bced1037-a798-4707-9a9b-0f0eb2e2ae37.png)



Bloom 6.0 makes titles look more balanced.


</div><div className='notion-spacer'></div>
</div>


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.26fdf0f8-da54-4475-94a7-436dde0c642c.png)



Previously, a single word could be stranded on its own.


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.a2cf52af-e2b2-4130-a411-f34a8ed0fc2a.png)



Bloom 6.0 uses smarter text wrapping.


</div><div className='notion-spacer'></div>
</div>


:::tip

This smart wrapping would be confusing if it was on while you tried to type in your text. Therefore, you need to click out of a text box in order to see the final text wrapping.

:::




### Picture on the Right {#bf52c033e9d84e17bb470ea5db91771b}


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


We’ve added a new page layout choice, “Picture on the Right”.


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.e32247fe-3706-4990-a578-634f892ae7c9.png)


</div><div className='notion-spacer'></div>
</div>


## Bloom Library {#c80de714dea74eeaacd333db2fa0ee58}


### Improved User Interface for Book Uploaders {#042f7008ce844e5f81386e611f110ff9}


The person who uploaded a book always had a few extra things they could do to control the book. We’ve now gathered these together in a single cluster of controls:


![](./release-notes-6-0.306c3331-868f-401f-bda3-03ad10a0ef21.png)


### “Download Into Bloom for Editing” Button {#5e996d28e7a94c07928a6f8a1e6f04dd}


Sometimes, you may want to improve a book you or a colleague uploaded but no longer have easy access to the original Bloom files. Now, you can click “Download into Bloom for Editing.” This will open your Bloom Editor application with a new collection containing only this one book. If the book depends on a Bloom Enterprise Subscription, you will not have to re-enter it. If the subscription has expired, it will work anyway.


### Editing Permissions on Your Bloom Library Collections (Bookshelves) {#286550b872b54090831f78c3e11c90d4}


Bloom Enterprise subscribers often work in teams, with different people uploading books. Previously, only the person who uploaded a book had any control over it. We can now tell the Bloom Library who each collection’s “editors” are. The following table shows what Collection Editors will be able to do:


|                    | 5.6                                  | 6.0 Timeframe                                                                                                                                  | 6.1 Timeframe                                                     |
| ------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Original Uploader  | Draft<br/>Delete<br/>Control Formats | Download into Bloom for Editing                                                                                                                |                                                                   |
| Collection Editors |                                      | Delete<br/>Download into Bloom for Editing<br/>Re-upload without changing the listed “uploader”<br/>Re-upload and become the listed “uploader” | Draft<br/>Control Formats<br/>Assign to Collections (Bookshelves) |


When you re-upload a book, Bloom checks with you to make sure it does what you intend. In Bloom 6.0, we added (1) a check to bring it to your attention if you’re about to change the book’s branding and (2) the option to become the official uploader:


![](./release-notes-6-0.6188fcae-b107-4866-a315-1449c6986c8d.png)


## BloomPUB Viewer {#9f34e37cfdef4ecab8d4aa38737a0bfc}


BloomPUB viewer can now open .bloomSource files (used for archiving) and .bloom files (used for Team Collections).  You should not distribute those for viewing, but sometimes it’s helpful to quickly look inside one of them.


:::caution

BloomPUB Viewer versions 1.0.7 and 1.0.8 had a bug that prevented them from updating to new versions. Please install the latest from [bloomlibrary.org/bloompub-viewer](https://bloomlibrary.org/bloompub-viewer).

:::




## Other Improvements {#f0c7b7116e3d459295ff6dee92c89f2e}

- Book Uploading:
	- **Incremental uploads**: If you upload a book to update it, only the files that have changed will be uploaded. This allows, for example, large sign language books to be updated without having to send all the videos to [BloomLibrary.org](http://bloomlibrary.org/) again.
	- **Incomplete upload protection**: previously, a book upload that didn’t fully complete could leave a book missing some files. Now, a new book won’t appear until all the files have been uploaded successfully. Similarly, an update of a book won’t take effect until all changed files have made it to our server.
	- **Improved security:** We improved security around uploading and deleting books.
- We added some new messages to help when Microsoft OneDrive appears to be causing problems.
- A page can now have multiple Sign Language videos. One will start when other is finished. There is no way to change the order, so please create the videos in the order you want them to play.
- In the Edit tab, Bloom has a chooser that lets you control which languages are shown in text boxes that are set to “auto”. To clarify what this chooser does a bit, it is now disabled when it won’t affect anything on the current page.
- We added a place to enter one or more administrator emails in Collection Settings: **Team Collection**.

<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>

- In the **Collection Tab**, we’ve added a small control that pops up some technical information about books:

</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./release-notes-6-0.8136ac3f-21b7-482c-ad13-1a29722646d6.png)


</div><div className='notion-spacer'></div>
</div>

