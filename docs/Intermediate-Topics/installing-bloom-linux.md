---
title: Installing Bloom on Linux
sidebar_position: 3
slug: /installing-bloom-linux
---



# Installing Bloom on Newer Linux Systems (Ubuntu 22.04 and later) {#0a0e555f3b51439686a086c6f0c97bf1}


Bloom 5.4 is available as a flatpak package which will run on newer versions of Ubuntu and Wasta (and probably other Linux distributions). For details on installing the flatpak version of Bloom, see [https://flathub.org/apps/org.sil.Bloom](https://flathub.org/apps/org.sil.Bloom).  The debian packages will not work on these newer releases of Linux because the system libraries are no longer compatible with some of the older software libraries used inside Bloom.


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

- Book history does not work in Team Collections on Linux in general, including flatpak.
- Checking ePUB accessibility by ACE by Daisy does not work.  At this point, there are no plans to try to get this working.  It should be possible to save an ePUB from Bloom and check that file separately with the ACE by Daisy program outside of Bloom.
- Bloom 5.4 is the final version of Bloom available on Linux in either a flatpak or debian package for the foreseeable future.  The Bloom team is working to convert all of the Bloom user interface to be web-based, but has a long ways to go to get there.  Once that is achieved, we hope to be able to offer a more cross-platform Bloom available on Apple OSX and Linux as well as Windows.  We do not have a time-table for when that will happen.

# Installing Bloom on Older Linux Systems (Ubuntu 20.04 and 18.04) {#39ef5bfd225f4978b2f04fe16036059a}


Bloom 5.4 is available as a Debian package for Ubuntu 20.04 (Wasta 20) and Ubuntu 18.04 (Wasta 18).  This is the final version of Bloom available for these versions of Linux.


### Step 1: Try to install the Bloom Editor program {#0955c54890a548c88f50627a739761cf}


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


## Step 3: Install the Bloom Editor program {#22bd050eb47f49a4b6db40632e55a6fd}


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

