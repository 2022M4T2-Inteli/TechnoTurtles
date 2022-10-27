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
// PAGINA Doação

function buttonNewAss() {
    $('#myModal').modal('show');
}

function fecharModal() {
    $('#myModal').modal('hide');
}

const tableBodyy = document.querySelector("#table-body-doacao");

$.ajax({
    url: "http://127.0.0.1:3081/doacaoselect",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const tr = document.createElement("tr");
            console.log(element.IDDoacao);
        tr.innerHTML = `
        
        <tr>
                <th scope="row">${element.IDDoacao}</th>
                <td>${element.tituloDoacao}</td>
                <td>${element.dataDoacao}</td>
                <td>${element.valorDoacao}</td>
                <td>${element.nomeDoador}</td>
                <td>${element.cpfDoador}</td>
                <td>${element.telefoneDoador}</td>
                <td><button onclick="editDoacao(${element.IDDoacao})" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                  <button onclick="deleteDoacao(${element.IDDoacao})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                  <button onclick="viewDoacao(${element.IDDoacao})" class="buttonView"><i class="bi bi-eye-fill"></i></button>
                </td>
        </tr>

        `
        tableBodyy.appendChild(tr);
        });
    }
});

function salvarAss() {
    const inputTitulo = document.querySelector("input[name='titulo']").value;
    const inputDescricao = document.querySelector("input[name='descricao']").value;
    const inputData = document.querySelector("input[name='data']").value;
    const inputValor = document.querySelector("input[name='valor']").value;
    const inputNomeDoa = document.querySelector("input[name='nomeDoa']").value;
    const inputCpfDoa = document.querySelector("input[name='cpfDoa']").value;
    const inputTelefoneDoa = document.querySelector("input[name='telefoneDoa']").value;



    var settings = {
        "url": "http://127.0.0.1:3081/doacaoinsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "tituloDoacao": inputTitulo,
            "descricaoDoacao": inputDescricao,
            "dataDoacao": inputData,
            "valorDoacao": inputValor,
            "nomeDoador": inputNomeDoa,
            "cpfDoador": inputCpfDoa,
            "telefoneDoador": inputTelefoneDoa,


        }
      };
      
      $.ajax(settings);
}

