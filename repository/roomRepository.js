const fs = require('fs');

module.exports.readJSONFile = ()=>{
    return JSON.parse(fs.readFileSync('db.json'))['rooms'];
}

module.exports.writeJSONFile = (content) =>{
    fs.writeFileSync(
        'db.json',
        JSON.stringify({rooms : content}),
        "utf8",
        err => {if(err)console.log(err);}
    );
}