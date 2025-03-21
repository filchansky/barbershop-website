const menuLinks = document.querySelectorAll(".menu__link");
const menuBtn = document.querySelector(".menu__btn");
const menuList = document.querySelector(".menu__list");
const body = document.body;

function toggleMenu() {
  menuBtn.classList.toggle("active");
  menuList.classList.toggle("active");
}

function lockScroll() {
  menuList.classList.contains("active")
    ? (body.style.overflow = "hidden")
    : (body.style.overflow = "");
}

function unlockScroll() {
  body.style.overflow = "";
}

function hideMenu() {
  menuList.classList.remove("active");
  menuBtn.classList.remove("active");
}

menuBtn.addEventListener("click", toggleMenu);
menuBtn.addEventListener("click", lockScroll);

const sections = document.querySelectorAll("section[data-section-id]"),
  observer = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        var t = e.target.dataset.sectionId,
          t = document.querySelector(`.menu__link[href="#${t}"]`);
        e.isIntersecting
          ? t.classList.add("active")
          : t.classList.remove("active");
      });
    },
    { threshold: 0.5 }
  );

function calculateOffset(e) {
  return window.innerHeight / 2 - e.offsetHeight / 2;
}

sections.forEach((e) => {
  observer.observe(e);
}),
  menuLinks.forEach((e) => {
    e.addEventListener("click", hideMenu),
      e.addEventListener("click", unlockScroll),
      e.addEventListener("click", function (e) {
        e.preventDefault();
        var e = this.getAttribute("href"),
          e = document.querySelector(e),
          t = calculateOffset(e);
        window.scrollTo({
          top: e.getBoundingClientRect().top + window.scrollY - t,
        });
      });
  });

const changeLangLinks = document.querySelectorAll(
    ".change-lang__item-1, .change-lang__item-2"
  ),
  tabItem =
    (changeLangLinks.forEach((e) => {
      e.addEventListener("click", (e) => {
        changeLangLinks.forEach((e) => e.classList.remove("active")),
          e.target.classList.add("active");
      });
    }),
    document.querySelectorAll(".tabs__btn-item")),
  tabContent = document.querySelectorAll(".tabs__content-item");

function open(e) {
  var e = e.currentTarget,
    t = e.dataset.button;
  tabItem.forEach(function (e) {
    e.classList.remove("tabs__btn-item--active");
  }),
    e.classList.add("tabs__btn-item--active"),
    tabContent.forEach(function (e) {
      e.classList.remove("tabs__content-item--active");
    }),
    document.querySelector("#" + t).classList.add("tabs__content-item--active");
}

tabItem.forEach(function (e) {
  e.addEventListener("click", open);
});
