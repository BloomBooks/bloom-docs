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


:::note

Directions for retrieving a list of books in a language are temporarily unavailable.

:::



