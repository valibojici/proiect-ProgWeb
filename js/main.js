const checkInDate = document.getElementById("check-in");
const checkOutDate = document.getElementById("check-out");

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function getDate(date){
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
}

let today = new Date();
let minDay = getDate(today);
let maxDay = getDate(addDays(today, 60));
console.log(today);

checkInDate.setAttribute('min', minDay);
checkInDate.setAttribute('max', maxDay);

checkInDate.addEventListener('focusout', function(){
    checkOutDate.value = getDate(addDays(new Date(this.value),1));
})

checkOutDate.addEventListener('click',function(e){
    let minDay = checkInDate.value;
    if(minDay)
    {
        this.setAttribute('min', getDate(addDays(new Date(minDay),1)));
        this.setAttribute('max', getDate(addDays(new Date(minDay),61)));
    }
})