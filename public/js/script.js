const menuLinks = document.querySelectorAll('.menu__link');
const menuBtn = document.querySelector('.menu__btn');
const menuList = document.querySelector('.menu__list');
const body = document.body;

function toggleMenu() {
  menuBtn.classList.toggle('active');
  menuList.classList.toggle('active');
}
menuBtn.addEventListener('click', toggleMenu);


function lockScroll() {
  if (menuList.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}
menuBtn.addEventListener('click', lockScroll);


function unlockScroll() {
  document.body.style.overflow = '';
}


function hideMenu() {
  menuList.classList.remove('active');
  menuBtn.classList.remove('active');
}


const sections = document.querySelectorAll('section[data-section-id]');
const observer = new IntersectionObserver(entries => {
 entries.forEach(entry => {
  const sectionId = entry.target.dataset.sectionId;
  const link = document.querySelector(`.menu__link[href="#${sectionId}"]`);
  
  if (entry.isIntersecting) {
   link.classList.add('active');
  } else {
   link.classList.remove('active');
  }
 });
}, {
  threshold: 0.5
})

sections.forEach(section => {
 observer.observe(section);
});


function calculateOffset(targetElement) {
  return (window.innerHeight / 2) - (targetElement.offsetHeight / 2);
}


menuLinks.forEach(link => {
  link.addEventListener('click', hideMenu);
  link.addEventListener('click', unlockScroll);
  link.addEventListener('click', function(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const offset = calculateOffset(targetElement);
    
    window.scrollTo({
      top: targetElement.getBoundingClientRect().top + window.scrollY - offset
    });
  });
});


const changeLangLinks = document.querySelectorAll('.change-lang__item-1, .change-lang__item-2');

changeLangLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    changeLangLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active'); 
  });
});
 

const tabItem = document.querySelectorAll('.tabs__btn-item');
const tabContent = document.querySelectorAll('.tabs__content-item');

tabItem.forEach(function(element) {
  element.addEventListener('click', open);  
});


function open(evt) {
  const tabTarget = evt.currentTarget;
  const button = tabTarget.dataset.button;
  
  tabItem.forEach(function(item) {
    item.classList.remove('tabs__btn-item--active');    
  });

  tabTarget.classList.add('tabs__btn-item--active');

  tabContent.forEach(function(item) {
    item.classList.remove('tabs__content-item--active');
  });
  document.querySelector(`#${button}`).classList.add('tabs__content-item--active');
}