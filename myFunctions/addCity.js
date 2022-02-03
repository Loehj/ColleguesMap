exports.handler = async function (event, context) {
    //const body = JSON.parse(event.body)
    const fs = require('fs');

    fs.writeFile('cities.txt', "place", err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
}