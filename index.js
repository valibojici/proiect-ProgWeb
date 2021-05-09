const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
 
const roomRepo = require("./repository/roomRepository");
const roomService = require("./service/roomService");
const app = express();
 
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false})); // pt post cu form
app.use(bodyParser.json());
app.use(require('./controller/roomController'));
app.use(require('./controller/reservationController'));

app.get('/', (req, res)=>{
    res.sendFile('./public/html/index.html', {root : __dirname});
});


app.listen('3000', ()=>{
    console.log('server started at: http://localhost:3000');
});