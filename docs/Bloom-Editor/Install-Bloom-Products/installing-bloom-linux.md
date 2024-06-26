---
title: Install Bloom on Linux
sidebar_position: 4
slug: /installing-bloom-linux
---



:::note

Bloom 5.4 is the final version of Bloom available on Linux in either a flatpak or debian package for the foreseeable future.  The Bloom team is working to convert all of the Bloom user interface to a web-based system. Once that is achieved, we hope to be able to offer a cross-platform Bloom for Linux and MacOS as well as Windows.  We do not have a time-table for when that will happen.

:::




## Installing Bloom on Newer Linux Systems (Ubuntu 22.04 and later) {#0a0e555f3b51439686a086c6f0c97bf1}


Bloom 5.4 is available as a [flatpak package](https://flathub.org/apps/org.sil.Bloom) which will run on newer versions of Ubuntu and Wasta Linux, and probably other Linux distributions also. (The debian packages will not work on these newer releases of Linux because the system libraries are no longer compatible with some of the older software libraries used inside Bloom.)


If flatpak has been installed on your system, you can install Bloom with the following command in a terminal window:


```bash
flatpak install org.sil.Bloom
```


Updating Bloom is a similar:


```bash
flatpak update org.sil.Bloom
```


To run Bloom from the command line, enter the following command:


```bash
flatpak run org.sil.Bloom
```


Setting up a desktop icon that you can click is a bit trickier.  If Bloom was installed globally (the default), then the following commands should work:


```bash
cp /var/lib/flatpak/exports/share/applications/org.sil.Bloom.desktop ~/Desktop
chmod +x ~/Desktop/org.sil.Bloom.desktop
```


If Bloom was installed just for the local user, then these commands are needed:


```bash
cp ~/.local/share/flatpak/exports/share/applications/org.sil.Bloom.desktop ~/Desktop
chmod +x ~/Desktop/org.sil.Bloom.desktop
```


### Known Limitations of the flatpak Bloom {#e6134b6dafb348a9b95ba5c0c4d9db3b}

- Book history does not work in Team Collections on Linux in general, including flatpak.
- Checking ePUB accessibility by ACE by Daisy does not work.  At this point, there are no plans to try to get this working.  It should be possible to save an ePUB from Bloom and check that file separately with the ACE by Daisy program outside of Bloom.

## Installing Bloom on Older Linux Systems (Ubuntu 20.04 and 18.04) {#39ef5bfd225f4978b2f04fe16036059a}


Bloom 5.4 is available as a Debian package for Ubuntu 20.04 (Wasta 20) and Ubuntu 18.04 (Wasta 18). 


:::note

If your Linux distribution uses a package manager other than `apt`, make the appropriate changes to the directions below. 

:::




### Step 1: Try to install the Bloom Editor program {#0955c54890a548c88f50627a739761cf}


```bash
sudo apt install bloom-desktop
```


If this succeeds, you can skip to [Step 4](/installing-bloom-linux#7afd8e3e48c94d5a8a19bad8617ffe8a) below.  If this fails because `apt` cannot locate the package, then the following steps are needed. (If this fails because of authorization issues or a missing `sudo` program, consult your local Linux administrator.)


### Step 2: Add the SIL repository to your system {#d39f37716f014faca56c137191554e6f}


See [Enable access to SIL software and fonts in Ubuntu](https://packages.sil.org/) for alternative instructions on how to add the SIL repository to your system.


**(for bionic or wasta 18):**


```bash
 wget -qO - <https://packages.sil.org/sil.gpg> | sudo apt-key add -
 sudo add-apt-repository "deb <https://packages.sil.org/ubuntu> bionic main"
 sudo apt update

```


**(for focal or wasta 20):**


```bash
wget -qO - [https://packages.sil.org/sil.gpg](https://packages.sil.org/sil.gpg) | sudo apt-key add -
sudo add-apt-repository "deb [https://packages.sil.org/ubuntu](https://packages.sil.org/ubuntu) focal main"
sudo apt update
```


### Step 3: Install the Bloom Editor program {#22bd050eb47f49a4b6db40632e55a6fd}


(This is just a repeat of step 1 now that you have access to the SIL software repository.)


```bash
sudo apt install bloom-desktop
```


### Step 4: Copy the desktop launcher to your local area {#7afd8e3e48c94d5a8a19bad8617ffe8a}


```bash
cp -i /usr/share/applications/bloom.desktop ~/Desktop
chmod +x ~/Desktop/bloom.desktop
```


### Step 5: Launch the Application {#f95630c029d14b5e95ff3072bdc76bbd}


Double click the desktop launcher icon, or type the name of the program in a terminal window (or into the dashboard or startup menu): 


```bash
bloom
```


Once Bloom has been installed, updates will be downloaded and installed the same way your system is already installing updates to other software.

