---
title: Installing & Updating WebView2
sidebar_position: 10
slug: /webview2
keywords: [WebView2]
---



See also: 


[WebView2 Trouble](/wv2trouble)


Bloom 5.5 and later requires the Microsoft WebView2 Runtime “Evergreen” to be installed and up to date. If your computer regularly receives Windows Updates, you will already have this. Otherwise, follow these instructions:


# Using the Online Installer {#8c2000ada2d046f5852f01db766ce634}


Click [here](https://go.microsoft.com/fwlink/p/?LinkId=2124703) to get a small program from Microsoft. When you run it, it will download and install whatever you need. It may mention “Microsoft Edge” instead of “Webview2”, that’s fine.


# Using the Offline installer {#000ea21dae6641f6ad5f132942f9ed79}


Click [here ](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)for a page that will let you download a large (~140mb) installer that you can share with others. When you get that page, click the one that says “x64”:


![](./webview2.c9c4df91-e7d9-4f94-8d77-eb926321413e.png)


# When manually installing WebView2 Fails {#ae2d3121622c454ba4445d914f71f889}


We have a report of a computer which refused to allow manual updating of WebView2. It was stuck on an old version. The user reported that he fixed this by running Microsoft Edge and let _it_ update, and this then fixed things so that Bloom could run. See [Updating Microsoft Edge](/webview2).

