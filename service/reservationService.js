let reservationRepo = require('../repository/reservationsRepository');
let uuid = require('uuid');

function getRandomId(){
    let date = new Date();
    return '' + date.getHours() + date.getMinutes() + date.getSeconds();
}

module.exports.addReservation = (info) => {
    const reservations = reservationRepo.readJSONFile();
    let newReservation = info;
 
    newReservation.id = uuid.v4.apply();
    newReservation.publicId = getRandomId();

    reservations.push(newReservation);
    reservationRepo.writeJSONFile(reservations);

    return newReservation.publicId;
}

module.exports.getReservationId = (id, phone)=>{
    const reservations = reservationRepo.readJSONFile();
    for(reservation of reservations)
    {
        if(reservation.publicId == id && reservation.phone == phone)
            return reservation.id;
    }
    return null;
}

module.exports.getReservation = (id)=>{
    const reservations = reservationRepo.readJSONFile();
    for(reservation of reservations)
    {
        if(reservation.id == id)
            return reservation;
    }
    return null;
}

module.exports.removeReservation = (id)=>{
    const reservations = reservationRepo.readJSONFile();
    for(let i = 0;i<reservations.length;++i)
    {
        if(reservations[i].id == id)
        {
            reservations.splice(i, 1);
            reservationRepo.writeJSONFile(reservations);
            return true;
        }
    }
    return false;
}