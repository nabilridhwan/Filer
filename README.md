# Filer
> A 'file-explorer' in NodeJS

# Documentation
> The IP (in this documentation is `127.0.0.1`) may vary from user to user. To know on which IP and Port the server is running from: When you run the NodeJS application, you will get a console.log() output saying: `Listening on: [IP_ADDRESS]:[PORT]`. For example: `Listening on: 127.0.0.1:3000`.


## Flow of Program
`GET HTTP://127.0.0.1:3000/`
-   Get the Private IP of the user (so that the user can access the server from any devices)
-   Read all items (both filenames and directory names) within the folder that the server is ran from.
-   A sophisticated check to check whether the items read are files or directory.
-   Spit it our by returning the response as a JSON to the user.

`GET HTTP://127.0.0.1:3000/file/example.txt`
-   Return the file to the user using .sendFile()

`GET HTTP://127.0.0.1:3000/dir/another_dir`
-   Read all items (both filenames and directory names) inside the directory specified.
-   A sophisticated check to check whether the items read are files or directory.
-   Spit it our by returning the response as a JSON to the user.

## Example Output(s)
`GET HTTP://127.0.0.1:3000/`
-   Gets all the files and directory within the folder where you ran the program from.
```json
[{
    "name": ".git",
    "type": "dir",
    "get_dir_link": "http://127.0.0.1:3000/dir/.git"
}, {
    "name": ".gitignore",
    "type": "file",
    "get_file_link": "http://127.0.0.1:3000/file/.gitignore",
    "warning": "Recursive file viewing is not yet available!"
}, {
    "name": "index.js",
    "type": "file",
    "get_file_link": "http://127.0.0.1:3000/file/index.js",
    "warning": "Recursive file viewing is not yet available!"
}, {
    "name": "node_modules",
    "type": "dir",
    "get_dir_link": "http://127.0.0.1:3000/dir/node_modules"
}, {
    "name": "package-lock.json",
    "type": "file",
    "get_file_link": "http://127.0.0.1:3000/file/package-lock.json",
    "warning": "Recursive file viewing is not yet available!"
}, {
    "name": "README.md",
    "type": "file",
    "get_file_link": "http://127.0.0.1:3000/file/README.md",
    "warning": "Recursive file viewing is not yet available!"
}, {
    "name": "test_dir",
    "type": "dir",
    "get_dir_link": "http://127.0.0.1:3000/dir/test_dir"
}, {
    "name": "test_readme.txt",
    "type": "file",
    "get_file_link": "http://127.0.0.1:3000/file/test_readme.txt",
    "warning": "Recursive file viewing is not yet available!"
}]
```