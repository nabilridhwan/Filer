# Filer (v3.0.0)
A 'cloud' file-explorer in NodeJS that utilizes the disk-space on the host's machine.

## Changelog(s) (v3.0.0):
-   More verbose logging at the console.
-	Visiting the / endpoint will redirect you to the directory endpoint pointing to the root folder.
-	Users can select to OPEN the file (By clicking on a new anchor tag which says the file name or download by clicking the anchor tag which shows the filetype
-	There is now a header (h1) stating the current directory you are in
-	Added temporary styling (font and colours)
-	Now, directory names will display with `./` at the front
-	Removed /info endpoint.
-	Now files are downloaded to the device upon clicking the anchor tag. (Instead of Opening it).
-	Now instead of console.log-ing everything, each log text is pushed to an array which is later logged out by joining the items in the array.
-	Added 'ROOT' directory anchor tag
-	The server will be over HTTP and there is no plans of implementing HTTPS. Implementing HTTPS is up to the user.

## Bugs:
-	Some files (when trying to open) may download the file instead.
-   When passing in the argument for the 'root' folder of the server. Using any other directory than any directory within the project folder will cause it to server to crash upon starting. So: `node index.js C:\Users\username\Downloads` would not work but `node index.js ./` will work as it is at the root folder of the project.

# Setup

## Requirements
-   24/7 Uptime PC (Ideally, because you want access to your files 24/7)
-   Git (To clone the repo)
-   NodeJS (The server is powered by Javascript)
-   npm (To install dependencies)

## Installation
```bash
git clone [GIT_REPO_LINK]
cd ./Filer
npm install # Install all dependencies
node index.js [ROOT_FOLDER] # Refer to example below
# For example: `node index.js ./personal/`
```
## After installing and running...
-   The console will output something like: `Listening on: 127.0.0.1:3000`
-   Head over to the address in any browser
-   The contents of the root folder will appear on the screen!

# Memo(s)
## Why make this?
I wanted to create my own knock-off 'cloud' storage. So I created this! Any file placed within the root folder specified will be fully accesible to other devices on the same local network. For example: if I uploaded a .png file to the root folder. My phone can access the item if its on the same network connection as the host (my computer).

## Disclaimer
No warranty is given to the product. The product is "AS IS" and "AS AVAILABLE". The client acknowledges that the developer is not responsible for anything that happens to the client. This specific 'product' is licensed under the `GNU General Public License v3.0` license.