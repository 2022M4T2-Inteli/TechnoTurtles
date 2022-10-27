let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bi-search");
closeBtn.addEventListener("click", ()=> {
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

// MARIANA SCRIPT

for (var i = 0; i < 4; i++) {
    $("#programação-eventos")
        .append(`<div class="cards-programação col-12 col-md-5 m-2">
    <div class="texto-card-programação" >
        <h4>Sexta-Feira 03/06/2022</h4>
        <h5>Brecho Aberto</h5>
        <P>descrição do evento</P>
        <p> Abertura a comunidade | Privado</p>
    </div>
</div>`)
};

for (var i = 0; i < 3; i++) {
    $("#programação-eventos-2")
        .append(`<div class="cards-programação col-12 col-md-5 m-2">
    <div class="texto-card-programação" >
        <h4>Quarta-Feira 20/07/2022</h4>
        <h5>Laboratório de comidas típicas</h5>
        <P>descrição do evento</P>
        <p> Abertura a comunidade | Privado</p>
    </div>
</div>`)
};

// PARCEIROS ADM DANIEL

for (var i = 0; i < 8; i++) {
    $("#listas-cards-adminstrativo")
        .append(`
        <div class="cards-administrativo texto-card-administrativo col-12 col-md-5 m-2">
            <div>
                <h5 class="texto-ajuda ajuda">Nome do parceiro</h5>
            </div>
            <h5>[Nome do responsável]</h5>
            <p>email: exemplo@exemplo.com.br</p>
            <p>telefone: (11) 1111-1111</p>
            <p>mensagem: "Olá, como posso ajudar hoje?"</p>
        </div>
        `)
};

// VOLUNTARIOS ADM DANIEL
for (var i = 0; i < 8; i++) {
    $("#listas-cards-adminstrativo")
        .append(`
        <div class="cards-administrativo texto-card-administrativo col-12 col-md-5 m-2">
            <div>
                <h5 class="texto-ajuda ajuda">Bazar</h5>
            </div>
            <h5>[Nome do voluntário]</h5>
            <p>email: exemplo@exemplo.com.br</p>
            <p>telefone: (11) 1111-1111</p>
            <p>mensagem: "Olá, gostaria de ajudar com o bazar."</p>
        </div>
        `)
};

//teste//

// Getting all necessary elements from DOM.
const elements = {
    monthToReceiveValueBoxes: document.querySelectorAll(".to-receive-values-box"),
    visibilityControlButtons: document.querySelectorAll("#visibility-control-btn"),
}
// Instancing the resfreshVisibleBoxes function.
function refreshVisibleBoxes() {
    // Getting all month to receive boxes elements and setting its display property according to their classes.
    elements.monthToReceiveValueBoxes.forEach(box => {
        if(box.classList.contains("active")) {
            box.children[1].style.display = "flex";
        } else {
            box.children[1].style.display = "none";
        }
    })
}
// Getting all visibility control buttons.
elements.visibilityControlButtons.forEach(button => {
    // Adding a click event listener to all buttons.
    button.addEventListener("click", function() {
        // Controlling the "active" class in the target month to receive box element.
        if(button.parentNode.parentNode.classList.contains("active")) {
            button.parentNode.parentNode.classList.remove("active")
            button.parentNode.children[1].src = "../icons/arrow-down-circle.svg";
        } else {
            button.parentNode.parentNode.classList.add("active");
            button.parentNode.children[1].src = "../icons/arrow-up-circle.svg";
        }
        // Refreshing the visible boxes.
        refreshVisibleBoxes();
    })
})
    




