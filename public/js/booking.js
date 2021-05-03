 const checkInDate = document.getElementById("check-in");
const checkOutDate = document.getElementById("check-out");
const button = document.getElementById('form-button');
let today = new Date();

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function getDate(date){
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
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
        checkIn : checkInDate.value,
        checkOut: checkOutDate.value,
        guestNr: guests.value
    };
    console.log('click');
    fetch('http://localhost:3000/req', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(info)
    })
    .then((response)=>{
        console.log(response);
    })
});