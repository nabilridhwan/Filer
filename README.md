# Filer (v2.1.0)
A 'file-explorer' in NodeJS

## Note
-   To get files or directories to show up, please ensure that you place all your folders in the `storage` folder.
-   This app is served over HTTP (Not encrypted!). DO NOT STORE SENSITIVE DATA ON THE `storage` FOLDER.

## Changelogs
-	Now, items are supposed to be placed within the 'storage' folder
-   Removed Feature: The first index of the array is now a link which directs to the `root` folder.

## Why?
I wanted to create my own knock-off of a storage system. So I created this! Any file or folder placed within the directory of this project (locally) will be fully accesible to other devices on the local network. For example: if I uploaded a video to a specific directory. My phone can access the item if it is on the same network connection as the host (my computer).

## Disclaimer
This 'product' is given to the client 'as is' and 'as available' without warranty or any kind of exchange, replacement or cancellation scheme. The client notes that the developer is not responsible for anything that happens to the client. This specific 'product' is licensed under the `GNU General Public License v3.0` license.

## Changelogs
-   Now recursive file or directory viewing is enabled through the help of a counter variable.
-   Changed default port from 3000 to 3030. (Will randomise this in the future)
-   Every file's `type` depends in the file extension.
-   Every file or directory has an object `link` which contains both links for the file and dir. If the item is not of type `dir`, the link for the `dir` is `null` and vice-versa.
-   The 'sophisticated' check (for when the item is a directory or a file) is now more better and reliable.
-   The first index of the array is now a link which directs to the `root` folder.

# Documentation
> The IP (in this documentation is `127.0.0.1`) may vary from user to user. To know on which IP and Port the server is running from: When you run the NodeJS application, you will get a console.log() output saying: `Listening on: [IP_ADDRESS]:[PORT]`. For example: `Listening on: 127.0.0.1:3000`.

## `GET` request output
If a `GET` request is made to one of the enpoints, the server will return back with an array of objects containing every item in the directory. This is one example of the objects:
```json
{
    "name": "ITEM_NAME_HERE",
    "type": "ITEM_TYPE_HERE",
    "link": {
        "dir": "LINK_FOR_DIR_HERE",
        "file": "LINK_FOR_FILE_HERE"
    }
}
```