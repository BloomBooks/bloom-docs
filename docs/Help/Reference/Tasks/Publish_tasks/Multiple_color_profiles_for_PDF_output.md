---
title: Multiple color profiles for PDF output
sidebar_position: 1
slug: /Help/Reference/multiple-color-profiles-for-pdf-output
---

## Multiple color profiles for PDF output

This is a ![](/ref-docs-assets/images/Tasks/Publish_tasks/BloomEnterprise%20button.png) Bloom Enterprise feature.

-   [Enter your Subscription Code](../Basic_tasks/Enter_Subscription_Code.md) in the Settings dialog box.
    

Do these steps:

1.  Navigate to %AppData%\\Local\\SIL\\Bloom\\.
    
2.  In the Bloom folder, create a folder named ColorProfiles.
    
3.  In the new ColorProfiles folder, create another folder named CMYK.
    

Now you have a folder structure like this: C:\\Users\\you\\AppData\\Local\\SIL\\Bloom\\ColorProfiles\\CMYK

You might want to [get more help](../../Overview/Get_More_Help.md).

4.  Put  \*.icc files in the CMYK folder.
    

Bloom will look for \*.icc files in that folder when you publish as PDF.

#### Related Topics

[Bloom Enterprise](../Edit_tasks/Enterprise/EnterpriseRequired.md)

[Publish tab commands](../../User_Interface/Tabs/Publish_tab_commands.md)

[Publish tab tasks overview](Publish_tasks_overview.md)