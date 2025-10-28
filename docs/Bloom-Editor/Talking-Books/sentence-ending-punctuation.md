---
title: Special Sentence-Ending Punctuation
sidebar_position: 7
slug: /sentence-ending-punctuation
---



Bloom’s audio-splitter assumes your language uses standard sentence-ending punctuation ( . ? ! ).


Some languages, like Thai, use spaces to mark sentence boundaries. To let Bloom’s speech Timings analyzer know about non-standard sentence-ending punctuation,, do the following:

1. Create a book using the Leveled Reader Template
2. In the Edit Tab, Leveled Reader Tool, click “Set up Levels.”
3. On the Punctuation tab, type “\U0020” which is the Unicode representation of a normal space.
4. Click OK to close the dialog.

![](./sentence-ending-punctuation.2994bb19-df12-8031-b4c8-e03fb5a8b1ff.png)


:::caution

Going forward, Bloom’s speech Timings analyzer will now recognize the new sentence-breaking character. 

However, in order to see these results for previously analyzed recordings, you must [re-run the analyzer](/record-and-split-audio#29a4bb19df12807b941be8c82259d939) for each text box.

:::



