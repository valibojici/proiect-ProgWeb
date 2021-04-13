const img_container = document.getElementById('gallery-inner-container');
console.log(img_container);
const img_top = document.getElementById('gallery-img-top');
const img_bot = document.getElementById('gallery-img-bottom');
const slide1 = document.getElementById('slide');

img_container.addEventListener('click', event =>{
    img_bot.style.position = 'relative';
    img_top.style.position = 'relative';
    img_top.style.left = (img_top.style.left - 500) + 'px';
    img_bot.style.left = (img_bot.style.left + 500) + 'px';
    console.log(event.target)
});