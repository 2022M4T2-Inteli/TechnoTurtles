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

function fecharModalFreq() {
    $('#myModal').modal('hide');//Pega o id do modal no html e esconde ele
}

const tableBodyy = document.querySelector("#table-body-frequencia"); //Cria uma constante da tabela vazia pelo id no html

$.ajax({ //Sintax do AJAX Jquery
    url: "http://127.0.0.1:3081/fichafrequenciaselect", // URL definido no endpoint do node(node app_xx.js)
    type: 'GET', // Tipo de requisição do endpoint
    success: data => {// Sucesso do get pega a data do banco de dados
        data.data.forEach(element => { // pega o tamanho do banco de dados e cria o parametro element
            const tr = document.createElement("tr"); // Criado uma constante para criar na tabela vazia linhas do banco de dados dependendo do tamanho do banco
        tr.innerHTML = `
        <tr>
                <th scope="row">${element.IDFrequencia}</th> 
                <td>${element.dataFreq}</td>
                <td>${element.horarioFreq}</td>
                <td>${element.nomeFreq}</td>
                <td><button onclick="viewCadastro(${element.IDFrequencia})" class="buttonView"><i class="bi bi-eye-fill"></i></button>
                    <button onclick="editDoacao(${element.IDFrequencia})" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                    <button onclick="deleteDoacao(${element.IDFrequencia})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                </td>
        </tr>
        ` // constante. innerHTML é para escrever no HTML (O elemement é o parametro e o que vem depois é o nome de cada coluna do seu banco, nos botoes como parametro da função onclick é passado o id paar identificar de qual ele vai excluir e atualizar)
        tableBodyy.appendChild(tr); //Adiciona um filho na tabela vazia chamando pela primeira constante da tabela vazia
        });
    }
});

function salvarAssFreq() { //Função do botão de salvar chamado pelo onclick do botão dentro do modal do html

    //Variaveis criadas para pegar o valor dos inputs do modal (dependendo de quantos inserts vc vai fazer o numero de variaveis no js e inputs no modal do html muda)
    const dataFreq = document.getElementById("dataFreq").value;
    const horarioFreq = document.getElementById("horarioFreq").value;
    const nomeFreq = document.getElementById("nomeFreq").value;
    const banhoFreq = document.getElementById("banhoFreq").value;
    const lancheFreq = document.getElementById("lancheFreq").value;
    const roupaFreq = document.getElementById("roupaFreq").value;


    var settings = { //armazena o endpoint de insert dentro de uma variavel
        "url": "http://127.0.0.1:3081/fichafrequenciainsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "dataFreq": dataFreq,
            "horarioFreq": horarioFreq,
            "nomeFreq": nomeFreq,
            "banhoFreq": banhoFreq,
            "lancheFreq": lancheFreq,
            "roupaFreq": roupaFreq,
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
            url: "http://127.0.0.1:3081/fichafrequenciadelete",
            data: {IDFrequencia: id},
        })
}

function enableField(number){ // Função que abilita para editar (No seu curriculo n é necessario colocar isso, mas caso queira entender avisa que eu explico)
    document.getElementById("inputEdit" + number).disabled = false;
}

function disableField(number){ // Função que desabilita para editar (No seu curriculo n é necessario colocar isso, mas caso queira entender avisa que eu explico)
    document.getElementById("inputEdit" + number).disabled = true;
}

