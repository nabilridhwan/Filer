let network = require('network');
let express = require('express');
let fs = require('fs');
let app = express();

const port = 3030;

// The IP and PORT is stored here
let server_on = null;

// Current directory contents
let __dir_contents__ = [];
let dir_log = ["/"]
let count = 0;

// It will take the project folder and search inside "storage" dir
let __from_dir = __dirname + "/storage"

app.use((request, response, next) => {

    // Count is increase because every directory that the user visits is pushed to dir_log, so if the user visited that page for the 39th time, so its current directory is dir_log[count]

    // dir_log[count] is to get the current latest directory, the directory that is pushed is all including its parent(s)
    count++

    // For GET root
    if (request.url == "/") {

        // Push '/'
        dir_log.push("/")
    } else {

        // Push the directory query (d)
        dir_log.push(request.query.d)
    }

    console.log(dir_log)
    next();
})

app.get('/', (request, response) => {
    __getcontents__(__from_dir, dir_log)
    setTimeout(() => {
        response.send(__dir_contents__)
    }, 5);
})

app.get('/dir/', (request, response) => {
    __getcontents__(__from_dir + "/" + request.query.d, dir_log);
    setTimeout(() => {
        response.send(__dir_contents__);
    }, 5);
})

app.get('/file/', (request, response) => {
    response.sendFile(__from_dir + "/" + request.query.f)
})

// Run on PRIVATE IP
network.get_private_ip(function (err, ip) {

    // Listen
    app.listen(port, ip, () => {
        server_on = `${ip}:${port}`
        console.log(`Listening on: ${server_on}`)
    })
})


// Function to get contents of the directory
function __getcontents__(path, input_dir_history) {

    // Empty the dir_contents
    __dir_contents__ = [];

    // __dir_contents__[0] = {
    //     "name": "ROOT",
    //     "type": "dir",
    //     "link": {
    //         "dir": `http://${server_on}/`,
    //         "file": null
    //     },
    // }

    // Read the directory for both files and directories
    fs.readdir(path, (err, items) => {

        console.log(items.length)

        // If the items found inside is not empty ['file1', 'file2']
        if (items.length > 0) {

            // Loop through the items
            for (let i = 0; i < items.length; i++) {

                // Check if the items inside are files or direcotyr
                fs.readdir("./" + input_dir_history[count] + "/" + items[i], (err, inner_dir_test) => {

                    // Not a dir items return undefined!
                    if (inner_dir_test == undefined) {

                        let filetype = items[i].split(".")[items[i].split(".").length - 1]

                        // NOT A DIR
                        __dir_contents__[i] = {
                            "name": items[i],
                            "type": filetype,
                            "link": {
                                "dir": null,
                                "file": `http://${server_on}/file/?f=${input_dir_history[count]}/${items[i]}`
                            },
                        }

                        // as you see above, input_dir_history[count] is to get the current latest directory, the directory that is pushed is all including its parent(s)
                    } else {

                        // IS A DIR
                        __dir_contents__[i] = {
                            "name": items[i],
                            "type": "dir",
                            "link": {
                                "dir": `http://${server_on}/dir/?d=${input_dir_history[count]}/${items[i]}`,
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