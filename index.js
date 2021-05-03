const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
 
const roomRepo = require("./repository/roomRepository");
const roomService = require("./service/roomService");
const app = express();
 
app.use(express.static('./public'));
app.use(bodyParser.json()); 

app.get('/', (req, res)=>{
    const roomsList = repo.readJSONFile();
    
    res.sendFile('./public/html/index.html', {root : __dirname});
});
 

app.post('/check-rates', (req, res)=>{
    const book_info = req.body;
    const rooms = roomService.getAvailableRoomTypes(book_info);
    res.status(200).send({rooms});
}); 
 

app.listen('3000', ()=>{
    console.log('server started at: http://localhost:3000');
});