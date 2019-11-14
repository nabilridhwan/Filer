# Filer (v2.1.0)
A 'file-explorer' in NodeJS

## Note
-   To get files or directories to show up, please ensure that you place all your folders in the `storage` folder.
-   This app is served over HTTP (Not encrypted!). DO NOT STORE SENSITIVE DATA ON THE `storage` FOLDER.

## Changelogs
-	Now, items are supposed to be placed within the 'storage' folder
-   Removed Feature: The first index of the array is now a link which directs to the `root` folder.

# Documentation
> The IP (in this documentation is `127.0.0.1`) may vary from user to user. To know on which IP and Port the server is running from: When you run the NodeJS application, you will get a console.log() output saying: `Listening on: [IP_ADDRESS]:[PORT]`. For example: `Listening on: 127.0.0.1:3000`.

## `GET` request output
If a `GET` request is made to one of the enpoints, the server will return back with an array of objects containing every item in the directory. This is one example of the objects:
```json
{
    "name": ITEM_NAME_HERE,
    "type": ITEM_TYPE_HERE,
    "link": {
        "dir": LINK_FOR_DIR_HERE,
        "file": LINK_FOR_FILE_HERE
    }
}
```