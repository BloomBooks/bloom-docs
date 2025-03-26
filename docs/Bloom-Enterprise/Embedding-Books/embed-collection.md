---
title: How to Embed a Bloom Library Collection in Your Website
sidebar_position: 1
slug: /embed-collection
keywords: [embed, website]
---



See also: [How to Embed a Single Book from Bloom Library in Your Website](/embed-single-bloom-library-book) 


Here are the steps and processes to embed a Bloom Library collection.


## 1) Do You Have a Collection? {#5bf2aa399c174ef393a7a21c1ce44215}


[BloomLibrary.org](https://bloomlibrary.org/) offers custom collections (sometimes called “bookshelves”). These pages can have:

- A banner
- Text about your organization or project
- Links for people to learn more
- And, of course, a set of books

We offer these collections as part of our [Bloom Enterprise](/about-bloom-enterprise) paid service. Once you have a [Bloom Enterprise subscription](/subscribe-enterprise), you can embed your collection on your own website.


## 2) Get Your Embedding URL {#e43af9d1c65f4e9c97c81181ba208dc0}


We offer the ability to embed your book collections on your own website. We still supply the storage space and code; all you have to do is make room on one of your pages to show and read the books.  We offer this as a paid service to help cover our costs for developing and supporting Bloom. If you are part of SIL or one of its partner organizations, write to us at [librarian@bloomlibrary.org](mailto:librarian@bloomlibrary.org). Other organizations should contact [SIL-LEAD](https://www.sil-lead.org/contact-us).


Once you have been given the go-ahead, we will send you an iframe URL to use. The URL will look like this:


`https://embed.bloomlibrary.org/best-foo-books?bl-domain=foo.org`


## 3) Add an `iframe` to Your Page {#c5e46994811b41a29ec5dc5005e01f73}


If you have access to the raw HTML of your page, add an iframe element:


```html
<iframe id="bloomlibrary" src="THE-URL-YOU-WERE-GIVEN" 
title="our books" height="100%" width="100%"></iframe>
```


In the src line, replace “THE-URL-YOU-WERE-GIVEN” with the URL you were given by a Bloom team representative. Title, height, and width can be whatever your website requires.


If your website is based on a CMS like Wordpress or a website builder like Wix, you will do something similar. Check the documentation for your CMS for how to “add an iframe” and follow its instructions.


## 4) Optional: Include the Bloom Embedding Script {#7154c02c5cad4a77a6de56b05ba880ff}


The above is enough for your site to present your collection. However, as you navigate inside your collection, the URL in your browser’s address bar will never change. So if your site’s visitors try and bookmark or share a link to a book, that link will take them back to the first screen of your collection instead of to the book.


For this reason, we provide an optional javascript file that you can add to your page. This small script updates the location _within your collection_ to the URL in the address bar of the visitor’s browser. Then if a visitor bookmarks or shares a link, it reads that information from the URL and tells the iframe to navigate to that book.


If you want this behavior, add the following to the head element of your html document:


```javascript
<script src="[https://share.bloomlibrary.org/assets/embed-bloomlibrary.js](https://share.bloomlibrary.org/assets/embed-bloomlibrary.js)"></script>
```


:::note

Note, some website software may not allow you to add arbitrary javascript. If that is the case, you will not be able to have this feature on your site.

:::




## 5) Get Help {#3ca7a06716da40668cdfe9d3ea4d89bb}


If you need some technical support, please contact us at [issues@bloomlibrary.org](mailto:issues@bloomlibrary.org). In your email, make sure to give us a URL to where you have embedded the site.

