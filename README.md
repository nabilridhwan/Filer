# Filer (v2.2.0)
A 'cloud' file-explorer in NodeJS that utilizes the disk-space on the host's machine.

# Usage

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

# Changelogs (v2.2.0)
-   Makeshift User Interface for users to interact with the server.
-	To run, now the user must pass in an argument of the root folder for the server. For example: `node index.js ./personal/`
-	Updated `/info` endpoint with correct display of information
-	Now, the `type` of item is an anchor tag which when clicked is the same as clicking the endpoint link to go to the directory or open the file [UI].
-   Server still runs on HTTP! Please do not store sensitive information within your root folder.

# Memo(s)
## Why make this?
I wanted to create my own knock-off 'cloud' storage. So I created this! Any file placed within the root folder specified will be fully accesible to other devices on the same local network. For example: if I uploaded a .png file to the root folder. My phone can access the item if its on the same network connection as the host (my computer).

## Disclaimer
No warranty is given to the product. The product is "AS IS" and "AS AVAILABLE". The client acknowledges that the developer is not responsible for anything that happens to the client. This specific 'product' is licensed under the `GNU General Public License v3.0` license.