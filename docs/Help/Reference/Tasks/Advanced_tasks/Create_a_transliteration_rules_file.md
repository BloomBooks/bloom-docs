---
title: Create a transliteration rules file
sidebar_position: 1
slug: /Help/Reference/create-a-transliteration-rules-file
---

## Create a transliteration rules file

-   Review [Text-to-Speech overview](Text_to_Speech_overview.md).
    

Do these steps if you need to provide transliteration rules for Bloom:

1.  If you first tried an [empty conversion file](Create_an_empty_conversion_file.md), delete that file from the collection [folder](../../User_Interface/Tabs/Collections_tab_commands.md).
    
2.  If you do not know your language code, open the Settings [dialog box](../../User_Interface/Dialog_boxes/Settings_dialog_box.md), Languages tab. Language codes appear there in parenthesis after the language name.
    
3.  Use and editor, such as Notepad, to create a simple tab-separated values (TSV) file with two columns:
    

-   In column 1, list the specified characters in the source (from) language.
    
-   In column 2, list the specified characters of the target (to) language, which must be one of the TTS languages.
    

You can type any number of transliteration rules.

Type one per line with a Tab between the from and the to languages.

For example, a conversion from a Thai script to English might have rules like these:

![pic](/ref-docs-assets/images/Tasks/Advanced_tasks/TranlitExample.png)

4.  Use the Show in File Explorer [right-click](../../User_Interface/Tabs/Collections_tab_commands.md) command to find the collection folder (not the book folder). Then, save the file there with this file name convention:
    

convert\_\[sourceLangCode\]\_to\_\[targetLangCode\].txt

#### Note

-   For example, convert\_etr\_to\_eo.txt where "eo" is the code for Esperanto.
    

This file is used when you [use](../Edit_tasks/Record_Audio/Using_the_Talking_Book_Tool.md) the Talking Book Tool to record all the text in a text box using one reading, and then [adjust timings](../Edit_tasks/Record_Audio/Adjust_Timings.md) by sentence for highlighting.

-   The fallback language is the target language.
    
-   You can also use spaces between the columns, but using the Tab key is recommended.
    

#### Related Topics

[Advanced tasks overview](Advanced_tasks_overview.md)

[eSpeak](../../Concepts/eSpeak.md)

[Get more help](../../Overview/Get_More_Help.md)

#### Related Internet Sites

[https://en.wikipedia.org/wiki/Tab-separated\_values](https://en.wikipedia.org/wiki/Tab-separated_values "https://en.wikipedia.org/wiki/Tab-separated_values")

[http://espeak.sourceforge.net/languages.html](http://espeak.sourceforge.net/languages.md)