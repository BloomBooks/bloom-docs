---
title: Measure Your Reach with Bloom Analytics
sidebar_position: 1
slug: /br-analytics
---



In a “customer interview,” a user communicated that:


> It's sometimes confusing for clients like us to understand tagging and branding books. The documentation could be clearer. We suggested that it would be helpful to know what analytics fields are available so new clients know what the app can and can't report. Tagging isn’t about book genres like biography or fiction; it's about identifying who owns the books or who funded the project. In PNG, we have different projects like the Rise Project, and we need to differentiate the books in the database based on these projects. We currently rely on SIL-PNG to manage this, but clearer documentation would help us handle it better on our own.


# Summary {#b0e5acd8a00642c885a4608952bfd96b}


Below is an overview of the statistics you will see when you view statistics for a collection:


![](./br-analytics.c1d02cb6-1524-494c-8885-9eeede9c78c3.png)

1. The analytics page opens with the `Overview` selected. For greater specificity, click the drop-down arrow to access a list of other analytics for your organization.
2. By default, analytics are shown for `ALL TIME`. To see analytics for a particular date range, click the calendar button and choose a start and end date.
3. To download a PNG image of the page, or a detailed CSV file, click the corresponding icon.

### Events that we measure {#6731ec339fee41c5b10a3848d3035992}

- All Bloom Player contexts (Bloom Library, Bloom Reader, BloomPub Viewer, RAB apps)
	- Pages read
	- Was the last (numbered) page in the book read? (This is some indication that the entire book was read. But note that it is possible just to flip past pages, or to move randomly through the book. So it wouldn’t be hard to cheat this system.)
	- Time spent
	- Comprehension Quizzes. This includes how many questions were present and how many answered correctly.
	- Duration of audio and video playback
	- Book branding
- Bloom Library
	- Downloads
- Bloom Reader specific events
	- Installations
- No events at this time
	- Shared book
	- Shared bookshelf
	- Shared APK
	- Share Link to app on Play Store
	- ePUB

### User information that we collect {#df805fac7c624034b2386a0a5f87715a}

- Web
	- IP address (--> city / country?)
- Bloom Reader only
	- Named device ids
		- ANALYTICS_DEVICE_PROJECT
		- ANALYTICS_DEVICE_ID
	- Location
		- `latitude`, `longitude`, `locationSource`, `locationAccuracy`, `locationAgeDays`
		- We record the locations available from each of the standard providers (network, gps, and passive) explicitly.  But for the standard location for this report, we mainly want the most recent location we can get; precision is not very important. 
		However, we know from experience that in poor countries, IP address doesn't give us reliable location, and we expect that WiFi and other networks will be similarly unreliable as means of location. So if we have a reasonably recent high-precision location we will take that in preference to a lower-precision one that may be even more current. (Elsewhere we request one location per hour from GPS, if available, to ensure that the "last known location" for the GPS provider will be reasonably recent.)
	- [Distribution Source](/bloom-reader-distribution-tags)
	- Hardware info
	- Android version?

### How your project can get analytics {#b53d29129ea74442b6c6d118e2aacddc}

- BloomLibrary bookshelves
	- /stats
	- CSV & PDF download
- Advanced low level access to analytics data
	- SQL access
		- [Available Fields](/analytic-fields)

### Difficulties getting analytics {#e88158be7e314caea85bc8217b37fd05}

- Getting analytics from devices that are normally offline
	- No internet (talk about Bloom Reader offline)
- Effect of blocking cookies?
- Firewalls
- No events on EPUB

### Privacy Issues {#c41cf67c2137426fb875b6275d5aa00d}

- No emails
- IP addresses?
- Cookies
- GPS resolution
- GPS opt in/out
- Device hardware IDs
- Named Device IDs

# Analytics Fields {#c2e2aaf25f2a4507a6f130a1c0c12791}


[Analytics Fields](/analytic-fields)


# Internet Connection Issues {#3b3ffb59d443404989a2c87bf9d2bbfa}


## How much bandwidth? {#a2162aee401349f49dba03f0b6b77d7b}


These are the most common analytics events sent by Bloom Reader:

- Bloom Reader started
- Bloom Reader backgrounded
- Book Opened
- Book Closed

Each event is less than 3KB. So a person who runs Bloom Reader, reads 2 books, then quits will send less than 18KB.


## What if the user is not connected to the internet? {#0b3df2601fd64fc1a921de9826faf100}


If the user is not connected to the internet, Bloom Reader will cache their events. The cache is limited to 1000 events.


To prompt Bloom Reader to send all of its events _right now,_ open the menu:


![](./br-analytics.d1a0f157-98cf-4b9d-98e4-6484fc4b5db7.png)


At the bottom of this screen, you will see Bloom Reader’s progress in sending the events:


![](./br-analytics.c0efd0ed-abb1-45b0-9158-1a2a64ddf92b.png)

