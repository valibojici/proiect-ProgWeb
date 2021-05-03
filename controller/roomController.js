var express = require('express');
var router = express.Router();

let roomService = require('../service/roomService');

router.post('/check-rates', (req, res)=>{
    const book_info = req.body;
    const rooms = roomService.getAvailableRoomTypes(book_info);
    res.status(200).send({rooms});
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