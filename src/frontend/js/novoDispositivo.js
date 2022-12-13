// definição da porta do localhost
const PORT = 3000;
const url = `http://localhost:${PORT}`;

// variáveis que recebem os elementos importantes do html
let patrimonio = document.getElementById("patrimonio");
let tipo = document.getElementById("tipo");
let endereco = document.getElementById("endereco");
let status = document.getElementById("status");

// constante que chama a função que faz a conexão com o endpoint no backend
// e adiciona o dispositivo no banco de dados (por meio do endpoint)
const insertDevice = () => {
    let device = {
        patrimonio: patrimonio.value,
        tipo: tipo.value,
        endereco: endereco.value,
        status: status.value
    }
    try {
        axios
            .post(`${url}/device`, device)
            .then((res) => {
                sweetAlert();
            })
            .catch((err) => console.error(err));
    } catch (err) {
        console.error(err);
        alert("Preencha todos os campos");

    }
}

// função que chama o modal
function sweetAlert() {
    Swal.fire(
        'Enviado!',
        'Ativo cadastrado!',
        'success'
    )
}