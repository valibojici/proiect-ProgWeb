let reservationRepo = require('../repository/reservationsRepository');
let uuid = require('uuid');

function getRandomId(reservations){
    let id;
    let foundSameId = true;
    while(foundSameId)
    {
        // genereaza nr random cu 6 cifre
        id = Math.floor(Math.random()*900000) + 100000;

        foundSameId = false;
        for(reservation of reservations)
            if(reservation.publicId == id)
            {
                foundSameId = true;
                break;
            }
    }
    return id;
}

module.exports.addReservation = (info) => {
    const reservations = reservationRepo.readJSONFile();
    let newReservation = info;
 
    newReservation.id = uuid.v4.apply();
    newReservation.publicId = getRandomId(reservations);

    reservations.push(newReservation);
    reservationRepo.writeJSONFile(reservations);

    return newReservation.publicId;
}