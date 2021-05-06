var express = require('express');
var router = express.Router();

let roomService = require('../service/roomService');

router.get('/check-rates/:checkIn/:checkOut/:guests', (req, res)=>{
   
    let checkIn = req.params.checkIn;
    let checkOut = req.params.checkOut;
    let guests = req.params.guests;
 
    const rooms = roomService.getAvailableRoomTypes(checkIn, checkOut, guests);
    if(rooms.length > 0)
    {
        res.status(200).send(rooms);
    }
    else
    {
        res.status(404).send(JSON.stringify("No results."));
    }
    
});

router.get('/rooms/:id',(req, res)=>{
    let id = req.params.id;
    const rooms = roomService.getAllRooms();
    let found = false;
    for(let room of rooms)
    {
        if(room.id == id)
        {
            res.status(200).send(room);
            found = true;
        }
    }
    if(!found)
        res.status(404).send('room not found');
});

module.exports = router;      