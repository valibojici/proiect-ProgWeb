
const checkInDate = document.getElementById("check-in");
const checkOutDate = document.getElementById("check-out");
const button = document.getElementById('form-button');
const guests = document.getElementById('guests');
const rooms = document.getElementsByClassName('book-results-inner');
const cancelButton = document.getElementById('cancel-button');


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
        let noResultsContainer = document.getElementById('no-results-container');
         
        for(let room of rooms)
        {
           room.classList.add('hide');
        }
        noResultsContainer.classList.add('hide');

        if(roomTypes.length == 0)
        {
            noResultsContainer.classList.remove('hide');
        }
        else
        {
            for(let i=0;i<roomTypes.length;++i)
            {
                rooms[i].classList.remove('hide');
                 
                let img = rooms[i].getElementsByTagName('img')[0];
                let caption = rooms[i].getElementsByTagName('figcaption')[0];
                let maxGuests = rooms[i].getElementsByClassName('max-guests')[0];
                let costPerNight = rooms[i].getElementsByClassName('cost-per-night')[0];
                let nights = rooms[i].getElementsByClassName('nights-nr')[0];
                let bookButton = rooms[i].getElementsByClassName('order-room-button')[0]
                
                let price = getDaysBetween(checkInDate.value, checkOutDate.value) * roomTypes[i].costPerNight

                caption.textContent = roomTypes[i].type;
                img.src = roomTypes[i].src;
                maxGuests.textContent = "Max. Guests: " + roomTypes[i].maxGuests;
                nights.textContent = "Nights: " + getDaysBetween(checkInDate.value, checkOutDate.value);
                costPerNight.textContent = "Cost/Night : " + roomTypes[i].costPerNight + "$";

                // \xA0 = spatiu https://stackoverflow.com/a/14302863
                bookButton.textContent = "TOTAL:\xA0 \xA0" + price + "$";

                console.log(caption);



                bookButton.addEventListener('click',event=>{

                    localStorage.clear();
                    localStorage.setItem('selectedRoomId', String(roomTypes[i].id));
                    localStorage.setItem('room', String(roomTypes[i].type));
                    localStorage.setItem('guests', String(guests.value));
                    localStorage.setItem('checkIn', String(checkInDate.value));
                    localStorage.setItem('checkOut', String(checkOutDate.value));
                    localStorage.setItem('price', String(price));
                    window.location.replace("./reservation.html");
                });

            }
        }
    });
         

});

cancelButton.addEventListener('click',event=>{
    let phone = document.getElementById('phone');
    let resid = document.getElementById('res-id');
    let result = document.getElementById('cancel-result');

    let userInfo = {
        phone: phone.value,
        resid: resid.value
    };

    result.classList.remove('hide');
    if(userInfo.phone == '' || userInfo.resid == '')
    {
        result.textContent = 'Please enter the information.'
    }
    else{
        let p = encodeURIComponent(String(userInfo.phone));
        let r = encodeURIComponent(String(userInfo.resid));
        // trimit un get request cu telefonul si id-ul acela cu 6 cifre
        fetch('/cancel-reservation?phone='+p+'&id='+r, {method: 'get'})
        .then(response=>{
            if(response.status == 404)
            {
                result.textContent = 'Reservation not found.';
            }
            else
            if(response.status == 200)
            {
               
                // daca e ok primesc id-ul rezervarii (uuid) si sterg rezervarea
                response.json().then(response=>{
                    // console.log(data.id);
                    fetch('/reservation/'+response.msg, {method: 'delete'})
                    .then(response=>response.json()).then(response=>{
                        result.textContent = response.msg;
                    });
                });
            }
        });
    }


    
});
