var express = require('express');
var router = express.Router();

let reservationService = require('../service/reservationService');

router.post('/place-reservation', (req, res)=>{
    console.log(req.body);
    var info  = encodeURIComponent('ewweew');
    // to do 
    // trebuie sa pun check in si check out in room id
    // trebuie sa adaug info in reservation.json
    // trb sa trimit si un id unic care idetifica reservarea
    res.redirect(303, '/confirmation?id='+info);
});

module.exports = router;      