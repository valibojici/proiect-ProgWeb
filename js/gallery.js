const gal_img_container = document.getElementById('gallery-img-container');
const leftBtn = document.getElementById('gallery-button-left');
const rightBtn = document.getElementById('gallery-button-right');
const imgWidth = gal_img_container.getBoundingClientRect().width;

const gal_btns_container = document.getElementById('gallery-buttons-container');
const buttons = document.getElementsByClassName('gallery-circle');

var idInterval = setInterval(moveRight,2000);
var idTimeout = null;
var okToStartTimer = false;

let imgs = []
let imgIndex = 1;
let btnIndex = 0;

for(let i = 1;i <= 6; ++i){
    let img = document.createElement('img');
    img.setAttribute('src','../img/photos/photo' + i + '.png');
    img.classList.add('gallery-img');

    imgs.push(img);
}

let firstImg = imgs[0];
let lastImg = imgs[imgs.length-1];
imgs.push(firstImg);
imgs.unshift(lastImg);


for(let img of imgs){
    gal_img_container.appendChild(img.cloneNode(true));
}

for(let i=0; i<imgs.length - 2; ++i){
    let circle = document.createElement('div');
    circle.classList.add('gallery-circle');
    gal_btns_container.appendChild(circle);
}

gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';
buttons[0].classList.toggle('gallery-circle-active');

function moveRight(){
    if(imgIndex < imgs.length - 1){
        imgIndex++;

        btnIndex++;
        if(btnIndex == buttons.length)
            btnIndex = 0;
        
        for(let button of buttons)
            button.classList.remove('gallery-circle-active');
        buttons[btnIndex].classList.toggle('gallery-circle-active');

    }
        
    gal_img_container.style.transition = 'transform 0.3s ease-out';
    gal_img_container.style.transform = 'translateX(' + (-imgIndex * imgWidth) + 'px)';
}

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