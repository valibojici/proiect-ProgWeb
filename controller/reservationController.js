var express = require('express');
var router = express.Router();

let reservationService = require('../service/reservationService');
let roomService = require('../service/roomService');

router.post('/place-reservation', (req, res)=>{
   
    let reservation = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        phone: req.body.phone,
        roomid: req.body.roomid,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        price: req.body.price
    };

    roomService.addDateToRoom(reservation.roomid, reservation.checkIn, reservation.checkOut);
    let publicId = reservationService.addReservation(reservation);
    // to do 
    // trebuie sa pun check in si check out in room id done

    // trebuie sa adaug info in reservation.json
    // trb sa trimit si un id unic care idetifica reservarea
    res.redirect(303, '/confirmation?id='+publicId);
});

module.exports = router;      