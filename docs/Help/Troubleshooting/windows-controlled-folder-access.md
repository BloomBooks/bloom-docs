---
title: Unblock Bloom from Windows Controlled Folder Access
sidebar_position: 6
slug: /windows-controlled-folder-access
keywords: [troubleshooting, Defender, controlled, folder]
---



Microsoft Windows 10 & 11 have a security feature called “Controlled Folder Access”:



> Controlled folder access in Windows Security reviews the apps that can make changes to files in protected folders and blocks unauthorized or unsafe apps from accessing or changing files in those folders.


Bloom is not well-known enough to be “known” by Microsoft, and so if you turn on this security measure, Bloom will not be able to write to your Bloom files inside of your “My Documents”. Bloom checks for this problem and shows a notice like this:


![](./windows-controlled-folder-access.f11a75b2-9fd2-47ca-bea9-1f21e74e5592.png)


You have three options:

- [Option 1: Turn off “Controlled Folder Access” (preferred)](/windows-controlled-folder-access#9ac2ed38622f424184876aec2aa376a9)
- [Option 2: Move your Bloom collections folder out of “My Documents”](/windows-controlled-folder-access#a191f24b4c27424587acfb06f13b60c7)
- [Option 3: Tell Windows to allow Bloom (not recommended)](/windows-controlled-folder-access#753bae5344764a5eb719cb97c2fbaea6)

## Option 1: Turn off “Controlled Folder Access” (preferred) {#9ac2ed38622f424184876aec2aa376a9}

1. On your keyboard, press the Windows key:

	![](./windows-controlled-folder-access.2a3452e2-83ae-4602-a3f6-e67e330a84c5.png)

2. Then type “controlled folder” followed by the Enter key:

	![](./windows-controlled-folder-access.912aea34-a5d9-495b-b54e-a726010bcb28.png)

3. If “Controlled folder access” is set to “On”:
	1. Click the toggle button that says “On”. It will switch to “Off”.

		![](./windows-controlled-folder-access.dd3be00f-22d5-4e00-a81f-a6625485db90.png)

4. If “Controlled folder access” is “Off”, then something else is causing the problem, and you can stop reading these instructions.
5. Now run Bloom again.

## Option 2: Move your Bloom collections folder out of “My Documents” {#a191f24b4c27424587acfb06f13b60c7}


If you move your Bloom collections folders somewhere that Windows is not “controlling”, then it will not interfere. 


However, be aware that with this method Bloom will fail to be able to make **new** Collections, because it only knows how to make them under “My Documents”.


If you need to make new collections, you will have to use “[Option 3](/windows-controlled-folder-access#753bae5344764a5eb719cb97c2fbaea6)” to make any additional collections. After that, you can move your collections folders somewhere that is not “Controlled”.


![](./windows-controlled-folder-access.4b533f25-d04e-4bbf-a6f9-b9967d214d28.png)


## Option 3: Tell Windows to allow Bloom (not recommended) {#753bae5344764a5eb719cb97c2fbaea6}


:::caution

This approach is not practical because you will need to do it each time Bloom updates itself. It may not be clear to you that this happened and you may not remember having read this notice. So then you will suddenly get hard-to-understand error messages and be stuck.

:::




To tell your Windows that you trust Bloom, do the following steps:

1. On your keyboard, press the Windows key:

	![](./windows-controlled-folder-access.07672e31-1384-49b3-9868-3d08b97e44f3.png)

2. Type “controlled folder” followed by the Enter key:

	![](./windows-controlled-folder-access.e03f53e4-2fa8-4223-ba2c-779b3b032ebc.png)

3. Confirm that “Controlled folder access” is set to “On”.
	1. If it is “Off”, then something else is causing the problem, and you can stop reading these instructions.
4. Click “Allow an app through Controlled folder access”

	![](./windows-controlled-folder-access.22df6ccd-1ba1-4b7b-8e4f-bd53e2d90fbb.png)

5. A dialog will appear asking if you want “Windows Security” to make changes to your device. Click “Yes”.
6. Click `Add an allowed app`
7. Click `Recently blocked apps`

	![](./windows-controlled-folder-access.cffa4836-a4d4-4303-88a2-bcd3b4d10731.png)

8. Click the `+` next to the **Bloom program**.
9. Click `Close`

	![](./windows-controlled-folder-access.c07745b6-31e8-4ab3-86d5-9e267826ecba.png)

10. Finally, run Bloom again. This time it should open without an error.
