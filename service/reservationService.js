let reservationRepo = require('../repository/reservationsRepository');
let uuid = require('uuid');

module.exports.addReservation = (info) => {
    const reservations = reservationRepo.readJSONFile();
    reservations.push(info);
    reservationRepo.writeJSONFile(reservations);
}