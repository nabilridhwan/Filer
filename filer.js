const express = require('express');
const fs = require('fs');
const app = express();

// The IP and PORT is stored here
let server_on = "";

// Current directory contents
let __fromdir = process.argv[2]
// set the view engine to ejs
app.set('view engine', 'ejs');
console.log(`From Directory: ${__fromdir}`)

app.get('/', (request, response) => {
    // Redirect to the directory endpoint with query parameter d pointing to root folder
    response.redirect(`/open?path=${__fromdir}&type=directory`)
})

// To get a file
app.get('/open', (request, response) => {

    let path = request.query.path;
    let type = request.query.type;

    if (path.includes(process.argv[2]) === false) {
        response.render("forbidden")
    } else {
        if (type == "directory") {
            __getcontents__(path)
                .then(d => {
                    response.render("index", {
                        __dircontents: d,
                        path: path,
                        step_back_dir: path.split("/").slice(0, path.split("/").length - 1).join("/"),
                        initial_path: __fromdir
                    })
                })
        }
    }

    if (type == "file") {
        response.download(path, (err) => {
            if (err) console.log(err)
        })
    }
})

// Function to get contents of the directory
let __getcontents__ = (path) => {
    return new Promise((resolve, reject) => {

        let contents = []

        // Empty the dir_contents
        // Read the directory for both files and directories
        fs.readdir(path, (err, items) => {
            if (err) console.log(err)

            if (items.length !== 0) {
                items.forEach((item, n) => {
                    get_html_link(path + "/" + item)
                        .then(link => {

                            if (link.includes("type=directory")) {
                                contents.push({
                                    "name": `/${item}`,
                                    "open_html_link": link,
                                    "type": "directory"
                                })
                            } else {
                                contents.push({
                                    "name": `${item}`,
                                    "open_html_link": link,
                                    "type": "file"
                                })
                            }

                            if (contents.length == items.length) resolve(contents)

                        })
                })
            } else {
                resolve(contents)
            }

        })
    })
}

let get_html_link = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (files !== undefined) {
                resolve(`/open?path=${path}&type=directory`)
            } else {
                resolve(`/open?path=${path}&type=file`)
            }
        })
    })
}

// MAIN INITIALISER
if (!process.env.IP || !process.env.PORT) {
    // Listen on the PRIVATE IP and PORT 3030
    app.listen(3030, require('ip').address(), () => {
        server_on = `${require('ip').address()}:3030`
        console.log(`HOSTING LOCALLY: Listening on: http://${server_on} `);

        __getcontents__(__fromdir)
    })
} else {
    // Listen on the process.env.IP and PORT
    server_on = `${process.env.IP}:${process.env.PORT}`
    app.listen(process.env.PORT, () => {
        console.log(`HOSTING OTHER SERVER: Listening on: http://${server_on} `);

        __getcontents__(__fromdir)
    })
}