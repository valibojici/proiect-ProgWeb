const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
 
const roomRepo = require("./repository/roomRepository");
const roomService = require("./service/roomService");
const app = express();
 
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false})); // pt post cu form
app.use(bodyParser.json());
app.use(require('./controller/roomController'));

app.get('/', (req, res)=>{
    res.sendFile('./public/html/index.html', {root : __dirname});
});
 



// app.post('/reservation',(req,res)=>{
//     let info = req.body;
//     console.log(info);
//     res.sendFile('./public/html/reservation.html' ,{root : __dirname});
//     // res.sendStatus(200);
// });

app.listen('3000', ()=>{
    console.log('server started at: http://localhost:3000');
});