const gal_img_container = document.getElementById('gallery-img-container');
const leftBtn = document.getElementById('gallery-button-left');
const rightBtn = document.getElementById('gallery-button-right');
const gal_btns_container = document.getElementById('gallery-buttons-container');
const buttons = document.getElementsByClassName('gallery-circle');

var imgWidth = gal_img_container.getBoundingClientRect().width;

// ca sa fie responsive altfel imaginile nu se misca cat de mult trebuie
window.addEventListener('resize',()=>{    
    imgWidth = gal_img_container.getBoundingClientRect().width;
    gal_img_container.style.transition = 'none';
    gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';
});

var idInterval = setInterval(moveRight,2000);
var idTimeout = null;
var okToStartTimer = false;

let imgs = []
let imgIndex = 1;
let btnIndex = 0;

// adaug fiecare poza in array ul imgs
for(let i = 1;i <= 6; ++i){
    let img = document.createElement('img');
    img.setAttribute('src','../img/photos/photo' + i + '.png');
    img.classList.add('gallery-img');
    imgs.push(img);
}

// iau prima poza si ultima si o pun la final, respctiv inceput
let firstImg = imgs[0];
let lastImg = imgs[imgs.length-1];
imgs.push(firstImg);
imgs.unshift(lastImg);

// pun fiecare poze din imgs in html
for(let img of imgs){
    gal_img_container.appendChild(img.cloneNode(true));
}

// creez si adaug in html cercurile de sub poze
for(let i=0; i<imgs.length - 2; ++i){
    let circle = document.createElement('div');
    circle.classList.add('gallery-circle');
    gal_btns_container.appendChild(circle);
}

// daca dau click pe cerc ma duc la poza si astept 5 sec
for(let button of buttons){
    button.addEventListener('click',()=>{
        clearInterval(idInterval);
        if(idTimeout != null) clearTimeout(idTimeout);
        
        for(let i=0;i<buttons.length;++i){
            if(buttons[i] === button){
                btnIndex = i;
                imgIndex = btnIndex+1; // imgindex incepe practic de la 1
                break;
            }
        }

        for(let btn of buttons){
            btn.classList.remove('gallery-circle-active');
        }
        button.classList.add('gallery-circle-active');

        gal_img_container.style.transition = 'transform 0.3s ease-out';
        gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';

        idTimeout = setTimeout(() => {
            clearInterval(idInterval);
            idInterval = setInterval(moveRight, 2000);
        }, 5000);
    });
}

// setez prima poza ca fiind chiar prima poza
gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';

// setez primul cerc ca fiind activ
buttons[0].classList.add('gallery-circle-active');
 

// poza urmatoare
function moveRight(){
    if(imgIndex < imgs.length - 1){
        imgIndex++;

        btnIndex++;
        if(btnIndex == buttons.length)
            btnIndex = 0;
        
        for(let button of buttons)
            button.classList.remove('gallery-circle-active');
        buttons[btnIndex].classList.add('gallery-circle-active');

    }   
    gal_img_container.style.transition = 'transform 0.3s ease-out';
    gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';
}

// poza anterioara
function moveLeft(){
    if(imgIndex){
        imgIndex--; 
        
        btnIndex--;
        if(btnIndex == -1)
            btnIndex = buttons.length - 1;
        
        for(let button of buttons)
            button.classList.remove('gallery-circle-active');
        buttons[btnIndex].classList.toggle('gallery-circle-active');

        
    }  
    gal_img_container.style.transition = 'transform 0.3s ease-out';
    gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';
}

// cand am ajuns la poza de pe poz 0 sau imgs.length-1 din imgs
// ma duc pe imgs.length-2 sau pe 1
gal_img_container.addEventListener('transitionend', event =>{
    if(imgIndex == 0){
        imgIndex = imgs.length - 2;
        gal_img_container.style.transition = 'none';
        gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';
    }else if(imgIndex == imgs.length - 1){
        imgIndex = 1;
        gal_img_container.style.transition = 'none';
        gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';
    }
})

// functie apelata cand dau click sa schimb poza
function clickMove(direction){
    clearInterval(idInterval);
    
    if(idTimeout != null) clearTimeout(idTimeout);
    
    if(direction == 'left'){
        moveLeft();
    }
    else if (direction == 'right'){
        moveRight();
    }
    
    idTimeout = setTimeout(() => {
        clearInterval(idInterval);
        idInterval = setInterval(moveRight, 2000);
    }, 5000);
}