$(document).ready(function(){
        
    $("#header").load("menu.html", function() {
        $("#btn").on('click', showmenu);
    });

});

function showmenu(){
    nav.classList.toggle('active');
}

//MENU HAMBURGUER
const btn = document.getElementById('btn')

function menu(event){
    if (event.type == 'touchstart') event.preventDefault()
    const btn = document.getElementById('nav');
    nav.classList.toggle('active');
}

btn.addEventListener('click', menu);
btn.addEventListener('touchstart', menu);


function startNumberCounter() {

    //CONTAGEM NUMEROS HOME
    const animation = document.querySelectorAll(".animation-css-home");

    animation.forEach((animationHome) => {
        animationHome.innerText = '0';

        const updateCounter = () => {
            const target = +animationHome.getAttribute('data-target');
            const c = +animationHome.innerText;

            const increment = target / 600;

            if(c < target){
                animationHome.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 10);
            }else{
                animationHome.innerText = target;
            }
        };
        updateCounter();
    });
}

let counted = false;

document.addEventListener("scroll", function() {
    let lastKnownScrollPosition = window.scrollY;

    if(lastKnownScrollPosition >= 3170 && !counted) {
        console.log(lastKnownScrollPosition);
        startNumberCounter();
        counted = true;
    } 
})