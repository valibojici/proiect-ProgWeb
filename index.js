const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const { request } = require("http");
const repo = require("./repository/roomRepository");
const app = express();
 
app.use(express.static('./public'));

app.get('/', (req, res)=>{
    const roomsList = repo.readJSONFile();
    
    res.sendFile('./public/html/index.html', {root : __dirname});
});
 
app.listen('3000', ()=>{
    console.log('server started at: http://localhost:3000');
});

app.post('http://localhost:3000/req', (req, res)=>{
    const info = req.body;
    console.log(info);
    res.send(200);
}); 
 