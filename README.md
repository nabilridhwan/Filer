# Filer (v3.2.2)
A 'cloud' file-explorer in NodeJS that utilizes the disk-space on the host's machine to transfer or download files from the host machine.

## Note
-   When using this tool! Please note that the connecting device must be the on the same network as the host device. (Host is the one running this tool!)

## Changelog (v3.2.2)
-	Added support for hosting on servers such as c9 and heroku.
-	Renamed `Filer.js` to `filer.js`
-	Removed welcome.txt
-	Introduced the `/welcome` endpoint (still in the making!)
-	Updated dependencies (added dotenv) for writing custom environment variables (in hopes of using it in the future!)

## Bugs:
-	Some files (when trying to open) may download the file instead. (Persistent bug!)

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