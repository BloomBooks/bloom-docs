---
title: OPDS API
sidebar_position: 0
slug: /opds
keywords: [API, OPDS]
---



:::note

An “API” is a way for programmers to connect their program to another system. In this case, Bloom’s OPDS API allows programmers to get information on BloomLibrary.org’s collections of books.

:::




Bloom implements the [OPDS](https://opds.io/) API, which is a common API in the ePUB world. The OPDS format is extremely verbose, and we don’t love it, but it works. Using Bloom’s OPDS API, you can

- Get lists of languages
- Get lists of books in a language
- Get thumbnails and URLs for books

## Getting an account from us {#bfb0005a345c469da9590c29ca462505}


There are two general ways to get an account:

1. a Bloom Enterprise Subscription
2. an agreement based on mutual content sharing or other partnership

We will set up your account and provide you with the credentials you need.


:::note

Before requesting an API key, please create an account at [BloomLibrary.org](http://bloomlibrary.org/). Then when you write, tell us what the email address is that you used to create that account.

:::




To discuss getting a key, please write to admin@bloomlibrary.org.  


:::caution

We don’t currently have a way of rate-limiting you, so it is on you not to break us! Please do not use this API in a way that would generate queries every time one of your users opens a page. Instead, please cache the results and update them daily or whatever.

This also holds for the thumbnails this provides. If you are a high-volume site, we will need you to cache the thumbnails. 

Thanks!

:::




## Base URL {#75d673fae90e489ca8c85599a003b669}


[`https://api.bloomlibrary.org/v1/opds`](https://api.bloomlibrary.org/v1/opds?organizeby=language&key=rev79_app%40sil.org%3AkCaAHOBD2r&minimalnavlinks=true)


## Queries {#15c0daf6f1bc40cabee98891b9d6cfbc}


In the following

- `YOURACCOUNT` is the email you use for your [BloomLibrary.org](http://bloomlibrary.org/) account
- `YOURKEY` is the secret API key we will give you
- `LANGUAGETAG` is a [BCP47 ](https://www.rfc-editor.org/info/bcp47)tag

## Parameters {#b7487ef94deb49cfa43845a3b4f790b5}


The following parameters are our additions the OPDS spec:


`key`: YOURACCOUNT:YOURKEY


`lang`: string, optional.  bcp47 lang tag that narrows the search to one language


`ref`: string, optional. The referrer tag, used internally for recording who is doing the query


`tag`: string, optional. Limit search to books with this tag. Example `tag=`[`bookshelf:LZB-OtherLang-Afrikaans`](https://api.bloomlibrary.org/v1/opds?key=fraser_bennett%40sil-lead.org%3AoxYccdqoM4&tag=bookshelf%3ALZB-OtherLang-Afrikaans)


`organizeby`:  string, optional. If defined, the only option is “language”.


`minimalnavlinks`: “true” | “false” (default), optional. 


`epub`: “true” | “false” (default), optional.


### Languages {#91e67c66a8044bd0abe68e6d0aa6b6e3}


To get a list of languages, use a URL like this:


```text
https://api.bloomlibrary.org/v1/opds?organizeby=language&minimalnavlinks=true&key=YOURACCOUNT:YOURKEY
```


This will return a large result that looks like this:


```xml
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:opds="http://opds-spec.org/2010/catalog">
<id>https://bloomlibrary.org</id>
<title>Bloom Library Books</title>
<updated>2022-11-09T17:39:22.868Z</updated>
<link rel="http://opds-spec.org/facet" iso="haz" href="https://api.bloomlibrary.org/v1/opds?lang=haz&organizeby=language&minimalnavlinks=true" atMost="26" title="Hazaragi" opds:facetGroup="Languages"/>
<link rel="http://opds-spec.org/facet" iso="acu" href="https://api.bloomlibrary.org/v1/opds?lang=acu&organizeby=language&rminimalnavlinks=true" atMost="1" title="Achuar-Shiwiar" opds:facetGroup="Languages"/>
<link rel="http://opds-spec.org/facet" iso="fub" href="https://api.bloomlibrary.org/v1/opds?lang=fub&organizeby=language&minimalnavlinks=true" atMost="7" title="Fulfulde (Adamawa)" opds:facetGroup="Languages"/>
etc...
```


### Important OPDS/catalog/link attributes {#4f29ecd5d4b344e1b1ff42b1301a1c09}


`iso`: Actually a bcp47. That is, normally this is iso-6393 code, unless it has been augmented with script or regional variant information.


`atMost` : Use this if you just want to know if we have books in a language. This is the total number of books we have, but not all of them will necessarily be in circulation, or available in your country. In other words, this query doesn’t take the time to go and get an accurate count.


---


### Books of a language {#ca33614244c44331b981d98b15bd79ac}


To get a list of books in a language, use a URL like this:


```text
[https://api.bloomlibrary.org/v1/opds?&minimalnavlinks=true&key=YOURACCOUNT:YOURKEY&lang=LANGUAGETAG](https://api.bloomlibrary.org/v1/opds?minimalnavlinks=true&key=YOURACCOUNT%3AYOURKEY&lang=LANGUAGETAG)
```


This will return a result like this:


```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="[http://www.w3.org/2005/Atom](http://www.w3.org/2005/Atom)" xmlns:dcterms="[http://purl.org/dc/terms/](http://purl.org/dc/terms/)" xmlns:opds="[http://opds-spec.org/2010/catalog](http://opds-spec.org/2010/catalog)">
<id>[https://bloomlibrary.org](https://bloomlibrary.org/)</id>
<title>Bloom Library Books</title>
<updated>2022-11-09T17:57:18.286Z</updated>
<entry>
<id>ee2d7092-be71-43fd-8ae8-575925539492</id>
<title>ต่อสู้ไวรัส!</title>
<summary>Virus information for children</summary>
<updated>2022-08-17T17:31:58.448Z</updated>
<dcterms:subject>health</dcterms:subject>
<dcterms:rights>Copyright © 2020, SH, TF</dcterms:rights>
<dcterms:license>cc-by-sa</dcterms:license>
<dcterms:language>nod</dcterms:language>
<link rel="[http://opds-spec.org/image](http://opds-spec.org/image)" href="[https://api.bloomlibrary.org/v1/fs/harvest/3ccIsvrpEQ/thumbnails/thumbnail-256.png?version=2022-08-17T17:31:58.448Z](https://api.bloomlibrary.org/v1/fs/harvest/3ccIsvrpEQ/thumbnails/thumbnail-256.png?version=2022-08-17T17%3A31%3A58.448Z)" type="image/png" title="Image" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://api.bloomlibrary.org/v1/fs/upload/3ccIsvrpEQ/ต่อสู้ไวรัส!.pdf](https://api.bloomlibrary.org/v1/fs/upload/3ccIsvrpEQ/%e0%b8%95%e0%b9%88%e0%b8%ad%e0%b8%aa%e0%b8%b9%e0%b9%89%e0%b9%84%e0%b8%a7%e0%b8%a3%e0%b8%b1%e0%b8%aa!.pdf)" type="application/pdf" title="PDF" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://api.bloomlibrary.org/v1/fs/harvest/3ccIsvrpEQ/ต่อสู้ไวรัส!.bloomd](https://api.bloomlibrary.org/v1/fs/harvest/3ccIsvrpEQ/%e0%b8%95%e0%b9%88%e0%b8%ad%e0%b8%aa%e0%b8%b9%e0%b9%89%e0%b9%84%e0%b8%a7%e0%b8%a3%e0%b8%b1%e0%b8%aa!.bloomd)" type="application/bloompub+zip" title="bloomPUB" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://bloomlibrary.org/player/3ccIsvrpEQ](https://bloomlibrary.org/player/3ccIsvrpEQ)" type="text/html" title="Read On Bloom Library" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://api.bloomlibrary.org/v1/fs/harvest/3ccIsvrpEQ/ต่อสู้ไวรัส!.bloomSource](https://api.bloomlibrary.org/v1/fs/harvest/3ccIsvrpEQ/%e0%b8%95%e0%b9%88%e0%b8%ad%e0%b8%aa%e0%b8%b9%e0%b9%89%e0%b9%84%e0%b8%a7%e0%b8%a3%e0%b8%b1%e0%b8%aa!.bloomSource)" type="application/bloomSource+zip" title="bloomSource" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://bloomlibrary.org/book/3ccIsvrpEQ](https://bloomlibrary.org/book/3ccIsvrpEQ)" type="text/html" title="Bloom Library Page" />
</entry>
<entry>
<id>0e5b456d-f04a-46d4-a8f6-1f61033ee9b8</id>
<title>หงส์หามเต่า</title>
<summary>เรื่องย่อ : เต่ากับหงส์เป็นเพื่อนกัน วันหนึ่ง เต่าเห็นนกบิน เต่าอยากบินได้เหมือนนก หงส์จึงอาสาพาเต่าบิน ชาวนาเห็นเต่ากับหงส์บินมาจึงร้องตะโกนว่า "เต่าบินได้" เต่าตอบว่าไม่ ไม่ ก็เลยทำให้เต่าตกลงมา</summary>
<updated>2022-08-17T18:00:33.564Z</updated>
<dcterms:rights>Copyright © 2019, มูลนิธิศุภนิมิตแห่งประเทศไทย</dcterms:rights>
<dcterms:license>cc-by-nc-nd</dcterms:license>
<dcterms:language>nod</dcterms:language>
<link rel="[http://opds-spec.org/image](http://opds-spec.org/image)" href="[https://api.bloomlibrary.org/v1/fs/harvest/lweHdAjFbg/thumbnails/thumbnail-256.png?version=2022-08-17T18:00:33.564Z](https://api.bloomlibrary.org/v1/fs/harvest/lweHdAjFbg/thumbnails/thumbnail-256.png?version=2022-08-17T18%3A00%3A33.564Z)" type="image/png" title="Image" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://api.bloomlibrary.org/v1/fs/harvest/lweHdAjFbg/epub/หงส์หามเต่า.epub](https://api.bloomlibrary.org/v1/fs/harvest/lweHdAjFbg/epub/%e0%b8%ab%e0%b8%87%e0%b8%aa%e0%b9%8c%e0%b8%ab%e0%b8%b2%e0%b8%a1%e0%b9%80%e0%b8%95%e0%b9%88%e0%b8%b2.epub)" type="application/epub+zip" title="ePUB" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://api.bloomlibrary.org/v1/fs/upload/lweHdAjFbg/หงส์หามเต่า.pdf](https://api.bloomlibrary.org/v1/fs/upload/lweHdAjFbg/%e0%b8%ab%e0%b8%87%e0%b8%aa%e0%b9%8c%e0%b8%ab%e0%b8%b2%e0%b8%a1%e0%b9%80%e0%b8%95%e0%b9%88%e0%b8%b2.pdf)" type="application/pdf" title="PDF" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://api.bloomlibrary.org/v1/fs/harvest/lweHdAjFbg/หงส์หามเต่า.bloomd](https://api.bloomlibrary.org/v1/fs/harvest/lweHdAjFbg/%e0%b8%ab%e0%b8%87%e0%b8%aa%e0%b9%8c%e0%b8%ab%e0%b8%b2%e0%b8%a1%e0%b9%80%e0%b8%95%e0%b9%88%e0%b8%b2.bloomd)" type="application/bloompub+zip" title="bloomPUB" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://bloomlibrary.org/player/lweHdAjFbg](https://bloomlibrary.org/player/lweHdAjFbg)" type="text/html" title="Read On Bloom Library" />
<link rel="[http://opds-spec.org/acquisition/open-access](http://opds-spec.org/acquisition/open-access)" href="[https://bloomlibrary.org/book/lweHdAjFbg](https://bloomlibrary.org/book/lweHdAjFbg)" type="text/html" title="Bloom Library Page" />
</entry>
</feed>
```


Notice that these book entries provide:

- link to a thumbnail
- link to the [BloomLibrary.org](http://bloomlibrary.org/) page for the book
- link to read the book online

Also, depending on the book, it may provide:

- link to a pdf
- link to an ePUB
- link to a bloomPUB
