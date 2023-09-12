---
title: Team Collection Technical Notes
sidebar_position: 8
slug: /team-collection-technical
---



# The “Lost and Found” folder {#c000688c217144f591de310c63f36582}


A book gets put in Lost and Found in three scenarios:

1. When **Joining** an existing Team Collection, Bloom finds that there is already a Working collection by the same name and it contains a book with the same [book ID](/derivatives#5a9eb5a6c54546659990c06b3cab766c) as one in the Shadow collection but a different name.
2. When **Joining** an existing Team Collection, Bloom finds there is already a Working collection by the same name, and it contains a book with the same name as one in the Shadow collection but a different book ID.
3. When Syncing a Team Collection, Bloom finds a book that is checked out and edited in the Working collection, but is recorded in the Shadow collection as being: a) checked _out_ by you elsewhere, or b) checked _out_ by someone else, or c) checked _in_ but edited and changed in any way.

#3b will create a NotifyUserOfProblem, allowing the user to report it.


#1 and #2 represent somewhat unusual circumstances, but not necessarily a failure of our code.


#3a and #3c probably indicate some failure of the checkout/checkin system, though it could be something else (e.g., someone unwisely restored an old backup of the Dropbox folder).

