---
title: Troubleshooting Dropbox
sidebar_position: 6
slug: /dropbox-trouble
keywords: [Dropbox Troubleshooting]
---



Sometimes users of our [Team Collections](/team-collections-intro) feature have a problem where Bloom detects that Dropbox isn’t functioning normally. Dropbox is a program that Bloom uses to enable multiple users to share a collection over the Internet.


This situation could be due to a number of issues:

- **Dropbox was never setup on this computer**

	To check to see if Dropbox is already set up on this computer you can try the following:

	1. Type “dropbox” in your Search bar.
	2. If you see the Dropbox App on the left side as in the picture below, then Dropbox has been installed.

		![](./1157050924.png)

	- If you don’t see Dropbox, you’ll need to install it first. See [Setting up Dropbox on your computer](/team-collections-setting-up-dropbox).
- **Some part of Dropbox isn’t running**
	- First try restarting your computer. This will usually fix the problem.
	- If Bloom _still_ gives you the error that brought you to this page, you may need to restart the Dropbox service.
		- Type “services” in your Search bar and choose the **Services** app.

			![](./275146683.png)

		- You should see something similar to this:

			![](./238603763.png)


		If you find “**DbxSvc**” under the **Name** column (1), and it does not say “**Running**” under the **Status** column, then you should click on the word “<u>Start</u>” in “<u>Start</u> the service” (2).


		If you still cannot get Bloom to work with Dropbox, please get in contact with us ([issues@bloomlibrary.org](mailto:issues@bloomlibrary.org)).

