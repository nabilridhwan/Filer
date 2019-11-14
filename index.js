let network = require('network');
let express = require('express');
let fs = require('fs');
let app = express();

let server_on = null;

let __dir_contents__ = [];

app.get('/', (request, response) => {
    __getcontents__(__dirname)
    response.send(__dir_contents__)
})

app.get('/dir/:directory', (request,response)=>{
    __getcontents__(__dirname + "/" + request.params.directory);
    response.send(__dir_contents__);
})

app.get('/file/:filename', (request, response) => {
    response.sendFile(__dirname + "/" + request.params.filename)
})

// Run on private ip
network.get_private_ip(function (err, ip) {
    app.listen(3000, ip, () => {
        server_on = `${ip}:3000`
        console.log(`Listening on: ${server_on}`)
    })
})


// Function to get contents of directory
function __getcontents__(path){
    fs.readdir(path, (err, items) => {

        // Empty
        __dir_contents__ = [];

        if(items.length !== 0){
            for(let i = 0; i < items.length; i++){
                fs.readdir(items[i], (err,inner_dir_test) => {

                    // Not a dir items return undefined!
                    if(inner_dir_test == undefined){

                        // NOT A DIR
                        __dir_contents__[i] = {
                            name: items[i],
                            type: "file",
                            get_file_link: `http://${server_on}/file/${items[i]}`,
                            warning: "Recursive file viewing is not yet available!"
                        }
                    }else{

                        // IS A DIR
                        __dir_contents__[i] = {
                            name: items[i],
                            type: "dir",
                            get_dir_link: `http://${server_on}/dir/${items[i]}`
                        }
                    }
                })
            }
        }
    })
}