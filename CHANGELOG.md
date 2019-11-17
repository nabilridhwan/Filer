# v4.0.1
-	Added partials for the EJS files (more consistent changes server-wide for the front-end)
-	The page will display the total number of items found in the current directory (was present in v3).
-	Now, when running the server, a argument is needed to be passed which is the root folder of the server
	-	So, instead of `node filer.js`, it is now `node filer.js ./` or maybe `node filer.js ./files` considering there is a directory called `files` within the server  folder.
-	Updated the welcome page
-	Every page will have a footer anchor tag which displays `View the welcome page`. The welcome page includes tutorial
-   Removed the dotenv dependency

## Bugs:
-	Some files (when trying to open) may download the file instead. (Persistent bug!)
-	Some files, when downloading will give a 'NotFound' error!

# v4.0.0
-	Instead of relying on response.write() for writing HTML. The site now uses EJS Templating for the front-end. (More reliable front-end solution)
-	Removed /test endpoint
-	Added a backend API. New endpoint: `/api/directory?d=(directory)`. This endpoint will return a JSON response containing the directory contents.
-	New layout (front-end)
	-	`[X]` - (Attempts to) Open the file in the browser
	-	`[FILE NAME]` - Open the directory (opening a directory on a file will return an error)
	-	`[↓]` - Downloads the file (with the correct name)
-	Deleted welcome.txt as the /welcome endpoint now serves a proper render of the welcome ejs file
-	Instead of all the EJS files being inside views/pages, it is now stored in the views folder
-	Updated the index page.

# v4.0.0-internal_beta
-	Added EJS Templating. (More reliable loading times)

# v3.3.0
-	Directories with empty contents will no longer crash the server.

# v3.2.2
-   Added support for hosting on servers such as c9 and heroku.
-   Renamed Filer.js to filer.js
-   Removed welcome.txt
-   Introduced the /welcome endpoint (still in the making!)
-   Updated dependencies (added dotenv) for writing custom environment variables (in hopes of using it in the future!)

# v3.2.1
-	Better logging! (Logged correct things at the right time)
-   Replaced `network` dependency with `ip` so that android is supported!	-	Removed a logging statement that logged the Private IP Address that was used in debugging!
-	Removed the version in the html head title. Instead of `Filer v3.0.1`, now is `Filer`

# v3.2.0
-	Added support for android!
-   Replaced `network` dependency with `ip` so that android is supported!
-	Removed the argument that is needed to be given when running the program. So, instead of: `node index.js ./`, its `node index.js` and the default folder that is hosted is the root folder where the index.js file is

# v3.0.1
-   Changes are made to accomodate folders with a lot of files inside.
-	Visiting the / endpoint will redirect you to the directory endpoint pointing to the root folder.	    -   Response is only sent back after 200ms as the server need to get the directory contents first!

# v3.0.0
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
-   Now, downloading the file will download with its file name instead of its endpoint `welcome.txt` instead of `open_file.txt`

# v2.2.0
-   Makeshift User Interface for users to interact with the server.
-	To run, now the user must pass in an argument of the root folder for the server. For example: `node index.js ./personal/`
-	Updated `/info` endpoint with correct display of information
-	Now, the `type` of item is an anchor tag which when clicked is the same as clicking the endpoint link to go to the directory or open the file [UI].
-   Server still runs on HTTP! Please do not store sensitive information within your root folder.

# v2.1.0
-	Now, items are supposed to be placed within the 'storage' folder
-   Changed default port from 3000 to 3030. (Will randomise this in the future)	-   Removed Feature: The first index of the array is now a link which directs to the `root` folder.
-   Now recursive file or directory viewing is enabled through the help of a counter variable.
-   Changed default port from 3000 to 3030. (Will randomise this in the future)
-   Every file's `type` depends in the file extension.
-   Every file or directory has an object `link` which contains both links for the file and dir. If the item is not of type `dir`, the link for the `dir` is `null` and vice-versa.
-   The 'sophisticated' check (for when the item is a directory or a file) is now more better and reliable.
-   The first index of the array is now a link which directs to the `root` folder.

# v2.0.0
-   Now recursive file or directory viewing is enabled through the help of a counter variable.
-   Changed default port from 3000 to 3030. (Will randomise this in the future)
-   Every file's `type` depends in the file extension.
-   Every file or directory has an object `link` which contains both links for the file and dir. If the item is not of type `dir`, the link for the `dir` is `null` and vice-versa.
-   The 'sophisticated' check (for when the item is a directory or a file) is now more better and reliable.
-   The first index of the array is now a link which directs to the `root` folder.

# v0.0.1
-   Initial commit