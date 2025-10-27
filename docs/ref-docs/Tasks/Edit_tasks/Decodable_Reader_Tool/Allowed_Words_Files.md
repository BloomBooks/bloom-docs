---
title: Allowed Words Files
sidebar_position: 1
slug: /ref-docs/allowed-words-files
---

## Allowed words files

In the Decodable Reader Tool, you typically [set up stages](Set_up_Stages.md) by defining a set of letters and sight words for each stage.

Alternatively, you can set up stages by providing Bloom with a file of allowed words for a stage. With this approach, decodable readers will only be allowed to use words from the corresponding allowed words file for the current stage. Other words are [flagged](../../../Concepts/Flagged_words_in_reader.md).

Note: Books based on lists of allowed words are not what literacy experts usually mean by "decodable readers". However, Bloom supports this approach for people who work in contexts where such lists are used.

To set up decodable readers this way, do these steps in the Set up Decodable Reader Tool dialog box:

1.  In the Sample Words [tab](Words_tab.md), select (![](/ref-docs-assets/images/SelectedRadioButton.png)) We are using lists of allowed words to define stages.
    

This disables the other features of this tab.

2.  Click the Decodable Stages tab.
    
3.  Click the Add Stage link.
    

In the right pane, a Choose link appears.

4.  Click the Choose link and choose the file for this stage.
    

Notice that the right pane shows the allowed words.

5.  Repeat for each stage you want to add.
    
6.  To change the file for a stage, do these steps in the right pane:
    
    -   Move your mouse pointer over the file name to see the Remove From This Stage button (![](/ref-docs-assets/images/Tasks/Edit_tasks/Decodable_Reader_Tool/Remove_File_Button.png)).
        
    -   Click it to remove the file from this stage.
        
    -   Repeat step 4 above to choose a different file.
        

#### Note

-   The Decodable Reader Tool can handle a corpus of up to a maximum of 10,000 words.
    
-   Files that Bloom can read must be \*.txt files. They must be Unicode (UTF-8). Some text editors, such as Gedit in Linux, do not automatically add .txt to the file name. In this case, you need to manually edit the file name to add ".txt".  In Microsoft Word, for example, you can save the \*.doc or \*.docx file as a \*.txt file.
    
-   Each allowed words file needs to have a unique name.
    
-   When you choose a file, Bloom makes a copy in a folder called Allowed Words. If you edit the source file, you will need to remove the file from the stage and then choose the edited file again.
    
-   In the ![](/ref-docs-assets/images/Tasks/Edit_tasks/Decodable_Reader_Tool/Decodable_Reader_Tool_icon.png) Decodable Reader Tool, words that are allowed in this stage appear. Below it is the list of words that corresponds to the words in the file you chose for that stage. You can [sort](Sort_words_in_the_stage.md) them but not by frequency.
    

#### Related Topics

[Decodable Reader Tool overview](Decodable_Reader_Tool_overview.md)

[Make Bloom suggest words](Make_Bloom_suggest_words.md)

[Set up Decodable Reader Tool dialog box](Set_up_Decodable_Reader_Tool_dialog_box.md)