function deleteDoacao(id) {
    console.log(id);
    $.ajax({
        url: "http://127.0.0.1:3081/doacaoselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                var excluirDo = `
                <div id="myModal`+ id +`"class="modal customizar">
                <div class="modal-dialog" role="document">
                <div class="modal-content customize">
                    <div class="modal-body">
                    <p>Tem certeza que deseja excluir a doação ` + id + `?</p>
                    </div>
                    <div class="modal-footer">
                    <button onclick="deletedoc(${id})" type="button" class="btn btn-primary">Confirmar exclusão</button>
                    <button onclick="fecharModall(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar exclusão</button>
                    </div>
                </div>
                </div>
            </div>
                    `
    if(element.IDDoacao == id){
        document.getElementById("modal").innerHTML = excluirDo;
        $('#myModal' + id).modal('show');
    }
            });
        }
    });
};

function fecharModall(id) {
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
};

function deletedoc(id) {
        $.ajax({
            type: 'POST',
            url: "http://127.0.0.1:3081/doacaodelete",
            data: {IDDoacao: id},
        })
        $('#myModal' + id).remove();
}

function enableField(number){
    document.getElementById("inputEdit" + number).disabled = false;
}

function disableField(number){
    document.getElementById("inputEdit" + number).disabled = true;
}

function editDoacao(id) {
    console.log(id);
    $.ajax({
        url: "http://127.0.0.1:3081/doacaoselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                var editarDo = `
                    <div id="myModal`+id+`"class="modal customizar">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content customize">
                            <div class="modal-body">
                            <div class="mb-1" id="teste23">
                            <label for="exampleInputEmail1" class="form-label"></label>Titulo:

                            <div id="displaytt">
                                <input disabled onfocusout="disableField(1)" class="form-control" type="text" id="inputEdit1" placeholder="${element.tituloDoacao}" value="${element.tituloDoacao}"></input>
                                <button onclick="enableField(1)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>

                            </div>
                            <div class="mb-2">
                            <label for="exampleInputEmail1" class="form-label"></label>Descrição:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(2)" class="form-control" type="text" id="inputEdit2" placeholder="${element.descricaoDoacao}" value="${element.descricaoDoacao}"></input>
                            <button onclick="enableField(2)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label"></label>Valor:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(3)" class="form-control" type="text" id="inputEdit3" placeholder="${element.valorDoacao}" value="${element.valorDoacao}"></input>
                            <button onclick="enableField(3)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-4">
                            <label for="exampleInputEmail1" class="form-label"></label>Data:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(4)" class="form-control" type="text" id="inputEdit4" placeholder="${element.dataDoacao}" value="${element.dataDoacao}"></input>
                            <button onclick="enableField(4)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-4">
                            <label for="exampleInputEmail1" class="form-label"></label>Nome do Doador:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(5)" class="form-control" type="text" id="inputEdit5" placeholder="${element.nomeDoador}" value="${element.nomeDoador}"></input>
                            <button onclick="enableField(5)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-6">
                            <label for="exampleInputEmail1" class="form-label"></label>CPF do Doador:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(6)" class="form-control" type="text" id="inputEdit6" placeholder="${element.cpfDoador}" value="${element.cpfDoador}"></input>
                            <button onclick="enableField(6)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            </div>
                            <div class="mb-6">
                            <label for="exampleInputEmail1" class="form-label"></label>Telefone do Doador:
                            <div id="displaytt">
                            <input disabled onfocusout="disableField(7)" class="form-control" type="text" id="inputEdit7" placeholder="${element.telefoneDoador}" value="${element.telefoneDoador}"></input>
                            <button onclick="enableField(7)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
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
    if(element.IDDoacao == id){
        document.getElementById("modal").innerHTML = editarDo;
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
    var edit7 = document.getElementById('inputEdit7').value;

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3081/doacaoupdate',
        data: {IDDoacao: id, tituloDoacao: edit1, descricaoDoacao: edit2, valorDoacao: edit3, dataDoacao: edit4, nomeDoador: edit5, cpfDoador: edit6, telefoneDoador: edit7},
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

// TESTE

function viewDoacao(id) {
    $.ajax({
        url: "http://127.0.0.1:3081/doacaoselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const divvv = `
        <div id="myModal`+id+`"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label"></label>Titulo:
            <p class="textAA">${element.tituloDoacao}</p>
          </div>
          <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label"></label>Descrição:
            <p class="textAA">${element.descricaoDoacao}</p>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"></label>Valor:
            <p class="textAA">${element.valorDoacao}</p>
          </div>
          <div class="mb-4">
            <label for="exampleInputEmail1" class="form-label"></label>Data:
            <p class="textAA">${element.dataDoacao}</p>
          </div>
          <div class="mb-4">
            <label for="exampleInputEmail1" class="form-label"></label>Nome do Doador:
            <p class="textAA">${element.nomeDoador}</p>
          </div>
          <div class="mb-6">
            <label for="exampleInputEmail1" class="form-label"></label>CPF do Doador:
            <p class="textAA">${element.cpfDoador}</p>
          </div>
          <div class="mb-6">
            <label for="exampleInputEmail1" class="form-label"></label>Telefone do Doador:
            <p class="textAA">${element.telefoneDoador}</p>
          </div>
            </div>
            <div class="modal-footer">
            <button onclick="fecharform(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar formulário</button>
            </div>
        </div>
        </div>
    </div>
    `
    if(element.IDDoacao == id){
        document.getElementById("modal").innerHTML = divvv;
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

function searchFilter() {
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