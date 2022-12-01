---
title: Bloom 5.4 Beta Release Notes
sidebar_position: 1
slug: /release-notes-5-4
keywords: [Release Notes]
---



## Simple Choice Activities {#7b9137e3a2884dc894dfd5530044ada1}


We’ve added two new activities that you can add to your books. Just enter the correct answer in the first box. When someone reads the book, Bloom will shuffle the answers.


### Choose Word from Picture {#a7522644c0b24bc4b4e2d03f20357ddd}


![](./170924698.png)


### Choose Picture from Word {#1c0627ef95374d84b0d6bff9b0d2b409}


![](./261441133.png)


Are there other simple activities that you would like to have in your Bloom books? Feel free to request them in a [Feature Request](https://community.software.sil.org/c/bloom/featurerequests/16).  Note that a [Bloom Enterprise](https://bloomlibrary.org/page/create/page/feature-matrix) subscription is required to add new activities to a book.


## Get More Books from Within Bloom Reader {#25150f857d294ed4ab6adb1f72a99969}


<div class='notion-row'>
<div class='notion-column'>

Finally, users can get more books into their Bloom Reader without going to a separate browser window. We’ve added a button at the bottom of the screen:

</div>

<div class='notion-column'>

![](./1308884199.png)

</div>
</div>


<div class='notion-row'>
<div class='notion-column'>

You then choose a language and Bloom Reader shows you books from BloomLibrary.org. It will remember your recent languages, so you don’t have to find them each time:

</div>

<div class='notion-column'>

![](./1680403519.png)

</div>
</div>


<div class='notion-row'>
<div class='notion-column'>

Once you pick a book, you can either download it into Bloom Reader or just read it online:

</div>

<div class='notion-column'>

![](./541668660.png)

</div>
</div>


# Smarter Splitter {#de70537d74ce4ca68ce16095433faf20}


We heard you: getting image and text boxes to _just the right size_ was too hard. We’ve made the splitter smart in a couple of ways:


1) You can now double-click the splitter to make it snap to the position used by the previous page.


2) The splitter now “snaps” to some common locations:

- The position used by the previous page.
- The position that perfectly matches the image’s proportions.
- 1/4, 1/3, 1/2, etc.
- Square

<div class='notion-row'>
<div class='notion-column'>

![](./1834670900.png)

</div>

<div class='notion-column'>

![](./183553286.png)

</div>
</div>


3) Previously, the splitter moved by tenths of a percentage. Now, it moves only by full percentage points.


4) If you need more precision, hold down the CTRL key to go back to moving by tenths of a percent, ignoring snap points.


## Fixed Layout ePUBs {#8ec0aa36a08a4b5aaada1f990b9f0a4e}


<div class='notion-row'>
<div class='notion-column'>

Bloom can now create ePUBs in “Fixed” mode which asks ePUB players to preserve the page as you see it in Bloom. If you have a very simple book, Bloom will also let you choose the previous “Flowable” mode.

</div>

<div class='notion-column'>

![](./330307146.png)

</div>
</div>


With this improvement, you can now publish overlay (comic) books as ePUBs.


:::caution

Note that if you make a Talking Book out of an Overlay (comic) book, ePUB readers will read bubbles in the order you created them. That won’t always be the correct order! We have an idea of how to improve things for Bloom 5.5.

:::




See [here](https://docs.bloomlibrary.org/ePUB-notes) for more information about the state of Bloom-to-ePUB publishing.


## Color Chooser {#790ecf6457f14013a5aceac811989c6c}


We improved the color chooser and made the same chooser available everywhere you can set a color, including text, background colors in the overlay tool, and cover colors.


## Text Color in Styles {#ff621bf1d21f4877a38624307b9b515c}


![](./1015538185.png)


As before, you can also color individual words and letters:


![](./2003208278.png)


## Modernised Topic Chooser {#160efe2e19c040a6a2b8adcc2211dbf1}


![](./235385131.png)


## “Needs Copyright” Button {#aa5dac85bc6d400783781f410bdef7bc}


We’ve noticed that sometimes people forget to add a copyright, which later prevents them from publishing the book to BloomLibrary.org. Now Bloom shows this button to prompt you.


![](./1447067824.png)






## Overlay Tool {#8208a44b54ea46caa737a063dd6c74d4}

- We’ve added a new Bubble shape, “Rectangular”:

![](./889566377.png)

- We added hints to remind you about two important shortcuts:

![](./1881105189.png)

- You can now click on the background image in order to change it.
- If a bubble somehow ends up off-screen, Bloom will move it back on screen the next time it loads the page.

Note that a [Bloom Enterprise](https://bloomlibrary.org/page/create/page/feature-matrix) subscription is required to add new Overlay (comic) images to a book.


## Other Improvements {#118605b2d74e4b749b18f97353ab6abc}

- Bloom’s experimental spreadsheet import/export now retains a book’s metadata.
- We added experimental spreadsheet import/export for Talking Books. Note that a [Bloom Enterprise](https://bloomlibrary.org/page/create/page/feature-matrix) subscription is required to use the spreadsheet commands.
- We made it feasible to use leading spaces in a Talking book to make the left edge of a text box vary in order to do things like conform to the image to the left of the text. While we don’t _like_ this approach, it is currently the only way to achieve this.
	- Don't highlight leading/trailing whitespace of current audio segment.
	- Collapse multiple whitespace in translation bubbles.
- When Bloom makes a BloomPack, it now includes any audio in the books.
- Bloom now shows the Sign Language name on the cover. Note that the name only appears once there is at least one recording, and only after the book has been reloaded.
- You can now access the “Scripts & Variants” settings for a Sign languages. The “scripts” part is not relevant, but this allows you to define a language as a regional dialect of a more widely known Sign language.
- If you download and translate a book, Bloom now gives you the same cover colors as the original.
- SIL has deprecated Andika New Basic since Andika now contains all of its characters. We are gradually switching everything over to Andika in a way that we think will be invisible to users. For this release, we switched Bloom Reader & Viewer to come with Andika built in.
- We improved sorting of books in BloomLibrary.org. By default, books now sort from newest to oldest. For particular collections, we can change this to sorting by title with good number sorting so that numbered series will show in order.
- BloomLibrary’s “stats” pages now have a “People Reached Digitally” Stat

![](./1856758316.png)

- We added a way for advanced users to override the image compression we do when we publish books.
- We added a 6” x 9” paper size.
- You can now set text to right-align:

![](./640784881.png)

- You won’t notice it, but we did months of work preparing Bloom to move to a modern browser component. This investment will reduce our maintenance cost and unlock some new capabilities in the future.
- We introduced a new layout to most of our “Publish” screens. In the next version, we’ll complete this transition by rewriting the PDF/Print and Web Upload screens to fit this new system. In the end, the publish screens will be much more uniform so that if you learn one, others will be more familiar.
