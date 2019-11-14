# Filer (v2)
A 'file-explorer' in NodeJS

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