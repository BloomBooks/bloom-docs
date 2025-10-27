---
title: Using the Book Making tab
sidebar_position: 1
slug: /ref-docs/select-front-matter-or-back-matter-from-a-pack
---

## Using the Book Making tab

1.  [Open](../../User_Interface/Dialog_boxes/Settings_dialog_box.md) the Settings dialog box.
2.  Click the Book Making tab.
3.  Click the Default Font for `<language>` down arrow and then click the desired [font](../../Concepts/Font.md).
4.  Click the Special Script Settings hyperlink to open the Special Script Settings dialog box.

    - Select (![](/ref-docs-assets/images/CheckedBox.PNG)) This script is right to left if the language is right-to-left.
    - Select (![](/ref-docs-assets/images/CheckedBox.PNG)) Do not use special Asian script word breaking if you see problems with an Asian script, such as words that are broken across the ends of lines.
    - Select (![](/ref-docs-assets/images/CheckedBox.PNG)) This script requires taller lines if the script needs taller lines to display tall characters, such as those with stacked diacritics.

Then, click Default Line Spacing (height) and then choose a value.

The value is a multiplier of the default height. So, 2.0 would be twice as tall. This is true for the entire collection and will affect all books in the collection.

Be aware that if you [configured the Normal style](Formatting_text/Configure_a_style.md) to have a different default line spacing, changes you make here will not override it in any books in the collection.

- Use the Font size when displayed in tools control to choose a font size for words and letters that appear in the [tool box](../../Concepts/Tool_Box.md).
- Click OK.

5.  Click the Page Numbering Style down arrow and then click the language that will display the page number you want. The page number on the [inside pages](../../Concepts/Inside_pages.md) will appear in the chosen language. Page numbers do not change in the Pages pane of the Edit tab.
6.  Click the desired Front/Back Matter [Pack](../../Concepts/Front_Back_Matter_Pack.md).
7.  Projects that have Bloom [Enterprise](../Edit_tasks/Enterprise/EnterpriseRequired.md) subscriptions can set up and then choose a bookshelf. See Also: [Make All BloomPubs from Collection](../Publish_tasks/Make_All_BloomPUBS_from_Collection.md).

    - Click Bloom Library Bookshelf ![](/ref-docs-assets/images/User_Interface/EnterpriseStar.png) and then click a bookshelf.

8.  Click OK or Restart.

#### Note

- Each Default Font for control displays one of these symbols:

  - ![](/ref-docs-assets/images/Tasks/Basic_tasks/Formatting_text/GreenCheckMark.png) which means your font is legal to use for all Bloom purposes.
  - ![](/ref-docs-assets/images/Tasks/Basic_tasks/Formatting_text/YellowQuestionMark.png) which means that Bloom cannot determine the rules that govern the use of this font.
  - ![](/ref-docs-assets/images/Tasks/Basic_tasks/Formatting_text/RedExclamMark.png) which means that the font may not be embedded for free so you need to choose a different font.

Move your mouse over these symbols to see a box with information.  
Except for a green check mark (![](/ref-docs-assets/images/Tasks/Basic_tasks/Formatting_text/GreenCheckMark.png)), the box also has an information button (![](/ref-docs-assets/images/Tasks/Basic_tasks/Formatting_text/GRAY_i.png)). Click it to see more details about the font.

These symbols also appear in the Characters [tab](Formatting_text/Configure_a_style.md) of the Format dialog box.

- Changing the default font does not change the Bloom [User Interface](Change_User_Interface_language.md).
- You can [change the formatting](Formatting_text/Formatting_Text_overview.md) for individual [text boxes](../../Concepts/Text_Box.md).
- You probably need to select and clear the Do not use special Asian script word breaking check box, and compare its effect on word breaking in your collection.

Some Asian scripts use an algorithm to break lines between words rather than relying on inter-word space characters. Some minority languages that use such scripts are not handled well by the general algorithms so common use in those languages does insert inter-word spaces. For those specific languages, to prevent invalid line breaks in the middle of words, the inter-word line breaking must be adjusted to ignore the standard algorithm and depend only on having spaces between words. You may need to [get more help](../../Overview/Get_More_Help.md).

#### Related Topics

[Basic tasks overview](Basic_tasks_overview.md)

[Set line spacing for scripts with tall characters](Set_line_spacing_for_scripts_with_tall_characters.md)

[Settings dialog box](../../User_Interface/Dialog_boxes/Settings_dialog_box.md)

[Tab overview](../../User_Interface/Tabs/Tabs_overview.md)
