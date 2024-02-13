---
title: Analytics Fields
sidebar_position: 12
slug: /analytic-fields
---



# Bloom analytics database views field documentation {#daf77128b66841308aada162f50bd994}


## Pages Read {#e19791136fe147098323871867fd0538}


| **column name**              | **description**                                                  | **notes**                                                                                                                         |
| ---------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| time_utc                     | time (UTC)                                                       |                                                                                                                                   |
| time_local                   | time (converted to local time)                                   |                                                                                                                                   |
| date_local                   | date (converted to local time)                                   |                                                                                                                                   |
| context_timezone             | timezone as reported by the device                               |                                                                                                                                   |
| time_local_day               | day of the week (converted to local time)                        |                                                                                                                                   |
| time_local_hour              | hour (converted to local time)                                   |                                                                                                                                   |
| pages_read_audio             | number of audio pages the user viewed                            |                                                                                                                                   |
| pages_read_nonaudio          | number of non-audio pages the user viewed                        |                                                                                                                                   |
| pages_read                   | number of pages the user viewed                                  |                                                                                                                                   |
| anonymous_id                 | unique user ID                                                   |                                                                                                                                   |
| device_unique_id             | unique device ID                                                 | In Aug 2022, this value changed due to Android policy changes; so the same device before and after Aug 2022 has two different IDs |
| device_project_hardware_code | comes from deviceId.json, if found on the device                 |                                                                                                                                   |
| bloom_reader_version         | BR version number, e.g. 2.3                                      |                                                                                                                                   |
| book_title                   | book title                                                       |                                                                                                                                   |
| book_branding                | book branding code                                               |                                                                                                                                   |
| book_language_code           | BCP47 language code                                              |                                                                                                                                   |
| book_language                | always gives "error"                                             | join book_language_code to public.languagecodes to get language name                                                              |
| book_pages                   | total pages in book                                              |                                                                                                                                   |
| finished_reading_book        | user viewed last content page                                    |                                                                                                                                   |
| country                      | country based on IP lookup                                       | IP lookup predated location; it is present even when user disables location on their device; however it is not 100% accurate      |
| region                       | region based on IP lookup                                        |                                                                                                                                   |
| city                         | city based on IP lookup                                          |                                                                                                                                   |
| channel                      | Bloom Reader channel, e.g. release, beta, alpha                  |                                                                                                                                   |
| video_pages_played           | how many pages a user viewed which have video                    |                                                                                                                                   |
| features                     | e.g. comic, talkingbook                                          |                                                                                                                                   |
| book_instance_id             | unique book ID                                                   |                                                                                                                                   |
| distribution_source          | book distribution source                                         | we have plans to make this a chain of sources to show shares, etc., but for now it is only original source                        |
| latitude_approx              | rounded latitude based on device location                        | "device location" usually means gps; see location_source                                                                          |
| longitude_approx             | rounded longitude based on device location                       |                                                                                                                                   |
| country_geo                  | country based on device location                                 |                                                                                                                                   |
| region_geo                   | region based on device location                                  |                                                                                                                                   |
| city_geo                     | city based on device location                                    |                                                                                                                                   |
| source                       | source of the analytics, currently bloomreader or bloomlibrary   | rise and western views are filtered to bloomreader only                                                                           |
| bookshelves                  | bookshelves to which the book is assigned                        | usually only one                                                                                                                  |
| read_duration                | time spent reading the book, in seconds                          | includes audio_duration and video_duration                                                                                        |
| audio_duration               | time spent listening to audio, in seconds                        |                                                                                                                                   |
| video_duration               | time spent watching video, in seconds                            |                                                                                                                                   |
| location_source              | source of the fine location information; or denied or failed     | e.g. gps, network, passive                                                                                                        |
| location_age_days            | how long ago the fine location information was acquired, in days |                                                                                                                                   |


## Comprehension {#05f46bb6721c4d3c88262aebaf418fd5}


| **column name**      | **description**                                                  | **notes**                                                                                                                         |
| -------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| time_utc             | time (UTC)                                                       |                                                                                                                                   |
| time_local           | time (converted to local time)                                   |                                                                                                                                   |
| date_local           | date (converted to local time)                                   |                                                                                                                                   |
| context_timezone     | timezone as reported by the device                               |                                                                                                                                   |
| time_local_day       | day of the week (converted to local time)                        |                                                                                                                                   |
| time_local_hour      | hour (converted to local time)                                   |                                                                                                                                   |
| anonymous_id         | unique user ID                                                   |                                                                                                                                   |
| device_unique_id     | unique device ID                                                 | In Aug 2022, this value changed due to Android policy changes; so the same device before and after Aug 2022 has two different IDs |
| bloom_reader_version | BR version number, e.g. 2.3                                      |                                                                                                                                   |
| book_branding        | book branding code                                               |                                                                                                                                   |
| book_title           | book title                                                       |                                                                                                                                   |
| question_count       | number of questions in quiz                                      |                                                                                                                                   |
| percent_right        | percentage of questions the user got correct                     |                                                                                                                                   |
| country              | country based on IP lookup                                       | IP lookup predated location; it is present even when user disables location on their device; however it is not 100% accurate      |
| region               | region based on IP lookup                                        |                                                                                                                                   |
| city                 | city based on IP lookup                                          |                                                                                                                                   |
| channel              | Bloom Reader channel, e.g. release, beta, alpha                  |                                                                                                                                   |
| book_instance_id     | unique book ID                                                   |                                                                                                                                   |
| distribution_source  | book distribution source                                         | we have plans to make this a chain of sources to show shares, etc., but for now it is only original source                        |
| latitude_approx      | rounded latitude based on device location                        | "device location" usually means gps; see location_source                                                                          |
| longitude_approx     | rounded longitude based on device location                       |                                                                                                                                   |
| country_geo          | country based on device location                                 |                                                                                                                                   |
| region_geo           | region based on device location                                  |                                                                                                                                   |
| city_geo             | city based on device location                                    |                                                                                                                                   |
| source               | source of the analytics, currently bloomreader or bloomlibrary   | rise and western views are filtered to bloomreader only                                                                           |
| bookshelves          | bookshelves to which the book is assigned                        | usually only one                                                                                                                  |
| location_source      | source of the fine location information; or denied or failed     | e.g. gps, network, passive                                                                                                        |
| location_age_days    | how long ago the fine location information was acquired, in days |                                                                                                                                   |


## Download Book {#9270ad4d6c534663a879f29284169c54}


| **column name**  | **description**                                       | **notes**                                                                                                     |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| time_utc         | time (UTC)                                            |                                                                                                               |
| book_id          | book ID in our internal database, used by the website | e.g. VlzkGKQZXw in [https://bloomlibrary.org/book/VlzkGKQZXw](https://alpha.bloomlibrary.org/book/VlzkGKQZXw) |
| book_instance_id | unique book ID                                        |                                                                                                               |
| event_type       | type of download                                      | e.g. shell, read, epub, bloompub, pdf                                                                         |
| book_title       | book title                                            |                                                                                                               |
| book_branding    | book branding code                                    |                                                                                                               |
| country          | country based on IP lookup                            | IP lookup is not 100% accurate                                                                                |
| region           | region based on IP lookup                             |                                                                                                               |
| city             | city based on IP lookup                               |                                                                                                               |
| topic            | book topic(s)                                         |                                                                                                               |

