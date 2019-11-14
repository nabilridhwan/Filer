let network = require('network');
let express = require('express');
let fs = require('fs');
let app = express();

let server_on = null;

let __dir_contents__ = [];

let current_dir = ["/"]

let count = 0;

app.get('/', (request, response) => {

    count++
    current_dir.push("/")

    __getcontents__(__dirname, current_dir)

    setTimeout(() => {
            response.send(__dir_contents__)
    }, 10);
})

app.get('/dir/', (request,response)=>{

    count++

    console.log(current_dir)
    current_dir.push(request.query.d)

    __getcontents__(__dirname + "/" + request.query.d, current_dir);

    setTimeout(() => {
            response.send(__dir_contents__);
    }, 10);
})

app.get('/file/', (request, response) => {
    response.sendFile(__dirname + "/" + request.query.f)
})

// Run on private ip
network.get_private_ip(function (err, ip) {
    app.listen(3000, ip, () => {
        server_on = `${ip}:3000`
        console.log(`Listening on: ${server_on}`)
    })
})


// Function to get contents of d
function __getcontents__(path, current_dir){
    fs.readdir(path, (err, items) => {

        // Empty the dir_contents
        __dir_contents__ = [];

        if(items.length !== 0){
            for(let i = 0; i < items.length; i++){
                fs.readdir("./" + current_dir[count] + "/" + items[i], (err, inner_dir_test) => {

                    // Not a dir items return undefined!
                    if(!inner_dir_test){

                        // NOT A DIR
                        __dir_contents__[i] = {
                            "name": items[i],
                            "type": "file",
                            "get_file_link": `http://${server_on}/file/?f=${current_dir[count]}/${items[i]}`,
                            "warning": "Recursive file viewing is not yet available!"
                        }
                    }else{

                        // IS A DIR
                        __dir_contents__[i] = {
                            "name": items[i],
                            "type": "dir",
                            "get_dir_link": `http://${server_on}/dir/?d=${current_dir[count]}/${items[i]}`
                        }
                    }
                })
            }
        }
    })
}