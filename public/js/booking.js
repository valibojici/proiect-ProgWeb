
const checkInDate = document.getElementById("check-in");
const checkOutDate = document.getElementById("check-out");
const button = document.getElementById('form-button');
const guests = document.getElementById('guests');
const cancelButton = document.getElementById('cancel-button');
const roomTypesContainer = document.getElementById('book-results-container');
const  noResultsContainer = document.getElementById('no-results-container');

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
    noResultsContainer.classList.add('hide');
    
    // sterg rezultatele daca erau de dinainte
    while(roomTypesContainer.lastChild)
    {
        roomTypesContainer.removeChild(roomTypesContainer.lastChild);
    }
 
    fetch('http://localhost:3000/check-rates/' + checkInDate.value + '/' + checkOutDate.value + '/' + guests.value, { method: 'get',})
    .then(response=>{
        if(response.status == 404)
        {
            noResultsContainer.classList.remove('hide');
        }
        else
        if(response.status == 200)
        {
            response.json().then(roomTypes=>{
 
                for(let i=0;i<roomTypes.length;++i)
                { 
                    let priceAmount = getDaysBetween(checkInDate.value, checkOutDate.value) * roomTypes[i].costPerNight;
                    // creez divurile cu rezultatele (ce tipuri de camere sunt disponibile)
    
                    let container = document.createElement('div');
                    container.classList.add('book-results-inner');
    
                    let figure = document.createElement('figure');
                    let img = document.createElement('img');
                    let figcaption = document.createElement('figcaption');
                    img.src = roomTypes[i].src;
                    figcaption.textContent = roomTypes[i].type;
                    figure.appendChild(img);
                    figure.appendChild(figcaption);
    
                    let bookDetails = document.createElement('div');
                    bookDetails.classList.add('book-details');
                    
                    let nights = document.createElement('span');
                    nights.textContent = 'Nights: ' + getDaysBetween(checkInDate.value, checkOutDate.value);
                    
                    let costPerNight = document.createElement('span');
                    costPerNight.textContent = 'Cost per night: ' + roomTypes[i].costPerNight + ' $';
    
                    let maxGuests = document.createElement('span');
                    maxGuests.textContent = 'Max. Guests: ' + roomTypes[i].maxGuests;
    
                    bookDetails.appendChild(nights);
                    bookDetails.appendChild(costPerNight);
                    bookDetails.appendChild(maxGuests);
    
                    let orderButton = document.createElement('div');
                    orderButton.classList.add('order-room-button');
                    orderButton.classList.add('button');
                    orderButton.textContent = 'TOTAL ' + priceAmount + '$';
    
                    container.appendChild(figure);
                    container.appendChild(bookDetails);
                    container.appendChild(orderButton);
    
                    roomTypesContainer.appendChild(container);
    
                    orderButton.addEventListener('click',event=>{
                        localStorage.clear();
                        localStorage.setItem('selectedRoomId', String(roomTypes[i].id));
                        localStorage.setItem('room', String(roomTypes[i].type));
                        localStorage.setItem('guests', String(guests.value));
                        localStorage.setItem('checkIn', String(checkInDate.value));
                        localStorage.setItem('checkOut', String(checkOutDate.value));
                        localStorage.setItem('price', String(priceAmount));
    
                        // sterg rezultatele ca atunci cand dau back sa nu ramana acolo
                        while(roomTypesContainer.lastChild != null)
                        {
                            roomTypesContainer.removeChild(roomTypesContainer.lastChild);
                        }

                        window.location.href = "./reservation.html";
                    });
                }
               
            });
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
        // trimit un get request cu telefonul si id-ul ala random
  
        fetch('/cancel-reservation/' + userInfo.resid + '/' + userInfo.phone, {method: 'get'})
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
                    .then(response=>result.textContent = 'Reservation canceled.');
                });
            }
        });
    }


    
});
