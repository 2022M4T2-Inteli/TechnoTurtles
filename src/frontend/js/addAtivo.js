const PORT = 3000;
const url = `http://localhost:${PORT}`;

//add new device
let patrimonio = document.getElementById("patrimonio");
let tipo = document.getElementById("tipo");
let endereco = document.getElementById("endereco");
let status = document.getElementById("status");


const insertDevice = () => {
    let device = {
        patrimonio: patrimonio.value,
        tipo: tipo.value,
        endereco: endereco.value,
        status: status.value
    }
    try{
        axios
            .post(`${url}/device`, device)
            .then((res) => {
                alert("Dispositivo cadastrado com sucesso");
            })
            .catch((err) => console.error(err));
    }catch(err){
        console.error(err);
        alert("Preencha todos os campos");

    }
}