function editDoacao(id) {
    console.log(id);
    $.ajax({
        url: "http://127.0.0.1:3081/fichafrequenciaselect",
        type: 'GET',
        success: data => {
            data.data.forEach(element => {
                var editarDo = `
                    <div id="myModal`+id+`"class="modal customizar">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content customize">
                            <div class="modal-body">
                            <div class="mb-1" id="teste23">
                            <label for="exampleInputEmail1" class="form-label"></label>Nome:

                            <div id="displaytt">
                                <input disabled onfocusout="disableField(1)" class="form-control" type="text" id="inputEdit1" placeholder="${element.nomeFreq}" value="${element.nomeFreq}"></input>
                                <button onclick="enableField(1)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>

                            </div>
                            <div class="mb-2">
                            <label for="exampleInputEmail1" class="form-label"></label>Data:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(2)" class="form-control" type="text" id="inputEdit2" placeholder="${element.dataFreq}" value="${element.dataFreq}"></input>
                            <button onclick="enableField(2)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label"></label>Horário:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(3)" class="form-control" type="text" id="inputEdit3" placeholder="${element.horarioFreq}" value="${element.horarioFreq}"></input>
                            <button onclick="enableField(3)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-4">
                            <label for="exampleInputEmail1" class="form-label"></label>Banho:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(4)" class="form-control" type="text" id="inputEdit4" placeholder="${element.banhoFreq}" value="${element.banhoFreq}"></input>
                            <button onclick="enableField(4)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-4">
                            <label for="exampleInputEmail1" class="form-label"></label>Lanche:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(5)" class="form-control" type="text" id="inputEdit5" placeholder="${element.lancheFreq}" value="${element.lancheFreq}"></input>
                            <button onclick="enableField(5)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-6">
                            <label for="exampleInputEmail1" class="form-label"></label>Roupa:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(6)" class="form-control" type="text" id="inputEdit6" placeholder="${element.roupaFreq}" value="${element.roupaFreq}"></input>
                            <button onclick="enableField(6)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
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
                    `
    if(element.IDFrequencia == id){
        document.getElementById("modalFrequencia").innerHTML = editarDo;
        $('#myModal' + id).modal('show');
    }
            });
        }
    });
};

function fecharVal(id) {
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
};

function editVal(id) {
    var edit1 = document.getElementById('inputEdit1').value;
    var edit2 = document.getElementById('inputEdit2').value;
    var edit3 = document.getElementById('inputEdit3').value;
    var edit4 = document.getElementById('inputEdit4').value;
    var edit5 = document.getElementById('inputEdit5').value;
    var edit6 = document.getElementById('inputEdit6').value;

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3081/fichafrequenciaupdate',
        data: {IDFrequencia: id, nomeFreq: edit1, dataFreq: edit2, horarioFreq: edit3, banhoFreq: edit4, lancheFreq: edit5, roupaFreq: edit6},
    }).done(function () {
        console.log("aq")
    }).fail(function (msg) {
        //console.log('FAIL');
    }).always(function (msg) {
        //console.log('ALWAYS');
    });
    
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
};



function viewCadastro(id) {
    $.ajax({
        url: "http://127.0.0.1:3081/fichafrequenciaselect",
        type: 'GET',
        success: data => {
            data.data.forEach(element => {
                const divvv = `
                    <div id="myModal`+id+`"class="modal customizar">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content customize">
                        <div class="modal-body">
                        <div class="mb-1">
                        <label for="exampleInputEmail1" class="form-label"></label>Nome:
                        <p class="textAA">${element.nomeFreq}</p>
                    </div>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label"></label>Data:
                        <p class="textAA">${element.dataFreq}</p>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"></label>Horário:
                        <p class="textAA">${element.horarioFreq}</p>
                    </div>
                    <div class="mb-4">
                        <label for="exampleInputEmail1" class="form-label"></label>Banho:
                        <p class="textAA">${element.banhoFreq}</p>
                    </div>
                    <div class="mb-4">
                        <label for="exampleInputEmail1" class="form-label"></label>Lanche:
                        <p class="textAA">${element.lancheFreq}</p>
                    </div>
                    <div class="mb-6">
                        <label for="exampleInputEmail1" class="form-label"></label>Roupa:
                        <p class="textAA">${element.roupaFreq}</p>
                    </div>
                        </div>
                        <div class="modal-footer">
                        <button onclick="fecharform(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar formulário</button>
                        </div>
                    </div>
                    </div>
                </div>
                `
        if(element.IDFrequencia == id){
            document.getElementById("modalFrequencia").innerHTML = divvv;
            $('#myModal' + id).modal('show');
        }
                });
            }
        });
};

function fecharform(id) {
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
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