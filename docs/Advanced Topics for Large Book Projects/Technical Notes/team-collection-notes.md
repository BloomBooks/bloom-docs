---
title: Notes on Team Collections
sidebar_position: 1
slug: /team-collection-notes
---



:::caution

The following are known problems and limitations of this feature.

:::




# We know you’d rather be using Google Drive {#79f19946fff14a7cbf54ec2b183ef339}


Team Collections relies on other file syncing systems while hiding their complexity. Currently, you can use a local LAN server to sync or Dropbox. We don’t yet offer Google Drive because our experiments with “Google Drive for Desktop” showed that it was not reliable enough to use for Team Collections. However, in the future, we hope to build a reliable Google Drive option based directly on Google APIs instead of the “Drive for Desktop” app.


# It might be possible for two people to check out a book simultaneously {#3c57778cc0194300ae10e1d7494f440c}


Only one person can have a book checked out at once. When you try to check out a book, Bloom first makes sure that it isn’t already checked out. However, due to delays inherent in cloud-based file syncing,  it is at least theoretically possible that the book was checked out recently by a teammate, and your computer hasn’t received that data yet. In the future, we plan to add a full-proof cloud-based system that will close this loophole.


##  {#92294346896249748e9d48d06930c080}

