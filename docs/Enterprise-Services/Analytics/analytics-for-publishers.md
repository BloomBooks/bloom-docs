---
title: Bloom Analytics For Publishers
sidebar_position: 13
slug: /analytics-for-publishers
keywords: [analytics, statistics]
---



## [BloomLibrary.org](http://BloomLibrary.org) Stats pages


Bloom Enterprise subscribers get a URL that gives them analytics on the reach of the books in their collection, updated once a day:


![](./1927773425.png)


There are various reports:



![](./1754124601.png)


![](./1222756585.png)


Each report comes with buttons to get an image or a spreadsheet file of that data:


![](./1240082884.png)


## Advanced low level access to analytics data


We can also supply the raw data to your project through access to our SQL database. You can use this with your own custom dashboards.


See [Available SQL Fields](https://docs.google.com/spreadsheets/d/1jvO_YHpcoYQyOw8sJoo-M07V6Km9YRsPI1rgAuSJVpc/preview)


Example dashboards using this data: [PNG RISE](https://www.inclusiveducation.com/rise), [PNG Western Province E-Learning](https://www.inclusiveducation.com/wp-elearning)


## Events that we measure


All Bloom Player contexts (Bloom Library, Bloom Reader, BloomPub Viewer, RAB apps)

	- Pages read
	- Was the last (numbered) page in the book read?
		- This is some indication that the entire book was read. Note: it is possible to just flip past pages, or to move randomly through the book. So it wouldn’t be hard to cheat this system.
	- Time spent
	- Comprehension Quizzes
		- including how many questions were present and how many answered correctly.
	- Duration of audio and video playback
	- Book branding
	- Bloom Library
	- Downloads
	- Bloom Reader Specific events
	- Installations

	No events at this time:

	- Shared book
	- Shared bookshelf
	- Shared APK
	- Share Link to app on play store
	- EPUB

## User Information that we collect


Web

- IP address (--> city / country?)

Bloom Reader only:

- Named device ids
- ANALYTICS_DEVICE_PROJECT
- ANALYTICS_DEVICE_ID
- Location
- Latitude, longitude, locationSource, locationAccuracy, locationAgeDays

	We record the locations available from each of the standard providers (network, gps, and passive) explicitly. But for the standard location for this report, we mainly want the most recent location we can get; precision is not very important.


	However, we know from experience that in poor countries, IP address doesn't give us reliable location, and we expect that wifi and other networks will be similarly unreliable as means of location. So if we have a reasonably recent high-precision location we will take that in preference to a lower-precision one that may be even more current. (Elsewhere we request one location per hour from GPS, if available, to ensure that the "last known location" for the gps provider will be reasonably recent.)

- Districtution Source
- Hardware info
- Android version?

## 


## Difficulties getting analytics

- Getting analytics from devices that are normally offline
- No internet
- Effect of blocking cookies?
- Firewalls
- No events on EPUB
- Privacy Issues
- No emails
- IP addresses?
- Cookies
- GPS resolution
- GPS opt in/out
- Device hardware IDs
- Named Device IDs

# Analytics Fields


> View field documentation


# Internet Connection Issues


## How much bandwidth?


These are the most common analytics events sent by Bloom Reader:

- Bloom Reader started
- Bloom Reader backgrounded
- Book Opened
- Book Closed

Each event is less than 3KB. So a person who runs Bloom Reader, reads 2 books, then quits will send less than 18KB.


## What if the user is not connected to the internet?


If the user is not connected to the internet, Bloom Reader will cache their events. The cache is limited to 1000 events.


To prompt Bloom Reader to send all of its events _right now_, open the menu:


![](./672205938.png)


At the bottom of this screen, you will see Bloom Reader’s progress in sending the events:


![](./736622608.png)

