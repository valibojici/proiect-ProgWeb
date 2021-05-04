let roomRepo = require('../repository/roomRepository');
let uuid = require('uuid');
const { checkout } = require('../controller/reservationController');

module.exports.getAvailableRoomTypes = (book_info) => {
    const rooms = roomRepo.readJSONFile();
    let checkIn = book_info.checkIn;
    let checkOut = book_info.checkOut;
    let guestNr = book_info.guestNr;
    let availableTypes = [];
    
    for(let room of rooms)
    {
        ok = true;
        for(info of room.bookInfo)
        {
            if(checkIn >= info.checkIn && checkIn <= info.checkOut)
                ok = false;
            if(checkOut >= info.checkIn && checkOut <= info.checkOut)
                ok = false;
        }
        
        if(room.maxGuests < guestNr)ok = false;

        if(ok)
        {
            let info = {
                type: room.type,
                src: room.src,
                maxGuests: room.maxGuests,
                costPerNight: room.costPerNight,
                id: room.id
            }
            if(availableTypes.find(r => r.type == info.type && r.src == info.src) === undefined)    // pun doar un singur tip de camera in availableTypes
            {
                availableTypes.push(info);
            }
        }
    }

    return availableTypes;
}

module.exports.getAllRooms = ()=>{
    const rooms = roomRepo.readJSONFile();
    return rooms;
}

module.exports.addDateToRoom = (roomId, checkIn, checkOut)=>{
    // adaug checkin si checkout la camera cu id-ul roomId

    const rooms = roomRepo.readJSONFile();
    console.log(roomId);

    for(let i = 0;i < rooms.length;++i)
    {
        if(rooms[i].id == roomId)
        {
            console.log('gasit camera');
            let dates = {
                checkIn: checkIn,
                checkOut: checkOut
            }
            rooms[i].bookInfo.push(dates);

            roomRepo.writeJSONFile(rooms);
            return;
        }
    }
}
 