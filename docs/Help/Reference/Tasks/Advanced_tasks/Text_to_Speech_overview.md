---
title: Text to Speech overview
sidebar_position: 1
slug: /Help/Reference/text-to-speech-overview
---

## Text-to-Speech overview

#### Background

In the Talking Book Tool, there is an advanced option that lets you [record](../Edit_tasks/Record_Audio/Using_the_Talking_Book_Tool.md) an entire text box in one reading, rather than sentence by sentence. We still want individual sentences to be highlighted during playback, so we need to figure out where each sentence is in the audio. Bloom can do this automatically using a Text-to-Speech (TTS) system to read your text out loud to itself. Then it compares that audio to your audio, and through a process known as “forced alignment”, it figures out where your sentences start and end.

To hear what this sounds like for text you have recorded, press and hold the Ctrl key down and click the Check [button](../Edit_tasks/Record_Audio/Talking_Book_Tool_legend.md).

The [aeneas](../../Concepts/aeneas.md) / [eSpeak](../../Concepts/eSpeak.md) system that Bloom uses comes with a number of TTS languages. They are listed on the internet [here](http://espeak.sourceforge.net/languages.md "http://espeak.sourceforge.net/languages.md"). If you are making a talking book in one of those languages, it will use the correct language to read your text aloud to itself. But for most languages, Bloom does not have a TTS system and so must use another system, such as English or [Esperanto](https://simple.wikipedia.org/wiki/Esperanto "https://simple.wikipedia.org/wiki/Esperanto"), to approximate what the text should sound like. Many times, this works just fine.

#### Issues

There are two situations where Bloom needs you to help make this work:

-   Bloom is doing a bad job of synchronizing the highlighting with the audio. This can happen because the proper way to pronounce your text is very different from how Esperanto is pronounced or you have a number of letters or sounds that are not in Esperanto.
    

Press and hold the Ctrl key down and click Check to hear how well (or badly) the TTS system reads your text. Then, if you added a conversion file, an informational pane appears in the toolbox describing the result of the orthography conversion, and the eSpeak language and conversion file used. If you move your mouse pointer over it, it will remain in view. Otherwise, it only remains in view briefly. Use this information if you need to [get more help](../../Overview/Get_More_Help.md). 

-   Your language does not use a Latin script.
    

#### Solution

Here are two different ways to help improve the results when you [adjust timings](../Edit_tasks/Record_Audio/Adjust_Timings.md) for sentences.

-   Change the TTS language:
    

If your language is written in Latin script and is written in a way that is closer to one of Bloom’s TTS languages, you can tell Bloom to use that TTS language instead of Esperanto.

To do this, [create an empty conversion file](Create_an_empty_conversion_file.md).

-   Let Bloom use a transliteration rules file:
    

If changing the TTS language is not enough, your next option is to help Bloom do a transliteration from your language to one of its TTS languages.

To do this, [create a transliteration rules file](Create_a_transliteration_rules_file.md).

#### Related Topics

[Adjust Timings](../Edit_tasks/Record_Audio/Adjust_Timings.md)

[Advanced tasks overview](Advanced_tasks_overview.md)

[Setting dialog box](../../User_Interface/Dialog_boxes/Settings_dialog_box.md)

#### Related Internet Sites

[https://en.wikipedia.org/wiki/Tab-separated\_values](https://en.wikipedia.org/wiki/Tab-separated_values "https://en.wikipedia.org/wiki/Tab-separated_values")

[http://espeak.sourceforge.net/languages.html](http://espeak.sourceforge.net/languages.md)

[https://simple.wikipedia.org/wiki/Esperanto](https://simple.wikipedia.org/wiki/Esperanto "https://simple.wikipedia.org/wiki/Esperanto")

[https://simple.wikipedia.org/wiki/International\_auxiliary\_language](https://simple.wikipedia.org/wiki/International_auxiliary_language "https://simple.wikipedia.org/wiki/International_auxiliary_language")