---
title: Setting the image resolution in BloomPUBs
sidebar_position: 8
slug: /bloompub-image-resolution
---



Currently, images in BloomPUBs and online reading are down-sampled to a max dimension of 600 x 600 pixels. This is to better serve users who have poor internet and/or limited memory on their devices.


In Bloom 5.4 and 5.5, you can increase this number by following these steps:


1) In the `publish-settings.json` file for the Bloom book, change `"imageSettings":null`to `"imageSettings":{"maxWidth":1200,"maxHeight":900}` Or whatever number you want.


2) Create your bloomPUB again, or upload to the book to Bloom Library.


:::tip

Note, images in PDFs are not down-sampled

:::




:::tip

Bloom normally down-samples _incoming_ images to 3500 x 2550 (landscape) or 2550 x 3500 (portrait). These maxes were chosen to fit A4 paper at 300dpi. This was done to avoid the situation we were seeing where less-technical users were getting gigantic images into Bloom and then having memory problems.

:::



