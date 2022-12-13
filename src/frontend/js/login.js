function auth() {
    var user = document.getElementById('userLogin').value;
    var senha = document.getElementById('senhaLogin').value;

    if(user=="administrador" && senha=="123456789"){
        window.location.href = "/info.html";
    }
    else{
        alert("Usuário ou senha incorretos")
    }
}