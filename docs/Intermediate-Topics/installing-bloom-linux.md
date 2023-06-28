---
title: Installing Bloom on Linux
sidebar_position: 3
slug: /installing-bloom-linux
---



# Installing Bloom on Newer Linux Systems (Ubuntu 22.04 and later) {#0a0e555f3b51439686a086c6f0c97bf1}


Bloom 5.3 is available as a flatpak package which will run on newer versions of Ubuntu and Wasta (and probably other Linux distributions). For details on installing the flatpak version of Bloom, see [https://flathub.org/apps/org.sil.Bloom](https://flathub.org/apps/org.sil.Bloom).  The debian packages will not work on these newer releases of Linux because the system libraries are no longer compatible with some of the older software libraries used inside Bloom.


If flatpak has been installed on your system, then installing Bloom can be done with the following command in a shell window:


```bash
flatpak install org.sil.Bloom
```


Updating Bloom is a similar command:


```bash
flatpak update org.sil.Bloom
```


Running Bloom from the command line is also a similar command:


```bash
flatpak run org.sil.Bloom
```


Setting things up for a desktop icon that you can click on is a bit trickier.  If Bloom was installed globally (the default), then the following commands should work:


```bash
cp /var/lib/flatpak/exports/share/applications/org.sil.Bloom.desktop ~/Desktop
chmod +x ~/Desktop/org.sil.Bloom.desktop
```


If Bloom was installed just for the local user, then these commands are needed:


```bash
cp ~/.local/share/flatpak/exports/share/applications/org.sil.Bloom.desktop ~/Desktop
chmod +x ~/Desktop/org.sil.Bloom.desktop
```


### Known Limitations of the Flatpak Bloom {#e6134b6dafb348a9b95ba5c0c4d9db3b}

- Team Collections do not work in the flatpak version of Bloom 5.3.  (This will be fixed when 5.4 is released.)
- Checking ePUB accessibility by ACE by Daisy does not work.  At this point, there are no plans to try to get this working.  It should be possible to save an ePUB from Bloom and check that file separately with the ACE by Daisy program outside of Bloom.
- Bloom 5.4 will be the final version of Bloom available on Linux in either a flatpak or debian package for the foreseeable future.  The Bloom team is working to convert all of the Bloom user interface to be web-based, but has a long ways to go to get there.  Once that is achieved, we hope to be able to offer a more cross-platform Bloom available on Apple OSX and Linux as well as Windows.  We do not have a time-table for when that will happen.

# Installing Bloom on Older Linux Systems (Ubuntu 20.04 and 18.04) {#39ef5bfd225f4978b2f04fe16036059a}


### Step 1: Try to install the Bloom Desktop program {#0955c54890a548c88f50627a739761cf}


```bash
sudo apt install bloom-desktop
```


If this succeeds, you can skip to step 4 below (you are already a user of SIL software).  If this fails because of authorization issues or a missing sudo program, you need to consult with the local Linux administrator.  If this fails because apt cannot locate the package, then the following steps are needed.


## Step 2: Add the SIL repository to your system {#d39f37716f014faca56c137191554e6f}


See the [Enable access to SIL software and fonts in Ubuntu](https://packages.sil.org/) for alternative instructions on how to add the SIL repository to your system.


### (for bionic or wasta 18): {#828abb7005574e7d87c61a4009227746}


```bash
 wget -qO - <https://packages.sil.org/sil.gpg> | sudo apt-key add -
 sudo add-apt-repository "deb <https://packages.sil.org/ubuntu> bionic main"
 sudo apt update

```


### (for focal or wasta 20): {#0a236525d2d54a0b9f7c1bb7a5793e9a}


```bash
wget -qO - [https://packages.sil.org/sil.gpg](https://packages.sil.org/sil.gpg) | sudo apt-key add -
sudo add-apt-repository "deb [https://packages.sil.org/ubuntu](https://packages.sil.org/ubuntu) focal main"
sudo apt update
```


## Step 3: Install the Bloom Desktop program {#22bd050eb47f49a4b6db40632e55a6fd}


```bash
sudo apt install bloom-desktop
```


(This is just a repeat of step 1 now that you have access to the SIL software repository.)


## Step 4: Copy the desktop launcher to your local area {#7afd8e3e48c94d5a8a19bad8617ffe8a}


```bash
cp -i /usr/share/applications/bloom.desktop ~/Desktop
chmod +x ~/Desktop/bloom.desktop
```


## Step 5: Launch the Application {#f95630c029d14b5e95ff3072bdc76bbd}


### (mouse) {#f81860b903e14dfc9ce02714f1fd3e0a}


Double click the desktop launcher icon


### (keyboard) {#2cc573a95d6e4212a378e14b33619c23}


Type the name of the program in a terminal window or into the dashboard or startup menu


```bash
bloom
```


Once Bloom has been installed, updates will be downloaded and installed the same way your system is already installing updates to other software.


# Getting Bloom Beta Releases on Linux {#664d99b508b64ba09f217309360967c0}


A **beta release** of Bloom 5.4 is available for Ubuntu Bionic and Focal (or Wasta 18 and 20).  Again, you are welcome to try other versions of Linux but we cannot promise to support them.  As with Windows, a current release of Bloom (`bloom-desktop`) can coexist with a beta release of Bloom (`bloom-desktop-beta`) on Linux: installing one does not affect the other.


Note that any beta releases are available only in debian package form.


## Step 1: Try to install the beta release of the Bloom Desktop program {#78002d51b743458cb1ef6abc6138f010}


```bash
sudo apt install bloom-desktop-beta
```


If this succeeds, you can skip to step 5 below (and you are living as a constant beta tester of SIL software).  If this fails because of authorization issues or a missing sudo program, you need to consult with the local Linux administrator.  If this fails because apt cannot locate the package, then the following steps are needed.


## Step 2: Add the SIL experimental repository to your system {#3e1dccebcc5c43348edbe805509bd945}


See [Beta software](http://packages.sil.org/) for alternative directions on how to add the experimental repository to your system.  The first command (which adds the security key for the SIL repositories) may be unnecessary if you already use SIL software.


### (for bionic or wasta 18): {#3c2db80412bc4bc88a275723484c809f}


```bash
wget -qO - <http://packages.sil.org/sil.gpg> | sudo apt-key add -
sudo add-apt-repository "deb <http://packages.sil.org/ubuntu> bionic-experimental main"
sudo apt update
```


### (for focal or wasta 20): {#7360726caca348c6a113cd63c118286e}


```bash
wget -qO - [http://packages.sil.org/sil.gpg](http://packages.sil.org/sil.gpg) | sudo apt-key add -
sudo add-apt-repository "deb [http://packages.sil.org/ubuntu](http://packages.sil.org/ubuntu) focal-experimental main"
sudo apt update
```


## Step 3: Install the beta release of the  Bloom Desktop program {#e27fd4d3f86c4720a10a42c9b3db10db}


```bash
sudo apt install bloom-desktop-beta
```


## Step 4: Remove the experimental repository from your system for safety {#780eb477381a47778261ee0512afe890}


Note that removing the experimental repository reference will prevent the beta version of Bloom from being updated.  So you have a trade-off to consider.  Do you want to always have the latest beta release of Bloom at the risk of getting other beta software that you don't want?  Or do you want to prevent surprises at the cost of going through the process of adding and removing the experimental repository reference every time a new beta release of Bloom is announced?


### (for bionic or wasta 18) {#17ddb7edf32c41f9935b12184511f11f}


```bash
sudo add-apt-repository --remove "deb [http://packages.sil.org/ubuntu](http://packages.sil.org/ubuntu) bionic-experimental main"
sudo apt update
```


### (for focal or wasta 20) {#84305eda04b44012b576af022b3a33c5}


```bash
sudo add-apt-repository --remove "deb <http://packages.sil.org/ubuntu> focal-experimental main"
sudo apt update
```


## Step 5: Copy the desktop launcher to your local area {#2dc5fe60c1a74bedbfbdfe30c3399e9a}


```bash
cp -i /usr/share/applications/bloom-beta.desktop ~/Desktop
chmod +x ~/Desktop/bloom-beta.desktop
```


## Step 6: Launch the Application {#df764bf1c1064284a70b6c3cc638d500}


### (mouse) {#5346c1e5941949ae82844d679444cefd}


Double click the desktop launcher icon


### (keyboard) {#752903a292c14f5698fbfe1530478c15}


Type the name of the program in a terminal window or into the dashboard or startup menu


```bash
bloom-beta
```


Once a beta release of Bloom has been installed, updates to the beta release will not be downloaded and installed the same way your system installs updates to other software **unless you skip step 4 above**.

