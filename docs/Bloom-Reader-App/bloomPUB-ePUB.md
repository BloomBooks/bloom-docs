---
title: BloomPUB vs. ePUB- What’s the Difference
sidebar_position: 3
slug: /bloomPUB-ePUB
---



# Introduction {#de5322c6ad764ca7b4918a91539545c4}


Bloom supports two digital book formats — BloomPUB and ePUB. 


BloomPUB files faithfully display Bloom books exactly as they appear in Bloom, including audio, video, motion, background music, overlays, etc. If you can do it in Bloom, you can see it in a BloomPUB. BloomPUB files can be read online in [BloomLibrary.org](http://bloomlibrary.org/) or offline using [Bloom Reader](https://bloomlibrary.org/bloom-reader) (Android) and the [BloomPUB Viewer for Windows](https://bloomlibrary.org/bloompub-viewer).


ePUB is a [digital book standard](https://www.w3.org/publishing/epub32/epub-spec.html) widely used in the book industry and by other organizations developing digital books for communities. It is a distribution and interchange format for digital publications and documents. ePUB files can be read in a variety of e-readers on various platforms. Bloom can export books to the ePUB format.


# Strengths and Weaknesses {#993a27b05d384a018b59c058d50bafd7}


ePUB’s strength (distribution and interchange) is also its weakness: ePUB files can be used in a wide range of platforms and apps, but the features available in ePUB books are not as rich as what is available within Bloom using BloomPUB files. Since different apps implement the ePUB standard in different ways, there is no way to be sure that more complex elements of an ePUB will be faithfully rendered on any given platform. One important issue is that some ePUB readers will play back recorded audio while others only use a ‘text-to-speech’ function to play audio. If the Bloom book is a Talking Book, it is essential that the e-reader play back the recorded narration.


Bloom provides a number of features that cannot be replicated (or easily replicated) in the ePUB standard:

- **Overlays**. A Bloom book that uses overlays (aka _comics_) cannot be exported to ePUB.
- **Complex page layouts**. Bloom allows you to divide a page into many sections which can each hold text, image, video, etc. Such layouts do not ‘translate’ to ePUB.
- **Motion**. BloomPUB motion books have two modes — a regular talking book and, in landscape orientation, a book with the image full screen that pans from a starting point to an ending point. You can export a book with motion to ePUB, but you lose the motion effect.
- **Music**. You can add background music that will play in a BloomPUB reader but you will not hear the music if you export the book to ePUB.

There are also some things that can be done in ePUB that Bloom does not support in its ePUB export:

- **Side-by-side content**. It is easy in Bloom to create custom pages with content that is side-by-side. The ePUB standard allows for such layout, and other ePUB creation tools enable you to do that, but any side-by-side layout is lost when a Bloom book is exported to ePUB. Instead, all of the page content appears in a column, one below the other.
- **Landscape orientation books**. ePUB supports both portrait and landscape orientations as does Bloom, but Bloom landscape books are exported to ePUB in portrait orientation.

# Why Use ePUB? {#e4a7241b51f14827aaf5cc2a60c23966}


If Bloom books are richer in features and there are free BloomPUB readers available, why would you use ePUB? The primary reason to use ePUB is so that your books can be exchanged with other platforms and read on a wider range of devices. 


Since ePUB is so widespread in the digital book world, it is the primary format used to exchange digital books. If you want or need to be able to share Bloom books with other platforms, you will need to export them to ePUB. Here are some examples where this might be the case:

- **Funder requirements**. In some projects, the donor requires that you make your books available in ePUB format. This was the case in the All Children Reading Begin with Books project that SIL LEAD implemented with SIL Mali. The books were going to be submitted to the Global Digital Library, and ePUB was the preferred format for submission.
- **Partner requirements**. Many of SIL’s book publishing partners have systems built around the ePUB standard or use ePUB as their interchange format. Those include [The Asia Foundation](https://asiafoundation.org/what-we-do/books-for-asia/lets-read/), [Worldreader](https://read.worldreader.org/), [Storyweaver](https://storyweaver.org.in/), [African Storybook](https://www.africanstorybook.org/), [World Around You](https://deafworldaroundyou.org/Stories), and [eKitabu](https://www.ekitabu.com/). Exchanging books with these platforms requires ePUB.

Bloom works great within its own ‘ecosystem’ but needs ePUB to work with others’ systems.


# Recommendations {#2a6c40ce2bc34e26af7313c2aacda817}


For most needs, you can work within the Bloom ‘ecosystem’ — BloomLibrary.org, Bloom Reader, BloomPUB Viewer, Bloom Editor, etc. Everything you can create in the Bloom Editor you can read in other parts of the ecosystem. But if you need to exchange books with other partners who use ePUB, you need to keep that in mind.


If you plan to exchange books with such partners, you need to carefully consider whether you want to use any of the Bloom features that do not work with ePUB. That can include only using portrait orientation, not using side-by-side layout, or not using motion or background music. 


Also, if you did not plan to export to ePUB when you created your books but now want to export them to ePUB, you need to review your books for features that do not export to ePUB well or at all. It may be necessary in some cases to duplicate a book and edit the copy in ways that work better when you export to ePUB.

