---
title: Team Collections- Introduction
sidebar_position: 0
slug: /team-collections-intro
---



A **Bloom Team Collection** is a normal Bloom Collection that is shared among team members through the synchronized cloud storage service [Dropbox](https://www.dropbox.com/) or a local area network. **We recommend this system for any project where more than one person touches a book before it is published,** _**and**_ **everyone has adequate internet access.** By synchronizing files across computers, each person who works on a book has the latest version available. 


## System requirements for using a Team Collection

- A Bloom Enterprise subscription, **OR** you can affirm that your project is fully funded by a local community
- Bloom 5.1 or greater. (It is recommended, but not required, that all the team members use the same version of Bloom.)

	:::caution
	
	Each team member must register his or her copy of Bloom with a unique email address.  
	
	:::
	


- A [Dropbox](https://www.dropbox.com/) account. The [free version of Dropbox](https://www.dropbox.com/basic), which provides 2GB of storage space, should be sufficient for 100–1000 typical Bloom books.

	:::note
	
	These instructions focus on using Dropbox to synchronize Team Collection files. If you want to use a local network share instead of Dropbox, contact the Bloom team at experimental@bloomlibrary.org. 
	
	:::
	



## How Team Collections work


A Bloom Team Collection has two parts. The first part is a normal Bloom collection of working files. This is a folder that contains one or more Bloom books, each in its own folder, as well as special files used by Bloom. 


The second part is a special **shadow collection folder**, which is created for the Team Collection by Bloom. The shadow collection contains compressed copies of all the Team Collection files. Bloom synchronizes the shadow collection with the working files. The shadow collection is also synchronized between your computer and the Dropbox cloud storage service, which synchronizes it to other team members’ computers. 


<div class='notion-row'>
<div class='notion-column'>

For example, let’s say Awa has a collection of books on her computer (Figure 1): 

</div>

<div class='notion-column'>

![Figure 1: Awa’s computer](./1498310619.png)

</div>
</div>


<div class='notion-row'>
<div class='notion-column'>

Awa’s collection is a Team Collection, so Bloom creates a shadow collection folder on her computer from her working files. The shadow collection is also synchronized to the Dropbox file-sharing service (Figure 2). 

</div>

<div class='notion-column'>

![Figure 2: Awa’s computer, with a shadow collection folder synchronized to Dropbox.](./561722303.png)

</div>
</div>


<div class='notion-row'>
<div class='notion-column'>

Awa shares the shadow collection folder with her teammate Barkari using Dropbox. Now Awa and Barkari both have a shadow collection folder on their computers (Figure 3).   

</div>

<div class='notion-column'>

![Figure 3: Awa’s computer, and the shadow collection synchronized to Barkari’s computer](./1676446137.png)

</div>
</div>


<div class='notion-row'>
<div class='notion-column'>

When Barkari launches a special file in the shadow collection folder, Bloom copies the Team Collection files from the shadow collection on his computer, to create a working collection. Now Barkari can edit books in the collection, too. 

</div>

<div class='notion-column'>

![Figure 4: Awa’s computer, and Barkari’s computer with a working collection from the synchronized shadow collection](./1234625758.png)

</div>
</div>


Whenever Awa or Barkari change something in the working collection on their computers, Bloom copies the changes into the shadow collection, and Dropbox copies the changes to the other one’s computer. In this way, they can both work on the collection, even though they are using different computers. 


## Checking books in and out


In a Team Collection, each book has a **status**. There are three possibilities for a book: 


<div class='notion-row'>
<div class='notion-column'>

- **Available for editing**

</div>

<div class='notion-column'>

![](./1747722979.png)

</div>
</div>


<div class='notion-row'>
<div class='notion-column'>

- **Checked out by you**



</div>

<div class='notion-column'>

![](./662682535.png)

</div>
</div>


<div class='notion-row'>
<div class='notion-column'>

- **Checked out by someone else**

</div>

<div class='notion-column'>

![](./1040791527.png)

</div>
</div>


**Only the person who has a book checked out can make changes to it****.** Whenever one user checks out a book for editing, Bloom uses Dropbox to notify the other team members that the book is checked out. After the user checks the book back in, Bloom notifies the other team members that the book is available for editing again. 


This checkout system ensures that team members do not develop multiple conflicting versions of a book that must be painfully reconciled later. 


## What if I don't have Internet access all the time?


You do not need continuous internet access to use Bloom team collections. You only need to be connected to the internet when you check books in and out. But your internet service does have to be sufficiently fast, affordable, and reliable to transfer Bloom books to and from Dropbox.


### Why Dropbox? 


Team Collections works with Dropbox because we have found that it works more reliably and efficiently for this purpose than other commercial filesharing services do. In particular, Dropbox lets other team collection users know when a teammate has updated a book more reliably than Google Drive does. Even more important, when you change part of a book, Dropbox transmits only the parts of the book that have changed rather than the entire book. This is helpful in places with less than super-fast internet.


## For more information

- [Getting started with Team Collections](/team-collections-getting-started)
- [Working with Team Collections](/working-with-team-collections)
- [Team Collections FAQs](/team-collection-faq)
- [Team Collections: When things don’t go according to plan](/team-collections-problems)
- [Team Collections: Advanced Topics](/team-collections-advanced-topics)
