const gal_img_container = document.getElementById('gallery-img-container');
const leftBtn = document.getElementById('gallery-button-left');
const rightBtn = document.getElementById('gallery-button-right');
const imgWidth = gal_img_container.getBoundingClientRect().width;



let imgs = []
let imgIndex = 0;

async function slide(pixels){
    gal_img_container.style.transform = 'translateX(' + pixels + 'px)';
}


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


console.log(imgs);

for(let img of imgs){
    gal_img_container.appendChild(img.cloneNode(true));
}
 
imgs = document.querySelectorAll('.gallery-img');

rightBtn.addEventListener('click', event =>{
    
    imgIndex++;
    gal_img_container.style.transition = 'transform 0.4s';
        slide(-imgIndex*imgWidth);

    console.log(imgIndex-1, imgIndex);
    if(imgIndex == imgs.length-1)
    {
        imgIndex = 1;
        gal_img_container.style.transition = 'none';
        slide(-imgIndex*imgWidth);
        //gal_img_container.style.transition = 'transform 0.4s';
    }
    
    
});

leftBtn.addEventListener('click', event =>{
    gal_img_container.style.transition = 'transform 0.4s';
    imgIndex--;
    if(imgIndex == -1)imgIndex = imgs.length - 1;
    slide(-imgIndex*imgWidth);
});