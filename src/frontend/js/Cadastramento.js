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

// O script da integração começa

function buttonNewAbo() { //Função que chama pelo onclick no html
    $('#myModal').modal('show'); //Pega o id do modal no html e mostra ele que vem por definição invisivel
}

function fecharModalAbo() {
    $('#myModal').modal('hide');//Pega o id do modal no html e esconde ele
}

const tableBody = document.querySelector("#table-body-cadastramento"); //Cria uma constante da tabela vazia pelo id no html

$.ajax({ //Sintax do AJAX Jquery
    url: "http://127.0.0.1:3094/loginselect2", // URL definido no endpoint do node(node app_xx.js)
    type: 'GET', // Tipo de requisição do endpoint
    success: data => { // Sucesso do get pega a data do banco de dados
        data.forEach(element => { // pega o tamanho do banco de dados e cria o parametro element
            const tr = document.createElement("tr"); // Criado uma constante para criar na tabela vazia linhas do banco de dados dependendo do tamanho do banco
        tr.innerHTML = `
        <tr>
                <th scope="row">${element.IDlogin}</th> 
                <td>${element.email}</td>
                <td>
                  <button onclick="deleteDoacao(${element.IDlogin})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                </td>
        </tr>
        ` // constante. innerHTML é para escrever no HTML (O elemement é o parametro e o que vem depois é o nome de cada coluna do seu banco, nos botoes como parametro da função onclick é passado o id paar identificar de qual ele vai excluir e atualizar)
        tableBody.appendChild(tr); //Adiciona um filho na tabela vazia chamando pela primeira constante da tabela vazia
        });
    }
});

function salvarAssAbo() { //Função do botão de salvar chamado pelo onclick do botão dentro do modal do html
    const email = document.getElementById("email").value; //Variaveis criadas para pegar o valor dos inputs do modal (dependendo de quantos inserts vc vai fazer o numero de variaveis no js e inputs no modal do html muda)
    const senha = document.getElementById("senha").value;


    var settings = { //armazena o endpoint de insert dentro de uma variavel
        "url": "http://127.0.0.1:3094/logininsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "email": email,
            "senha": senha,
        }
      }; // URL do endpoint inserir e method do mesmo endpoint, a data é oq voce esta inserindo na tabela (primeiro vai o namo da coluna do sql em seguida o nome da variael criado acima), notar que o id não precisa de input pois ele gera sozinho
      
      $.ajax(settings); // Da um ajax na variavel settings com os dados endpoint "armazenado" nela
}

function deleteDoacao(id) { // função do botão criado no select do primeiro ajax chamado pela função onclick
    const div = document.createElement("div"); //cria uma div para criar um elemento div no html
    div.innerHTML = `
    <div id="myModal`+ id +`"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <p>Tem certeza que deseja excluir a toalha com ID ${id}?</p>
            </div>
            <div class="modal-footer">
            <button onclick="deletedoc(${id})" type="button" class="btn btn-primary">Confirmar exclusão</button>
            <button onclick="fecharModall(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar exclusão</button>
            </div>
        </div>
        </div>
    </div>
    ` //define oq vai ser criado (modal), nota se que estamos passando o parametro id em quase toda a função (esse id é o q esta pegando da função do botao do insert, o paramento element.ID...)
    document.body.appendChild(div); // adiciona a constante div no body do html
    $('#myModal' + id).modal('show'); // mostra o modal
};

function fecharModall(id) { // função do modal criado agr do delete (sempre chamando o parametro id)
    $('#myModal' + id).modal('hide'); // esconde o modal
    $('#myModal' + id).remove(); // remove o modal
};

function deletedoc(id) { // função dentro do modal de confirmar exclusão
        $.ajax({ // ajax com metodos do endpoint
            type: 'POST',
            url: "http://127.0.0.1:3094/logindelete",
            data: {IDlogin: id},
        })
}

function searchFilter() { //Função para filtrar os valores atraves de pesquisa (não é pedido que coloque no seu curriculo, mas caso queira me avisa que eu te explico)
    var input, filter, table, tr, td, i, txtValue;
  
    input = document.getElementById("inputSearchID");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }