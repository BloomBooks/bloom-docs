---
title: Change a Team Collection Name
sidebar_position: 0
slug: /change-team-collection-name
---



:::note

This page is a draft version.

:::




When you [create a Team Collection](/team-collections-getting-started#6035d8998d5d42a4b66a19e86590d845), you are warned that you will not be able to change the name of the collection later. This is not _exactly_ true: it is possible to change the name, but it’s painful. If you find yourself in dire circumstances and must change the Team Collection name, here are two methods to change a Team Collection name:


## Method 1 {#afdbacf345db4016ac3c1f37a749489f}

1. The Team Collection Administrator “retires” the Team Collections, following the instructions in [Retire a Team Collection](/team-collections-advanced-topics#3a6243f616134809b5b9c06e5748094f)

	:::caution
	
	Note that this requires that all books be checked in.
	
	:::
	
	

2. The Team Collection Administrator deletes shadow folder, so that it is removed from all team members’ computers. If for some reason the Administrator cannot delete the shadow collection from the team members’ computers, the team members should be sure they have removed the shadow collection from their computers.
3. The Team Collection Administrator renames the retired Team Collection (which is now a “regular” Bloom collection).
4. The Team Collection Administrator follows the regular instructions to create a Team Collection from the collection (see [Getting Started with Team Collections](/team-collections-getting-started)).

## Method 2 {#6b43484623f747bebe5fd848e14ec38d}

1. **With Bloom closed,** the Team Collection Administrator changes the following four filenames:
	1. The working folder name (for example: change `C:\Users\<your username>\Documents\Bloom\`**`OLD_TC_NAME`** to **`NEW_TC_NAME`**.
	2. The **.bloomCollection** file in the working folder (for example: change **`OLD_TC_NAME.bloomCollection`** to **`NEW_TC_NAME.bloomCollection`**)
	3. The “shadow folder” name — this will usually be the same as your Team Collection name plus  `- TC` (for example: change **`C:\Users\<your username>\Dropbox\OLD_TC_NAME - TC`** to **`NEW_TC_NAME - TC`**).
	4. The last one is the most difficult: you must change the name of the **`.bloomCollection`** file _in the compressed files inside the shadow folder._ In our example, this would mean opening the **`C:\Users\<your username>\Dropbox\NEW_TC_NAME - TC\Other\Other Collection Files.zip`** file (remember, we have already changed the shadow folder name) and changing the filename of the compressed **`OLD_TC_NAME.bloomCollection`** to **`NEW_TC_NAME.bloomCollection`**.

		:::caution
		
		WARNING: Use a “full featured” zip file editor such as **7-Zip** ([https://www.7-zip.org/](https://www.7-zip.org/)) to change the filename inside the compressed zip file. **It is not recommended to uncompress the zip file.** 
		
		:::
		
		

2. Launch the **`Join this Team Collection.JoinBloomTC`** file in the Team Collection’s shadow folder. Bloom will alert you that you have already joined this Team Collection. Click **Join**.
3. Each team member must individually do step 2 (launch the **`Join this Team Collection.JoinBloomTC`** file) for Bloom to “recognize” the new collection name.
