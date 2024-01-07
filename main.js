const $hamburger = document.querySelector('#hamburger');
const $overlay = document.querySelector('.overlay');
$hamburger.addEventListener('click',()=>{
  const $menu = document.querySelector('.menu');
  $menu.classList.toggle('active');
})


const $dropbtn = document.querySelectorAll('.dropbtn');
const $hiddenmenu = document.querySelectorAll('.hiddenmenu');

$dropbtn.forEach((button, index) => {
  const dropdownContents = $hiddenmenu[index];
  button.addEventListener('mouseenter', () => {
    dropdownContents.style.display = 'flex';
    $overlay.classList.add('active');
  });

  button.addEventListener('mouseleave', () => {
    dropdownContents.style.display = 'none';
    $overlay.classList.remove('active');
  });

  dropdownContents.addEventListener('mouseenter', () => {
    dropdownContents.style.display = 'flex';
    $overlay.classList.add('active');
  });

  dropdownContents.addEventListener('mouseleave', () => {
    dropdownContents.style.display = 'none';
    $overlay.classList.remove('active');
  });
})