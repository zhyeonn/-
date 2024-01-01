const $showDropdown = document.querySelectorAll('.nav_menu ul');
const $nav_dropdown = document.querySelector('.nav_dropdown');
$showDropdown.forEach((a)=>{
  a.addEventListener('mouseover',()=>{
    $nav_dropdown.classList.add('active');
  })
})
$nav_dropdown.addEventListener('mouseleave',()=>{
  $nav_dropdown.classList.remove('active');
})