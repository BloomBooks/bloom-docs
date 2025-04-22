---
title: Troubleshooting Dropbox
sidebar_position: 8
slug: /dropbox-trouble
keywords: [Dropbox Troubleshooting]
---



When using Bloom Team Collections with Dropbox, two problems can occur:

1. [Bloom detects that Dropbox is not running](/dropbox-trouble#d7c9e80a73764f2887d5fe7d3db16a02)
2. [Dropbox cannot handle the book’s Unicode title](/dropbox-trouble#c61dbdf00ecf48b2876591fb8fd31a6b)

# Bloom detects that Dropbox is not running {#d7c9e80a73764f2887d5fe7d3db16a02}


Sometimes users of our [Team Collections](/team-collections-intro) feature have a problem where Bloom detects that Dropbox isn’t functioning normally. Dropbox is a program that Bloom uses to enable multiple users to share a collection over the Internet.


This situation could be due to a number of issues:

- **Dropbox was never setup on this computer**

	To check to see if Dropbox is already set up on this computer you can try the following:

	1. Type “dropbox” in your Search bar.
	2. If you see the Dropbox App on the left side as in the picture below, then Dropbox has been installed.

		![](./dropbox-trouble.bb067b09-7bba-41f3-b9d1-ed765bb927ce.png)

	- If you don’t see Dropbox, you’ll need to install it first. See [Setting up Dropbox on your computer](/team-collections-setting-up-dropbox).
- **Some part of Dropbox isn’t running**
	- First try restarting your computer. This will usually fix the problem.
	- If Bloom _still_ gives you the error that brought you to this page, you may need to restart the Dropbox service.
		- Type “services” in your Search bar and choose the **Services** app.

			![](./dropbox-trouble.683b5f72-0193-4582-8dab-f1534df4c600.png)

		- You should see something similar to this:

			![](./dropbox-trouble.d922db63-2458-4803-98df-ab88fa7d9ea5.png)


		If you find “**DbxSvc**” under the **Name** column (1), and it does not say “**Running**” under the **Status** column, then you should click on the word “<u>Start</u>” in “<u>Start</u> the service” (2).


		If you still cannot get Bloom to work with Dropbox, please get in contact with us ([issues@bloomlibrary.org](mailto:issues@bloomlibrary.org)).


	# Dropbox cannot handle the book’s Unicode title


	If the title of your book has an unusual combination of Unicode characters, Dropbox _may_ have difficulty synching these files to the cloud. Under the Activity tab, your Dropbox app will show a message like this: 


	![](./dropbox-trouble.6c671980-5e02-4df7-b9aa-44b2cd6a7706.png)


	If this occurs, the solution is to rename the book without renaming its title. To rename a book, right-click on the book’s thumbnail, and choose rename:


	![](./dropbox-trouble.501010c8-9b7b-4600-9ae0-93c1d1cbaf60.png)


	Then, type in a simplified name for your book and press Enter. 

