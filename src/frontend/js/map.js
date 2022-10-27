// const { tileLayer } = require("leaflet");

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bi-search");

closeBtn.addEventListener("click", ()=>{
sidebar.classList.toggle("open");
menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
sidebar.classList.toggle("open");
menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
if(sidebar.classList.contains("open")){
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
}else {
    closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
}
}
// MAPA

var revirarIcon = L.icon({
    iconUrl: '../assets/img/locationrevirar.png',

    iconSize:     [45, 70],
    iconAnchor:   [22, 54],
});

var map = L.map('map').setView([-23.5789808994088, -46.566464301338655], 30);

L.tileLayer('https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=HdZFsisrWXnYbxg8tdAh', {attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',}).addTo(map);

L.Control.geocoder().addTo(map);

const REVIRAR = L.marker([-23.5789808994088, -46.566464301338655], {icon: revirarIcon}).addTo(map).bindPopup("<b>Projeto REVIRAR<br/>Rua Nhengaibas, 356 - Água Rasa");