# Contents
-   [Installation on Android](#android-support)
-   [Installation on Local/Servers such as c9.io or heroku or on your own local network](#installation-on-other-devices)

# Android support!
## Installation / Running
-   Install `termux` on your Android device
-   Open `termux` and install necessary packages (`NodeJS` and `git`)
    -   `pkg install nodejs git`
-   Follow the instruction(s) below:
```bash
git clone [GIT_REPO_LINK]
cd ./Filer
npm install # Install all dependencies
node filer.js ./

# or any other directory within the server folder, for example node filer.js ./files considering there is a directory called files within the server folder.

# Example output:
# Listening on: 192.168.0.1:3030
```

# Installation (on other devices)
```bash
git clone [GIT_REPO_LINK]
cd ./Filer
npm install # Install all dependencies
node filer.js ./ # or any other directory within the server folder, for example node filer.js ./files considering there is a directory called files within the server folder.

# Example output:
# Listening on: 192.168.0.1:3030
```