const fs = require('fs');

module.exports.readJSONFile = ()=>{
    return JSON.parse(fs.readFileSync('rooms.json'))['rooms'];
}

module.exports.writeJSONFile = (content) =>{
    fs.writeFileSync(
        'rooms.json',
        JSON.stringify({rooms : content}, null, 2),
        "utf8",
        err => {if(err)console.log(err);}
    );
}