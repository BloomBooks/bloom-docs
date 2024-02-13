---
title: How to Embed a single book from Bloom Library In Your Website
sidebar_position: 6
slug: /embed-single-bloom-library-book
keywords: [embed, player, bloomplayer]
---



See also: [How to Embed a Bloom Library Collection In Your Website](https://www.notion.so/7bf1d2edfdfa421891a60e4c0af37d53) 


It is possible to embed an interactive book directly on your website, if your website supports “iframes”.  


```html
<iframe
  src="https://embed.bloomlibrary.org/bloom-player/bloomplayer.htm?url=URL-TO-THE-BOOK"
  title="my book"
  height="500px"
  width="100%"
	allow="fullscreen"
	allowFullScreen={true}
  initiallyPaused={true}
/>
```


For example, if we use


```html
<iframe
  src="https://embed.bloomlibrary.org/bloom-player/bloomplayer.htm?url=[https://bloomlibrary.org/player/Da5Scm1XBK](https://bloomlibrary.org/player/rFnCBRPsDs)"
  width="100%" height="450px" allow="fullscreen" allowFullScreen={true}   initiallyPaused={true}
/>
```


then we get


<iframe width="100%" height="450px" allow="fullscreen" allowFullScreen={true}
  src="https://bloomlibrary.org/bloom-player/bloomplayer.htm?url=https://s3.amazonaws.com/bloomharvest/educationforlife@sil.org/42019e35-2c39-4cc4-beb5-8510f4866d79/bloomdigital/index.htm&initiallyShowAppBar=false&paused=true&allowToggleAppBar=true&independent=false&host=docs.bloomlibrary.org"></iframe>


:::note

It does cost us something to “deliver” books in this way.  We don’t expect this will be a problem, but if in the future we had books that became expensive to serve this way, we might limit access to the service.

:::



