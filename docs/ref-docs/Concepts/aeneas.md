---
title: aeneas
sidebar_position: 1
slug: /ref-docs/aeneas
---

## aeneas

aeneas is a tool used to synchronize audio and text. It takes an audio file and a list of phrases as inputs. Its output is a synchronization timing file. The way aeneas works is to synthesize each phrase using a text-to-speech [engine](eSpeak.md), and then compare the synthesized audio files against the input audio file to find the phrase breaks.

aeneas must be installed if you will use the aeneas to [adjust timings](../Tasks/Edit_tasks/Record_Audio/Adjust_Timings.md). If it is not installed, a warning appears when you use it to set timings.

To get aeneas, see: [https://bloomlibrary.org/aeneas](https://bloomlibrary.org/aeneas "https://bloomlibrary.org/aeneas").

If you do not install aeneas, Bloom will continue to use pause-based timing.

#### Related Topics

[Concepts overview](Concepts_overview.md)

[eSpeak](eSpeak.md)

[Talking Book Tool overview](../Tasks/Edit_tasks/Record_Audio/Talking_Book_Tool_overview.md)

[Text-to-Speech overview](../Tasks/Advanced_tasks/Text_to_Speech_overview.md)