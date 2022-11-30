---
title: Notes on “Publish as ePUB”
sidebar_position: 2
slug: /ePUB-notes
keywords: [ePUB, publish, ebook]
---



:::tip

**Fixed vs. Flowable ePUBs**

Starting with Bloom 5.4, you have the option of publishing ePUBs in either **Fixed** **layout** mode or **Flowable** mode. 

**Fixed Layout** ePUBs work with fully compatible e-readers (ePUB 3 standard) to display the book exactly like it is shown in Bloom. Fixed mode ePUB is an attractive option for landscape books and it is the only option for Bloom books containing image overlays like speech bubbles and captions. Unfortunately, many e-readers do a very poor job of presenting landscape books. In addition, Fixed mode ePUBs do not handle scrolling text boxes, so all your text must fit on the page.

**Flowable** ePUBs allow e-readers to lay out images and text however they want. This mode also enables users to adjust the size of the text in the app or user system font settings. 

:::




:::tip

Note that for dependable What You See Is What You Get digital Bloom books, we recommend readers that handle our **bloomPUB** format. Currently, these are: Bloom Reader, BloomPUB Viewer, and apps created with Reading App Builder. These readers also supply analytics back to BloomLibrary.org so that you can see how your books are doing.

:::




There are many ePUB readers available for Windows, Android, iOS and Linux, but these readers vary in their ability to comply with the ePUB3 standard. As a result, you cannot depend on them to faithfully display the contents of a Bloom book, play sign language videos, or to play audio of Bloom Talking Books.


In the following two charts, we present some notes on our testing with various readers, first for **Fixed** mode ePUBs, and secondly, for **Flowable** mode ePUBs. 


### Performance of various ePUB readers for Bloom <u>Fixed</u>-mode ePUBs


|                                                                                                  | Talking Book Audio | Talking Book Text Highlighting | Image Descriptions (audio) | Landscape Layout | Sign Language | Overlay Bubbles (e.g. comics) |
| ------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------ | -------------------------- | ---------------- | ------------- | ----------------------------- |
| eKitabu Windows<br/>version                                                                      | ✓                  | No                             | ✓                          | ✓                | ✓             | ✓                             |
| eKitabu Android<br/>v5.4.1                                                                       | ✓                  | No                             | ✓                          | (1)              | (1)           | ✓                             |
| Lis-a<br/>Android version<br/>Feb 25, 2022                                                       | ✓                  | ✓                              | ✓                          | (2)              | (2)           | (3)                           |
| Google Play Books<br/>Sept 2022                                                                  | No                 | No                             | No                         | No               | No            | No                            |
| Apple Books<br/>Sept 2022                                                                        | No                 | No                             | No                         | ✓                | ✓             | (3)                           |
| Dolphin EasyReader<br/>(Android version)                                                         | (4)                | (5)                            | No                         | No               | No            | (3)                           |
| Thorium Reader (Windows)                                                                         | No                 | No                             | No                         | ✓                | ✓             | ✓                             |
| [Simply Reading ](https://play.google.com/store/apps/details?id=aeldata.simply.reading)(Android) | ✓                  | No                             | ✓                          | (1)              | (1)           | ✓                             |

1. Various app controls (e.g. menu bar, media bar) obscure significant portions of Fixed mode ePUBs, making them unusable.
1. Text on right-side of screen is frequently slightly clipped.
1. The positioning of text inside speech bubbles and captions is inaccurate, sometimes badly.
1. Frequent audio clipping.
1. Text highlighting is erratic and unreliable.

### Performance of various ePUB readers for Bloom <u>Flowable</u>-mode ePUBs


|                                                                                                  | Talking Book Audio | Talking Book Text Highlighting | Image Descriptions (audio) | Landscape to Portrait Rendering | Sign Language | **Overlay Bubbles (e.g. comics)** |
| ------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------ | -------------------------- | ------------------------------- | ------------- | --------------------------------- |
| eKitabu Windows<br/>version                                                                      | ✓                  | ✓                              | ✓                          | (2)                             | ✓             | N/A                               |
| eKitabu Android<br/>v5.4.1                                                                       | No                 | No                             | No                         | (2)                             | ✓             | N/A                               |
| Lis-a<br/>Android version<br/>Feb 25, 2022                                                       | ✓                  | ✓                              | ✓                          | (2)                             | ✓             | N/A                               |
| Google Play Books<br/>Sept 2022                                                                  | No                 | No                             | No                         | (3)                             | No            | N/A                               |
| Apple Books<br/>Sept 2022                                                                        | No                 | No                             | No                         | (2)                             | ✓             | N/A                               |
| Dolphin EasyReader<br/>(Android version)                                                         | (1)                | Unreliable                     | (1)                        | ✓                               | No            | N/A                               |
| Thorium Reader (Windows)                                                                         | ✓                  | ✓                              | ✓                          | (2)                             | ✓             | N/A                               |
| [Simply Reading ](https://play.google.com/store/apps/details?id=aeldata.simply.reading)(Android) | ✓                  | ✓                              | ✓                          | (2)                             | ✓             | N/A                               |

1. Frequent audio clipping.
1. Top or bottom positioned text blocks (in Bloom Edit) will display nicely, but right-side text blocks (in Bloom Edit) may have reduced margins.
1. Text which should wrap is often simply cut off.

:::caution

For books produced by Bloom 5.4: if you make a Talking Book out of an Overlay (comic) book, ePUB readers will read bubbles in the order you created them. That won’t always be the correct order! We have an idea of how to improve things for Bloom 5.5.

:::



