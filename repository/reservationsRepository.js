const fs = require('fs');

module.exports.readJSONFile = ()=>{
    return JSON.parse(fs.readFileSync('reservations.json'))['reservations'];
}

module.exports.writeJSONFile = (content) =>{
    fs.writeFileSync(
        'reservations.json',
        JSON.stringify({reservations : content}, null, 2),
        "utf8",
        err => {if(err)console.log(err);}
    );
}