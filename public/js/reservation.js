const room = document.getElementById('room');
const guests = document.getElementById('guests');
const checkIn = document.getElementById('check-in');
const checkOut = document.getElementById('check-out');
const price = document.getElementById('price');

let roomid = window.localStorage.getItem('selectedRoomId')
let submitted = window.localStorage.getItem('submitted');

const button = document.getElementById('confirm-button');
const form = document.getElementsByTagName('form')[0];
const inputs = form.getElementsByTagName('input');

room.textContent = 'Room type: ' + window.localStorage.getItem('room');
guests.textContent = 'Guests: ' + window.localStorage.getItem('guests');
checkIn.textContent = 'Check In: ' + window.localStorage.getItem('checkIn');
checkOut.textContent = 'Check Out: ' + window.localStorage.getItem('checkOut');
price.textContent = 'Price: ' + window.localStorage.getItem('price') + ' $';
 

button.addEventListener('click',event=>{
    if(submitted != null)
    {
        alert('Already confirmed');
        return;
    }

    for(let input of inputs)
    {
        if(input.value == '')
        {
            alert("Please fill in all fields");
            return;
        }
    }

    let temp = {
        roomid: roomid,
        checkIn: window.localStorage.getItem('checkIn'),
        checkOut: window.localStorage.getItem('checkOut'),
        price:  window.localStorage.getItem('price')
    };

    for(field in temp)
    {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = field;
        input.value = temp[field];
        form.appendChild(input);
    }
    submitted = true;
    window.localStorage.setItem('submitted', 'true');

    form.submit();
});
 