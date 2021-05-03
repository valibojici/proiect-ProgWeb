let roomRepo = require('../repository/roomRepository');
let uuid = require('uuid');

module.exports.getAvailableRoomTypes = (book_info) => {
    const rooms = roomRepo.readJSONFile();
    let checkIn = book_info.checkIn;
    let checkOut = book_info.checkOut;
    let guestNr = book_info.guestNr;
    let availableTypes = [];
    
    for(let room of rooms)
    {
        ok = true;
        console.log(room);
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
                costPerNight: room.costPerNight
            }
            if(availableTypes.find(r => r.type == info.type && r.src == info.src) === undefined)
            {
                availableTypes.push(info);
            }
        }
    }

    return availableTypes;
}
 