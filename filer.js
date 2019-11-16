let express = require('express');
let fs = require('fs');
let app = express();
const dotenv = require('dotenv');
dotenv.config();

// The IP and PORT is stored here
let server_on = `${process.env.IP}:${process.env.PORT}`

// Current directory contents
let __dir_contents__ = [];
let dir_log = ["/"]
let count = 0;

// Log text output
let log_text = [];

// It will take the project folder and search inside "storage" dir

console.log(`From Directory: ${__dirname}`)

app.use((request, response, next) => {

    // Logging!
    log_text.push(`GET: ${request.url}`)
    log_text.push(`Query (d): ${request.query.d}`)
    log_text.push(`Is req url == /?:  ${request.url === "/"}`)
    log_text.push(`Directory log: ${JSON.stringify(dir_log)}`)
    log_text.push(`Current Directory: ${JSON.stringify(dir_log[count])}`)
    log_text.push(`Step Back Directory: ${JSON.stringify(dir_log[count-1])}`)

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

app.get('/directory', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (request.query.d == "./") {
        __getcontents__(__dirname, dir_log)
    } else {
        __getcontents__(__dirname + "/" + request.query.d, dir_log);
    }

    response.write(`
        <head>

            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Filer</title>
            <style>

                @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

                body{
                    color: black;
                    font-family: 'Roboto Mono', monospace;
                }

                a{
                    color:black;
                    background: yellow;
                }

                h1,h2,h3,h4,h5,h6{
                    font-weight: 400;
                }
            </style>
        </head>`)

    response.write(`<h1>${dir_log[count]}</h1>`)
    response.write(`[<a href="/">DIR</a>] /<br>`);

    setTimeout(() => {
        for (let i = 0; i < __dir_contents__.length; i++) {
            response.write(`[<a href="${__dir_contents__[i].download_html_link}">${__dir_contents__[i].type.toUpperCase()}</a>][<a href="/directory?d=${dir_log[count]}/${__dir_contents__[i].name}">DIR</a>] <a href="${__dir_contents__[i].open_html_link}">${__dir_contents__[i].name}</a><br>`);
        }

        // End the response!
        response.end(`${__dir_contents__.length} item(s) found in this directory`);
    }, 200);
})

app.get('/open_file', (request, response) => {
    let t = request.query.t.toUpperCase();

    if (t == "OPEN") {
        response.sendFile(__dirname + "/" + request.query.f)
    } else {
        response.download(__dirname + "/" + request.query.f, request.query.f)
    }
})

app.get('/welcome', (request, response) => {
    response.sendFile(__dirname + "/Public/welcome.txt")
})

if(process.env.IP !== "127.0.0.1"){
    // Listen on the private ip and PORT
    app.listen(process.env.PORT, process.env.IP, () => {
        console.log(`HOSTING ON OTHER SERVER: Listening on: ${server_on} `);
        __getcontents__(__dirname, dir_log)
    })
}else{
    // Listen on the private ip and PORT
    app.listen(process.env.PORT, () => {
        console.log(`HOSTING LOCALLY: Listening on: ${server_on} `);
        __getcontents__(__dirname, dir_log)
    })
}

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
                // After /storage/ is inpput_dir_history
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
                            "full_path": inner_dir,
                            "download_html_link": `/open_file?f=${input_dir_history[count]}/${items[i]}&t=download`,
                            "open_html_link": `/open_file?f=${input_dir_history[count]}/${items[i]}&t=open`,
                            "link": {
                                "dir": null,
                                "file": `/open_file?f=${input_dir_history[count]}/${items[i]}&t=download`,
                                "open": `/open_file?f=${input_dir_history[count]}/${items[i]}&t=open`
                            },
                        }

                        // as you see above, input_dir_history[count] is to get the current latest directory, the directory that is pushed is all including its parent(s)
                    } else {

                        // IS A DIR
                        __dir_contents__[i] = {
                            "name": `./${items[i]}`,
                            "type": "dir",
                            "full_path": inner_dir,
                            "download_html_link": `/directory?d=${input_dir_history[count]}/${items[i]}`,
                            "open_html_link": `/directory?d=${input_dir_history[count]}/${items[i]}`,
                            "link": {
                                "dir": `/directory?d=${input_dir_history[count]}/${items[i]}`,
                                "file": null
                            },
                        }
                        // as you see above, input_dir_history[count] is to get the current latest directory, the directory that is pushed is all including its parent(s)
                    }
                })
            }
        }
    })
}