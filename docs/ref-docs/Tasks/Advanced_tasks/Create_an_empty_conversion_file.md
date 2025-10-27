---
title: Create an empty conversion file
sidebar_position: 1
slug: /ref-docs/create-an-empty-conversion-file
---

## Create an empty conversion file

-   Review [Text-to-Speech overview](Text_to_Speech_overview.md).
    

If your language is written in Latin script and is written in a way that is closer to one of Bloom's TTSs languages, do these steps to tell Bloom to use that TTS language instead of Esperanto:

1.  If you do not know your language code, [open](../../User_Interface/Dialog_boxes/Settings_dialog_box.md) the Settings dialog box, Languages tab. Language codes appear there in parenthesis after the language name.
    
2.  Use a text editor, such as Notepad, to create an empty file.
    
3.  Use the Show in File Explorer [command](../../User_Interface/Tabs/Collections_tab_commands.md) to find the collection [folder](../../User_Interface/Tabs/Collections_tab_commands.md) (not a book folder), and then save the file there with this filename convention:
    

convert\_\[sourceLangCode\]\_to\_\[targetLangCode\].txt

#### Note

-   For example, if your language "xyz" is written/pronounced in a way that is closer to Russian than Esperanto, tell Bloom to use Russian TTS by saving an empty file named convert\_xyz\_to\_ru.txt in the collection folder.
    

Just by being there, it will tell Bloom to use the Russian TTS language instead of Esperanto.

This file is used when you **[use](../Edit_tasks/Record_Audio/Using_the_Talking_Book_Tool.md)** the Talking Book Tool to record all the text in a text box in one reading, and then [adjust timings](../Edit_tasks/Record_Audio/Adjust_Timings.md) by sentence for highlighting.

If this does not work, delete this file and **[create a transliteration rules file](Create_a_transliteration_rules_file.md) instead.**

#### Related Topics

[Advanced tasks overview](Advanced_tasks_overview.md)

[eSpeak](../../Concepts/eSpeak.md)

[Get more help](../../Overview/Get_More_Help.md)

#### Related Internet Sites

[http://espeak.sourceforge.net/languages.html](http://espeak.sourceforge.net/languages.md)