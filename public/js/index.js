//navbar burger js
//grab elements
const navburger = document.querySelector(".navbar-burger");
//toggle active
function togNav() {
    var nav = document.getElementById("navbar-mobile");
    nav.classList.toggle('is-active');
};
navburger.addEventListener("click", togNav);


//grab button
const styleSearch = document.querySelector("#styleNav");
//toggle hidden
function togStyle() {
    let dropDown = document.querySelector(".navbar-dropdown");

    dropDown.classList.toggle('is-hidden');
};
styleSearch.addEventListener("click", togStyle);