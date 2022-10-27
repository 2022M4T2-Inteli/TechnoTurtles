// SCRIPT PAGINA DE DOAÇÃO
// Script Acordeão
var acordeaoDoacao = document.getElementsByClassName("acordeaoDoacao");
var i;
console.log(acordeaoDoacao.length)
for (i = 0; i < acordeaoDoacao.length; i++) {
  acordeaoDoacao[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var painel = this.nextElementSibling;
    if (painel.style.maxHeight) {
      painel.style.maxHeight = null;
    } else {
      painel.style.maxHeight = painel.scrollHeight + "px";
    }
  });
}

// Script Botoes doação
var buttonA = document.getElementById("buttonVinte");
var buttonB = document.getElementById("buttonCinquenta");
var buttonC = document.getElementById("buttonCem");

buttonA.addEventListener("click", function() {
    document.getElementById('valueMoney').value = 20;
    this.classList.toggle("buttontst2");
    buttonB.classList.remove("buttontst2")
    buttonC.classList.remove("buttontst2")
});
buttonB.addEventListener("click", function() {
    document.getElementById('valueMoney').value = 50;
    this.classList.toggle("buttontst2");
    buttonA.classList.remove("buttontst2")
    buttonC.classList.remove("buttontst2")
});
buttonC.addEventListener("click", function() {
    document.getElementById('valueMoney').value = 100;
    this.classList.toggle("buttontst2");
    buttonA.classList.remove("buttontst2")
    buttonB.classList.remove("buttontst2")
});

function inputValue(){
    buttonA.classList.toggle("buttontst3");
    buttonB.classList.toggle("buttontst3");
    buttonC.classList.toggle("buttontst3");
}

// Script Copiar doação
var buttonPix = document.getElementById("buttonPix");
var buttonCaixa = document.getElementById("buttonCaixa");

buttonPix.addEventListener("click", function(e) {
    e.preventDefault();
    navigator.clipboard.writeText("62180252000105");
this.classList.toggle("buttontst2");
this.innerHTML = "Pix Copiado"
setTimeout(function() {
    buttonPix.classList.toggle("buttontst2");
    buttonPix.innerHTML = "Copiar Pix";
}, 1000)
});

buttonCaixa.addEventListener("click", function(e) {
    e.preventDefault();
    navigator.clipboard.writeText("Agência 4050, Conta 2006-9");
this.classList.toggle("buttontst2");
this.innerHTML = "Caixa Copiado"
setTimeout(function() {
    buttonCaixa.classList.toggle("buttontst2");
    buttonCaixa.innerHTML = "Copiar Caixa";
}, 1000)
});
// FIM SCRIPT PAGINA DE DOAÇÃO