---
title: HTML5 Widgets
sidebar_position: 10
slug: html5-widgets
keywords: [HTML5, widgets, activities, games]
---



Bloom  pages can embed little custom HTML5 activities called “widgets”. When published as a bloompub, these widgets will work on the web, Bloom Reader, and RAB Apps. You can see examples of widgets in [these interactive books](https://bloomlibrary.org/activities/books-with-widgets) in the Bloom Library.


Many of these widgets already exist on the web, because they work with Apple's IBooks and other software. You can also make your own using programs like [Active Presenter](https://atomisystems.com/activepresenter/). Most widgets don’t have any custom programming, but if software like Active Presenter is not sufficient for what you need, you can hire a web developer to do something even more advanced.


# Format


Bloom requires that the widget be a zipped set of files ending in ".wdgt". The files must include a file named "index.html".


# Adding to Bloom


To add a widget, Click “Add Page” and then select one of the template pages. These have an image of a puzzle piece:


![](/notion_imgs/407199131.png)


Then click on the button in the corner of the widget:


![](/notion_imgs/431553782.png)


In the file chooser dialog, you can either choose a .wdgt file, an .htm file, or an .html file. A “.wdgt” file is just a zip file containing all the files of the widget. If you instead choose an HTML file, Bloom will gather up and import all of the files in that same folder.


# Captive Widgets


Normally, when Bloom Player shows a widget, it also shows page navigation buttons:


![](/notion_imgs/346919601.png)


If you want to hide these navigation buttons, follow these steps:


### 1: Use the special page template


In Bloom (version 5.1 or later)  when you choose “Add Page”, you should see a “Captive Widget” page:


![](/notion_imgs/729849789.png)


Bloom Player will not give the user any way to navigate away from this page except by leaving the book entirely. It will be up to your widget to tell Bloom Player when you want the user to leave this page and go forward or backward in the book.


### 2: Send navigation messages


To tell Bloom Player to navigate, you will need to add some javascript to a button:


<div class='notion-row'>
<div class='notion-column'>

```javascript
window.parent.postMessage('{"messageType":"control", "controlAction":"navigate-to-previous-page"}',"*");
```

</div>
</div>


or


<div class='notion-row'>
<div class='notion-column'>

```javascript
window.parent.postMessage('{"messageType":"control", "controlAction":"navigate-to-next-page"}',"*");
```

</div>
</div>

