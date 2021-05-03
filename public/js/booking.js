const checkInDate = document.getElementById("check-in");
const checkOutDate = document.getElementById("check-out");
const button = document.getElementById('form-button');

const rooms = document.getElementsByClassName('book-results-inner');

let today = new Date();

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function getDate(date){
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
}

function getDaysBetween(date1, date2)
{
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
}

checkInDate.setAttribute('min', getDate(today));
checkInDate.setAttribute('max', getDate(addDays(today,40)));
checkInDate.value = getDate(today);
checkOutDate.value = getDate(addDays(today,1));

checkInDate.addEventListener('change', function(){
    checkOutDate.value = getDate(addDays(new Date(checkInDate.value),1));
})

checkOutDate.addEventListener('click',function(e){
        this.setAttribute('min', getDate(addDays(new Date(checkInDate.value),1)));
        this.setAttribute('max', getDate(addDays(new Date(checkInDate.value),31)));
})

button.addEventListener('click', event=>{
    let info = {
        'checkIn' : checkInDate.value,
        'checkOut': checkOutDate.value,
        'guestNr': guests.value
    };
 
 
    console.log('click');
    fetch('http://localhost:3000/check-rates', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(info)
    })
    .then(response=>response.json())
    .then(response=>{
        let roomTypes = response.rooms;
         
        for(let room of rooms)
        {
           room.classList.add('hide');
        }
        if(roomTypes.length == 0)
        {

        }
        else
        {
            console.log(rooms);

            for(let i=0;i<roomTypes.length;++i)
            {
                rooms[i].classList.remove('hide');
                 
                let img = rooms[i].getElementsByTagName('img')[0];
                let caption = rooms[i].getElementsByTagName('figcaption')[0];
                let maxGuests = rooms[i].getElementsByClassName('max-guests')[0];
                let costPerNight = rooms[i].getElementsByClassName('cost-per-night')[0];
                let nights = rooms[i].getElementsByClassName('nights-nr')[0];
                let bookButton = rooms[i].getElementsByClassName('order-room-button')[0]
                
                

                caption.textContent = roomTypes[i].type;
                img.src = roomTypes[i].src;
                maxGuests.textContent = "Max. Guests: " + roomTypes[i].maxGuests;
                nights.textContent = "Nights: " + getDaysBetween(checkInDate.value, checkOutDate.value);
                costPerNight.textContent = "Cost/Night : " + roomTypes[i].costPerNight + "$";

                // \xA0 = spatiu https://stackoverflow.com/a/14302863
                bookButton.textContent = "TOTAL:\xA0 \xA0" + (getDaysBetween(checkInDate.value, checkOutDate.value) * roomTypes[i].costPerNight) + "$";

                console.log(caption);



                bookButton.addEventListener('click',event=>{

                    localStorage.clear();
                    localStorage.setItem('selectedRoomId', String(roomTypes[i].id));
                    
                    window.location.href = "./reservation.html";
                });

            }
        }
    });
         

});