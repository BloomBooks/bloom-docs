---
title: Measuring Your Reach with Bloom Analytics
sidebar_position: 11
slug: measuring-your-reach-with-bloom-analytics
---



> In a “customer interview”, Richard said


	It’s a bit confusing sometimes for clients like us, the idea of tagging and branding books. Perhaps their kind of documentation around that could be clearer. We recently suggested it would be useful to know what the analytics fields are so that a new client will know exactly what the app is able to report and not able to report. A more user-friendly approach with the documentation around the product. (**Tagging/branding books: does that have to do with the types of books, like biography or fiction?)** No, tagging is more to do with saying who owns the books. Who PAID for the project? In PNG where we’ve had two phases of the Rise Project plus two other projects, we need to differentiate those books in the database so those users can brand the books in different ways so that you know these books were from a particular project. [It’s a] nice problem to have because we’re using it in more places for different projects for different donors, different provinces. They need to improve the documentation around it so it’s clearer. At the moment we rely on SIL-PNG to do all of that. We don’t do it in-house. We give them the books; say it's for this project. But then when we have to extract the data from the database, we need to say okay, these books are for Rise 1; these books are for Rise 2. These users are for that other project; so we're kind of still feeling our way with that.


Summary


![](./112076373.png)


Events that we measure


> All Bloom Player contexts (Bloom Library, Bloom Reader, BloomPub Viewer, RAB apps)


	Pages read


	Was the last (numbered) page in the book read?


	This is some indication that the entire book was read. Note: it is possible to just flip past pages, or to move randomly through the book. So it wouldn’t be hard to cheat this system.


	Time spent


	Comprehension Quizzes


	including how many questions were present and how many answered correctly.


	Duration of audio and video playback


	Book branding


	Bloom Library


	Downloads


	Bloom Reader Specific events


	Installations


	No events at this time


	Shared book


	Shared bookshelf


	Shared APK


	Share Link to app on play store


	EPUB


User Information that we collect


Web


> IP address (--> city / country?)


Bloom Reader only


> Named device ids


	ANALYTICS_DEVICE_PROJECT


	ANALYTICS_DEVICE_ID


Location


Latitude, longitude, locationSource, locationAccuracy, locationAgeDays


> We record the locations available from each of the standard providers (network, gps, and passive) explicitly. But for the standard location for this report, we mainly want the most recent location we can get; precision is not very important.


	However, we know from experience that in poor countries, IP address doesn't give us reliable location, and we expect that wifi and other networks will be similarly unreliable as means of location. So if we have a reasonably recent high-precision location we will take that in preference to a lower-precision one that may be even more current. (Elsewhere we request one location per hour from GPS, if available, to ensure that the "last known location" for the gps provider will be reasonably recent.)


[Distribution Source](https://docs.google.com/document/d/1Hm7apUH1KV3I_GCCOVkh-aiCtq5O_1ILcne074r_w-g/edit)


> Hardware info


Android version?


How your project can get analytics


BloomLibrary bookshelves


> /stats


	CSV & PDF download


Advanced low level access to analytics data


> SQL access


	[Available Fields](https://docs.google.com/spreadsheets/d/1jvO_YHpcoYQyOw8sJoo-M07V6Km9YRsPI1rgAuSJVpc/preview)


	Example dashboards using this data


	[PNG RISE](https://www.inclusiveducation.com/rise)


	[PNG Western Province E-Learning](https://www.inclusiveducation.com/wp-elearning)


Difficulties getting analytics


Getting analytics from devices that are normally offline


> No internet (talk about Bloom Reader offline)


Effect of blocking cookies?


Firewalls


> No events on EPUB


Privacy Issues


No emails


IP addresses?


Cookies


GPS resolution


GPS opt in/out


Device hardware IDs


Named Device IDs


> Pricing


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

