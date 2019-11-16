# Filer (v4.0.0-internal_beta)
A 'cloud' file-explorer in NodeJS that utilizes the disk-space on the host's machine to transfer or download files from the host machine.

## Note
-   When using this tool! Please note that the connecting device must be the on the same network as the host device. (Host is the one running this tool!)

## Changelog(s) (v4.0.0)
-	Instead of relying on response.write() for writing HTML. The site now uses EJS Templating for the front-end. (More reliable front-end solution)
-	Removed /test endpoint
-	Added a backend API. New endpoint: `/api/directory?d=(directory)`. This endpoint will return a JSON response containing the directory contents.
-	New layout (front-end)
	-	`[X]` - (Attempts to) Open the file in the browser
	-	`[FILE NAME]` - Open the directory (opening a directory on a file will return an error)
	-	`[↓]` - Downloads the file (with the correct name)

## Bugs:
-	Some files (when trying to open) may download the file instead. (Persistent bug!)
-	Some files, when downloading will give a 'NotFound' error!

# Android support! (NEW!)
-   I have added support for Android and no root is needed.
## Installation / Running
-   Install `termux` on your Android device
-   Open `termux` and install necessary packages (`NodeJS` and `git`)
    -   `pkg install nodejs git`
-   Follow the instruction(s) below:
```bash
git clone [GIT_REPO_LINK]
cd ./Filer
npm install # Install all dependencies
node Filer.js

# Example output:
# Listening on: 192.168.0.1:3030
```

# Installation
```bash
git clone [GIT_REPO_LINK]
cd ./Filer
npm install # Install all dependencies
node Filer.js

# Example output:
# Listening on: 192.168.0.1:3030
```
# Memo(s)
## Why make this?
I wanted to create my own knock-off 'cloud' storage. So I created this! Any file placed within the root folder specified will be fully accesible to other devices on the same local network. For example: if I uploaded a .png file to the root folder. My phone can access the item if its on the same network connection as the host (my computer).

## Disclaimer
No warranty is given to the product. The product is "AS IS" and "AS AVAILABLE". The client acknowledges that the developer is not responsible for anything that happens to the client. This specific 'product' is licensed under the `GNU General Public License v3.0` license.