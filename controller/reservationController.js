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
     
    res.redirect(303, '/confirmation?id='+publicId);
});

router.get('/cancel-reservation/:id/:phone',(req,res)=>{
    let publicId = req.params.id;
    let phone = req.params.phone;
 
    let id = reservationService.getReservationId(publicId, phone);
     
    if(id == null)
    {
        res.status(404).send({msg : 'Reservation not found.'});
    }
    else
    {
        res.status(200).send({msg : id});
    }
});

router.delete('/reservation/:id',(req,res)=>{
    
    let reservation = reservationService.getReservation(req.params.id);
    let ok = reservationService.removeReservation(req.params.id);
    
    if(ok)
    {
        roomService.removeDate(reservation.roomid, reservation.checkIn, reservation.checkOut);
        res.status(200).send({msg: 'Reservation deleted.'});
    }
    else
    {
        res.status(404).send({msg: 'Reservation not found.'});
    }
});


router.get('/confirmation', (req,res)=>{
    res.sendFile('public/html/confirmation.html', {root : './'});
});

module.exports = router;      