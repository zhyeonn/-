const $hamburger = document.querySelector('#hamburger');

$hamburger.addEventListener('click',()=>{
  const $menu = document.querySelector('.menu');
  $menu.classList.toggle('active');
})


const $dropbtn = document.querySelectorAll('.dropbtn');

$dropbtn.forEach((button)=>{
  button.addEventListener('mouseover',()=>{
    document.querySelector('.overlay').classList.add('active');
  })
  
})