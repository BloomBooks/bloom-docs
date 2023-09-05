---
title: Notes sur « Publier en tant qu'ePUB »
sidebar_position: 2
slug: /ePUB-notes
keywords:
  - ePUB
  - publier
  - livre numérique
---



:::tip

**ePUBs Fixes ou Fluides**

À partir de Bloom 5.4, on a la possibilité de publier des ePUB en mode **Fixe** **mise en page** ou **Mode Fluide**.

Les ePUB **avec une Mise en Page Fixe** fonctionnent avec des lecteurs électroniques entièrement compatibles (ePUB 3 standard) pour reproduire exactement l'affichage dans Bloom. Les ePUB en mode fixe sont une option intéressante pour les livres en format paysage, ce qui est d'ailleurs la seule option pour les livres Bloom qui contiennent des surcouches d'images telles que les bulles de parole et les légendes. Malheureusement, de nombreux lecteurs électroniques affichent plutôt mal les livres en format paysage. En outre, les ePUB en mode Fixe ne gèrent pas les zones de texte qui défilent, ce qui fait que tout le texte doit tenir sur la page.

Les ePUB Fluides **et** permettent aux lecteurs électroniques de choisir la mise en page des images et du texte qu'ils veulent. Ce mode permet également aux utilisateurs d'ajuster la taille du texte dans les paramètres de la police de l'application ou du système utilisateur.

:::




:::tip

Notez que pour une production sûre de livres numériques en Bloom du genre Ce Que Vous Voyez Est Ce Que Vous Obtenez, on recommande les lecteurs qui gèrent notre format **BloomPUB**. Actuellement ceux-ci sont : [Bloom Reader](https://bloomlibrary.org/page/create/bloom-reader), [BloomPUB Viewer](https://github.com/BloomBooks/bloompub-viewer/releases), et les applications créées avec [Reading App Builder](https://software.sil.org/readingappbuilder/). Ces lecteurs fournissent également des analyses sur [BloomLibrary.org](http://bloomlibrary.org/) afin que vous puissiez voir l’évolution et l’utilisation de vos livres.

:::




Il existe de nombreux lecteurs ePUB disponibles pour Windows, Android, iOS et Linux, mais ces lecteurs varient dans leur capacité à se conformer à la norme ePUB3. Par conséquent, on ne peut pas compter sur eux pour afficher fidèlement le contenu d'un livre Bloom, lire des vidéos en langue des signes ou lire l'audio des Livres Audio de Bloom.


Dans les deux graphiques suivants, nous présentons quelques remarques sur notre évaluation de différents lecteurs, la première pour les ePUB en mode **Fixe** et la seconde pour les ePUB en mode **Fluide**.


### Performance de différents lecteurs ePUB pour Bloom <u>Fixe</u>-mode ePUB {#2e1030dda972401ba08157c7fc8fcd45}


|                                                                                                  | Outil de Livre Audio | Surlignage de Texte du Livre Audio | Outil Description d'Image (Livres Audio) | Format Paysage | Langue des Signes | Bulles Superposées (BD par exemple) |
| ------------------------------------------------------------------------------------------------ | -------------------- | ---------------------------------- | ---------------------------------------- | -------------- | ----------------- | ----------------------------------- |
| Version eKitabu Windows<br/>                                                               | ✓                    | Non                                | ✓                                        | ✓              | ✓                 | ✓                                   |
| eKitabu Android<br/>v5.4.1                                                                 | ✓                    | Non                                | ✓                                        | (1)            | (1)               | ✓                                   |
| Version Lis-a<br/> Android<br/>25 fév 2022                                           | ✓                    | ✓                                  | ✓                                        | (2)            | (2)               | (3)                                 |
| Google Play Books<br/>sept 2022                                                            | Non                  | Non                                | Non                                      | Non            | Non               | Non                                 |
| Livres Apple<br/>sept 2022                                                                 | Non                  | Non                                | Non                                      | ✓              | ✓                 | (3)                                 |
| Dolphin EasyReader<br/>(version Android)                                                   | (4)                  | (5)                                | Non                                      | Non            | Non               | (3)                                 |
| Reader Thorium (Windows)                                                                         | Non                  | Non                                | Non                                      | ✓              | ✓                 | ✓                                   |
| Simply Reading [(Android)](https://play.google.com/store/apps/details?id=aeldata.simply.reading) | ✓                    | Non                                | ✓                                        | (1)            | (1)               | ✓                                   |

1. Divers contrôles d'application (p. ex. barre de menus, barre de média) obscurcissent des parties significatives des ePUB en mode Fixe, ce qui les rend inutilisables.
2. Le texte sur le côté droit de l'écran est souvent légèrement écourté.
3. Le positionnement du texte dans les bulles de parole et les légendes est inexact, parfois excessivement.
4. Écrêtage fréquent de l'audio.
5. Le surlignage du texte est aléatique et peu fiable.

### Performance de différents lecteurs ePUB pour Bloom <u>Fluide</u>-mode ePUB {#50df0c6098104edcb56dd27a79d0a139}


|                                                                                                  | Outil de Livre Audio | Surlignage de Texte du Livre Audio | Outil Description d'Image (Livres Audio) | Rendu Paysage vers Portrait | Langue des Signes | **Bulles Superposées (BD par exemple)** |
| ------------------------------------------------------------------------------------------------ | -------------------- | ---------------------------------- | ---------------------------------------- | --------------------------- | ----------------- | --------------------------------------- |
| Version eKitabu Windows<br/>                                                               | ✓                    | ✓                                  | ✓                                        | (2)                         | ✓                 | N / A                                   |
| eKitabu Android<br/>v5.4.1                                                                 | Non                  | Non                                | Non                                      | (2)                         | ✓                 | N / A                                   |
| Version Lis-a<br/> Android<br/>25 fév 2022                                           | ✓                    | ✓                                  | ✓                                        | (2)                         | ✓                 | N / A                                   |
| Google Play Books<br/>sept 2022                                                            | Non                  | Non                                | Non                                      | (3)                         | Non               | N / A                                   |
| Livres Apple<br/>sept 2022                                                                 | Non                  | Non                                | Non                                      | (2)                         | ✓                 | N / A                                   |
| Dolphin EasyReader<br/>(version Android)                                                   | (1)                  | Non fiable                         | (1)                                      | ✓                           | Non               | N / A                                   |
| Reader Thorium (Windows)                                                                         | ✓                    | ✓                                  | ✓                                        | (2)                         | ✓                 | N / A                                   |
| Simply Reading [(Android)](https://play.google.com/store/apps/details?id=aeldata.simply.reading) | ✓                    | ✓                                  | ✓                                        | (2)                         | ✓                 | N / A                                   |

1. Écrêtage fréquent de l'audio.
2. Les blocs de texte placés en haut ou en bas (dans l'édition de Bloom) s'affichent bien, mais ceux de droite (dans l'édition de Bloom) pourraient avoir des marges réduites.
3. Le texte qui devrait être renvoyé à la ligne est souvent tout simplement coupé.

:::caution

Pour les livres produits par Bloom 5.4 : si vous créez un livre parlant à partir d'un livre superposé (bande dessinée), les lecteurs ePUB liront les bulles dans l'ordre dans lequel vous les avez créées. That won’t always be the correct order! We have an idea of how to improve things for Bloom 5.5.

:::



