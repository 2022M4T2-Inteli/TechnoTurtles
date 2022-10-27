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

function buttonNewAss() { //Função que chama pelo onclick no html
    $('#myModal').modal('show'); //Pega o id do modal no html e mostra ele que vem por definição invisivel
}

function fecharModal() {
    $('#myModal').modal('hide');//Pega o id do modal no html e esconde ele
}

const tableBodyy = document.querySelector("#table-body-toalha"); //Cria uma constante da tabela vazia pelo id no html

$.ajax({ //Sintax do AJAX Jquery
    url: "http://127.0.0.1:3081/selecttoalha", // URL definido no endpoint do node(node app_xx.js)
    type: 'GET', // Tipo de requisição do endpoint
    success: data => { // Sucesso do get pega a data do banco de dados
        data.forEach(element => { // pega o tamanho do banco de dados e cria o parametro element
            const tr = document.createElement("tr"); // Criado uma constante para criar na tabela vazia linhas do banco de dados dependendo do tamanho do banco
        tr.innerHTML = `
        <tr>
                <th scope="row">${element.IDToalha}</th> 
                <td>${element.nomeToalha}</td>
                <td>${element.numeroToalha}</td>
                <td><button onclick="editDoacao(${element.IDToalha})" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                  <button onclick="deleteDoacao(${element.IDToalha})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                </td>
        </tr>
        ` // constante. innerHTML é para escrever no HTML (O elemement é o parametro e o que vem depois é o nome de cada coluna do seu banco, nos botoes como parametro da função onclick é passado o id paar identificar de qual ele vai excluir e atualizar)
        tableBodyy.appendChild(tr); //Adiciona um filho na tabela vazia chamando pela primeira constante da tabela vazia
        });
    }
});

function salvarAss() { //Função do botão de salvar chamado pelo onclick do botão dentro do modal do html
    const inputTitulo = document.querySelector("input[name='nomeToalha']").value; //Variaveis criadas para pegar o valor dos inputs do modal (dependendo de quantos inserts vc vai fazer o numero de variaveis no js e inputs no modal do html muda)
    const inputDescricao = document.querySelector("input[name='numeroToalha']").value;


    var settings = { //armazena o endpoint de insert dentro de uma variavel
        "url": "http://127.0.0.1:3081/toalhainsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "nomeToalha": inputTitulo,
            "numeroToalha": inputDescricao,
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
            url: "http://127.0.0.1:3081/toalhadelete",
            data: {IDToalha: id},
        })
}

function enableField(number){ // Função que abilita para editar (No seu curriculo n é necessario colocar isso, mas caso queira entender avisa que eu explico)
    document.getElementById("inputEdit" + number).disabled = false;
}

function disableField(number){ // Função que desabilita para editar (No seu curriculo n é necessario colocar isso, mas caso queira entender avisa que eu explico)
    document.getElementById("inputEdit" + number).disabled = true;
}

function editDoacao(id) { // funçaõ do botão criado no primeiro select do sql
    $.ajax({ //definição dos metodos
        url: "http://127.0.0.1:3081/selecttoalha",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const editarDo = `
                    <div id="myModal`+id+`"class="modal customizar">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content customize">
                            <div class="modal-body">
                            <div class="mb-1" id="teste23">
                            <label for="exampleInputEmail1" class="form-label"></label>Titulo:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(1)" class="form-control" type="text" id="inputEdit1" placeholder="${element.nomeToalha}" value="${element.nomeToalha}"></input>
                            <button onclick="enableField(1)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-2">
                            <label for="exampleInputEmail1" class="form-label"></label>Descrição:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(2)" class="form-control" type="text" id="inputEdit2" placeholder="${element.numeroToalha}" value="${element.numeroToalha}"></input>
                            <button onclick="enableField(2)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            </div>
                            <div class="modal-footer">
                            <button onclick="editVal(${id})" type="button" class="btn btn-primary">Confirmar edição</button>
                            <button onclick="fecharVal(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar edição</button>
                            </div>
                        </div>
                        </div>
                    </div>
    ` //Criação de uma constante com o conteudo para add no html
    if(element.IDToalha == id){ //condição para não criar varios modais
        document.getElementById("modal").innerHTML = editarDo; // pega o id de uma div vazia no html e coloca o modal la
        $('#myModal' + id).modal('show'); // mostra o modal
    }
            });
        }
    });
};

function fecharVal(id) { // função dentro do modal criado de editar
    $('#myModal' + id).modal('hide');// esconde o modal
    $('#myModal' + id).remove(); // remove o modal
};

function editVal(id) {// função de editar no modal criado acima
    var edit1 = document.getElementById('inputEdit1').value; // criar uma variavel para cada campo que deseja que seja alterado, pegando pelo id dos inputs dentro do modal de edição
    var edit2 = document.getElementById('inputEdit2').value;

    $.ajax({ // ajax com metodos do endpoint de update
        type: 'POST',
        url: 'http://127.0.0.1:3081/toalhaupdate',
        data: {IDToalha: id, nomeToalha: edit1, numeroToalha: edit2}, // primeiro vem o nome da coluna do sql e depois o nome do var criado acima
    }).done(function () {
        console.log("aq")
    }).fail(function (msg) {
        //console.log('FAIL');
    }).always(function (msg) {
        //console.log('ALWAYS');
    });
    
    $('#myModal' + id).modal('hide'); // esconde o modal
    $('#myModal' + id).remove(); // remove o modal
};

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