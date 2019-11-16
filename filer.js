let express = require('express');
let fs = require('fs');
let app = express();
const dotenv = require('dotenv');
dotenv.config();

// The IP and PORT is stored here
let server_on = "";

// Current directory contents
let __dir_contents__ = [];
let dir_log = ["/"]
let count = 0;

// Log text output
let log_text = [];

// set the view engine to ejs
app.set('view engine', 'ejs');

console.log(`From Directory: ${__dirname}`)

app.use((request, response, next) => {
    // Count is increase because every directory that the user visits is pushed to dir_log, so if the user visited that page for the 39th time, so its current directory is dir_log[count]
    // dir_log[count] is to get the current latest directory, the directory that is pushed is all including its parent(s)
    count++

    if (request.url === "/") {
        dir_log.push("/")
    } else {
        dir_log.push(request.query.d)
    }
    next();
})

app.get('/', (request, response) => {
    // Redirect to the directory endpoint with query parameter d pointing to root folder
    response.redirect("/directory?d=./")
})

// To get items in directory
app.get('/directory', (request, response) => {
    __getcontents__(__dirname + "/" + request.query.d, dir_log);
    setTimeout(() => {
        response.render("index", {
            __dir_contents__: __dir_contents__,
            dir_log: dir_log,
            count: count
        })
    }, 200);
})

// To get a file
app.get('/open_file', (request, response) => {
    let t = request.query.t.toLowerCase();
    if (t == "open") {
        response.sendFile(__dirname + "/" + request.query.f)
    } else if(t == "download") {
        response.download(__dirname + "/" + request.query.f, request.query.f)
    }
})

// API BACKEND
app.get('/api/directory', (request, response) => {
    __getcontents__(__dirname + "/" + request.query.d, dir_log);
    setTimeout(() => {
        response.send(__dir_contents__)
    }, 200);
})

app.get('/welcome', (request, response) => {
    response.render("welcome")
})

// Function to get contents of the directory
function __getcontents__(path, input_dir_history) {

    // Empty the dir_contents
    __dir_contents__ = [];

    // Read the directory for both files and directories
    fs.readdir(path, (err, items) => {

        // If the items found inside is not empty ['file1', 'file2']
        // If the directory is empty, items will be undefined == false

        if (items) {

            // Loop through the items
            for (let i = 0; i < items.length; i++) {

                // C:\Users\nabil\Documents\mailpushserver/storage//personal/images/visualres2.png
                // After /storage/ is input_dir_history
                // The last / is items[i]
                let inner_dir = __dirname + input_dir_history[count] + "/" + items[i];

                // Check if the items inside are files or direcotyr
                fs.readdir(inner_dir, (err, inner_dir_test) => {

                    // Not a dir items return undefined!
                    if (!inner_dir_test) {

                        let filetype = items[i].split(".")[items[i].split(".").length - 1]

                        // NOT A DIR
                        __dir_contents__[i] = {
                            "name": items[i],
                            "type": filetype,
                            "download_html_link": `/open_file?f=${input_dir_history[count]}/${items[i]}&t=download`,
                            "open_html_link": `/open_file?f=${input_dir_history[count]}/${items[i]}&t=open`,
                        }
                    } else {

                        // IS A DIR
                        __dir_contents__[i] = {
                            "name": `./${items[i]}`,
                            "type": "dir",
                            "download_html_link": `/directory?d=${input_dir_history[count]}/${items[i]}`,
                            "open_html_link": `/directory?d=${input_dir_history[count]}/${items[i]}`,
                        }
                    }
                })
            }
        }
    })
}


// MAIN INITIALISER
if (!process.env.IP || !process.env.PORT) {
    // Listen on the PRIVATE IP and PORT 3030
    app.listen(3030, require('ip').address(), () => {
        server_on = `${require('ip').address()}:3030`
        console.log(`HOSTING LOCALLY: Listening on: ${server_on} `);
        __getcontents__(__dirname, dir_log)
    })
} else {
    // Listen on the process.env.IP and PORT
    server_on = `${process.env.IP}:${process.env.PORT}`
    app.listen(process.env.PORT, () => {
        console.log(`HOSTING OTHER SERVER: Listening on: ${server_on} `);
        __getcontents__(__dirname, dir_log)
    })
}