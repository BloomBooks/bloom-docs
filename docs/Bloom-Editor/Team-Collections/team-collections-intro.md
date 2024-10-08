---
title: Team Collections - Introduction
sidebar_position: 0
slug: /team-collections-intro
---



A **Bloom Team Collection** is a normal Bloom Collection that is shared among team members through the synchronized cloud storage service [Dropbox](https://www.dropbox.com/) or a local area network. By synchronizing files across computers, each person who works on a book has the latest version available.


:::tip

We recommend Team Collections for any project where more than one person touches a book before it is published, and where everyone on the team has adequate internet access.

:::




## How Team Collections Work {#013b2b088f3d4b98a03331c3953ed52f}


A Bloom Team Collection has two parts. The first part is a normal Bloom collection of working files. This is a folder that contains one or more Bloom books, each in its own folder, as well as special files used by Bloom. 


The second part is a special **shadow collection folder**, which is created for the Team Collection by Bloom. Bloom synchronizes the shadow collection and the working files. The shadow collection is also synchronized between your computer and the Dropbox cloud storage service, which synchronizes it to other team members’ computers.


:::note

A **shadow collection folder** (sometimes called a “shadow collection” or “shadow folder”) is a special folder that contains compressed copies of all the Team Collection files. The shadow collection folder is stored in a cloud-synchronized local directory on your computer. 

:::




<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


For example, let’s say Awa has a collection of books on her computer (Figure 1): 


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./team-collections-intro.a5aec484-1e2f-4041-a5dd-37ce9015dbcb.png)



Figure 1: Awa’s computer


</div><div className='notion-spacer'></div>
</div>


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


Awa’s collection is a Team Collection, so Bloom creates a shadow collection folder on her computer from her working files. The shadow collection is also synchronized to the Dropbox file-sharing service (Figure 2). 


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./team-collections-intro.3e5de6a8-3332-4c2d-adae-89b40ae2bf55.png)



Figure 2: Awa’s computer, with a shadow collection folder synchronized to Dropbox


</div><div className='notion-spacer'></div>
</div>


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5000000000000001)'}}>


Awa shares the shadow collection folder with her teammate Barkari using Dropbox. Now Awa and Barkari both have a shadow collection folder on their computers (Figure 3).   


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5000000000000002)'}}>


![](./team-collections-intro.5dd7715f-d395-49d9-8ef3-85264e126a48.png)



Figure 3: Awa’s computer, and the shadow collection synchronized to Barkari’s computer


</div><div className='notion-spacer'></div>
</div>


<div class='notion-row'>
<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


When Barkari launches a special file in the shadow collection folder, Bloom copies the Team Collection files from the shadow collection on his computer, to create a working collection. Now Barkari can edit books in the collection, too. 


</div><div className='notion-spacer'></div>

<div class='notion-column' style={{width: 'calc((100% - (min(32px, 4vw) * 1)) * 0.5)'}}>


![](./team-collections-intro.3e8b9c43-bdbe-464b-9b18-81a7a16d5a1d.png)



Figure 4: Awa’s computer, and Barkari’s computer with a working collection from the synchronized shadow collection


</div><div className='notion-spacer'></div>
</div>


Whenever Awa or Barkari change something in the working collection on their computers, Bloom copies the changes into the shadow collection, and Dropbox copies the changes to the other one’s computer. In this way, they can both work on the collection, even though they are using different computers. 


## Checking Books In and Out {#a9f312d9f6f94e5aae10c9abc8ac8069}


In a Team Collection, each book has a **status**. There are three possibilities for a book: 

- **Available for editing:**

	![](./team-collections-intro.550f4967-e707-4292-a422-0cd7ac438465.png)

- **Checked out by you:**

	![](./team-collections-intro.3416e074-6723-4ea3-bcac-6b72156055eb.png)

- **Checked out by someone else:**

	![](./team-collections-intro.9de5de38-6bc2-4d57-bd5b-cdba70c421aa.png)


Only the person who has a book checked out can make changes to it. Whenever one user checks out a book for editing, Bloom uses Dropbox to notify the other team members that the book is checked out. After the user checks the book back in, Bloom notifies the other team members that the book is available for editing again. 


This checkout system ensures that team members do not develop multiple conflicting versions of a book that must be painfully reconciled later. 


## What if I Don’t Have Internet Access All the Time? {#e1f5496e509a49039de3d7113d05fd97}


You do not need continuous internet access to use Bloom team collections. You only need to be connected to the internet when you check books in and out. Your internet service does have to be sufficiently fast and reliable to transfer books to and from Dropbox.


### Why Dropbox?  {#2e254141a368476083ba215f25f14ab8}


Team Collections works with Dropbox because we have found that it works more reliably and efficiently for this purpose than other commercial filesharing services do. In particular, Dropbox lets other team collection users know when a teammate has updated a book more reliably than Google Drive does. Even more important, when you change part of a book, Dropbox transmits only the parts of the book that have changed rather than the entire book. This is helpful in places with less than super-fast internet.


## System Requirements for Using a Team Collection {#898b75ce07734a0891bf3512030894b4}

- A Bloom Enterprise subscription, **OR** you can affirm that your project is fully funded by a local community
- Bloom 5.1 or greater. (It is recommended, but not required, that all the team members use the same version of Bloom.)

	:::caution
	
	Each team member must register his or her copy of Bloom with a unique email address.  
	
	:::
	
	

- A [Dropbox](https://www.dropbox.com/) account. The [free version of Dropbox](https://www.dropbox.com/basic), which provides 2GB of storage space, should be sufficient for 100–1000 typical Bloom books (less with larger books).

	:::note
	
	These instructions focus on using Dropbox to synchronize Team Collection files. If you want to use a local network share instead of Dropbox, contact the Bloom team at [experimental@bloomlibrary.org](mailto:experimental@bloomlibrary.org). 
	
	:::
	
	


## For More Information {#941774967d44426fb364b298f1d498ce}


[Get Started With Team Collections](/team-collections-getting-started) 


[Working with Team Collections](/working-with-team-collections) 


[Team Collections FAQs](/team-collection-faq) 


[Team Collections - Troubleshooting](/team-collections-problems) 


[Team Collections : Advanced Topics](/team-collections-advanced-topics) 

