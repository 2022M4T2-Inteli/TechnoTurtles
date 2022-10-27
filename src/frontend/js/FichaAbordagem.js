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

function buttonNewAbo(){
    $('#myModal27').modal('show');
}

function fecharModalAbo() {
    $('#myModal27').modal('hide');
}

const tableBody = document.querySelector("#table-body-abordagem");

$.ajax({
    url: "http://127.0.0.1:3081/abordagemusers",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const tr = document.createElement("tr");
        tr.innerHTML = `
        
        <tr>
                <th scope="row">${element.IDAbordagem}</th>
                <td>${element.nomeAbo}</td>
                <td>${element.eduAbo}</td>
                <td>${element.dataAbo}</td>
                <td><button onclick="editAbo2(${element.IDAbordagem})" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                  <button onclick="deleteAbo(${element.IDAbordagem})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                  <button onclick="viewAbo(${element.IDAbordagem})" class="buttonView"><i class="bi bi-eye-fill"></i></button>
                </td>
        </tr>

        `
            tableBody.appendChild(tr);
        });
    }
});


function salvarAssAbo() {

   const nomeAbo = document.getElementById("nomeAbo").value;
   const chamadoAbo  = document.getElementById("chamadoAbo").value;
   const origemAbo  = document.getElementById("origemAbo").value;
   const albergueAbo  = document.getElementById("albergueAbo").value;
   const qualAbergAbo  = document.getElementById("qualAbergAbo").value;
   const tempoRuaAbo  = document.getElementById("tempoRuaAbo").value;
   const IDMotivoAbo  = document.getElementById("IDMotivoAbo").value;
   const  irProjetoAbo  = document.getElementById("irProjetoAbo").value;
//    const quandoIrProjeAbo  = document.getElementById("quandoIrProjeAbo").value;
   const obsAbo  = document.getElementById("obsAbo").value;
   const eduAbo  = document.getElementById("eduAbo").value;
   const dataAbo  = document.getElementById("dataAbo").value;
 


    var settings = {
        "url": "http://127.0.0.1:3081/abordageminsert",
        "method": "POST",
        "timeout": 0,
        "data": {

            "nomeAbo": nomeAbo,
            "chamadoAbo": chamadoAbo,
            "origemAbo": origemAbo, 
            "albergueAbo": albergueAbo, 
            "qualAbergAbo": qualAbergAbo,
            "tempoRuaAbo": tempoRuaAbo, 
            "IDMotivoAbo": IDMotivoAbo, 
            "irProjetoAbo": irProjetoAbo, 
            "obsAbo": obsAbo, 
            "eduAbo": eduAbo, 
            "dataAbo": dataAbo

        }
      };
      
    $.ajax(settings).done(response => {
        console.log(response)
    });
}


// Deletar Cadastro

function deleteAbo(id){

    const divdelete = document.createElement("div");
    divdelete.innerHTML = `
        
        <div id="myModal`+ id +`" class="modal customizar">
            <div class="modal-dialog" role="document">
            <div class="modal-content customize">
                <div class="modal-body">
                <p>Tem certeza que deseja excluir o assistido com id `+ id +`?</p>
                </div>
                <div class="modal-footer">
                <button onclick="deleteAssistido(${id})" type="button" class="btn btn-primary">Excluir Assistido</button>
                <button onclick="fecharModal(${id})" type="button" class="btn btn-secondary">Cancelar Exclusão</button>
                </div>
            </div>
            </div>
        </div>
        `
    
        document.body.appendChild(divdelete);
        $('#myModal'+ id).modal('show');
}

function fecharModal(id){
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
}

function deleteAssistido(id){
    
    var settings = {
        "url": "http://127.0.0.1:3081/abordagemdelete",
        "method": "POST",
        "timeout": 0,
        "data": {
          "IDAbordagem": id, 
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    
}


// Visualizar Cadastro Total

function viewAbo(id){
    $.ajax({
        url: "http://127.0.0.1:3081/abordagemusers",
        type: 'GET',
        success: data => {
         data.forEach(element => {

            const dive = document.createElement("div");
            dive.innerHTML = `
            <div id="myModal`+ id +`" class="modal customizar">
                <div class="modal-dialog" role="document">
                <div class="modal-content customize">
                    <div class="modal-body">
                    <label for="exampleInputEmail1" class="form-label"></label>
                    <h3>DADOS DO ASSISTIDO:</h3>
                    <br>
                    <div>
                        <h4>Nome Completo:</h4>
                        <p class="designer">${element.nomeAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Nome Social:</h4>
                        <p class="designer">${element.chamadoAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Local da abordagem social:</h4>
                        <p class="designer">${element.origemAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Está sendo atendido em Albergue ou casa de passagem, neste momento?</h4>
                        <p class="designer">${element.albergueAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h6>Sim, Qual?</h6>
                        <p class="designer">${element.qualAbergAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Quanto tempo vive na rua?</h4>
                        <p class="designer">${element.tempoRuaAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Quais os principais motivos pelos quais passou a morar na rua, albergue ou outro local?</h4>
                        <p class="designer">${element.IDMotivoAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Pretende ser atendido no Projeto Revirar?</h4>
                        <p class="designer">${element.irProjetoAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Observação:</h4>
                        <p class="designer">${element.obsAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Educador Social:</h4>
                        <p class="designer">${element.eduAbo}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Data da Abordagem:</h4>
                        <p class="designer">${element.dataAbo}</p>
                    </div>
                    <br>
                    <button onclick="fecharModalView(${id})" type="button" class="btn btn-secondary">Fechar Visualização</button>
                    </div>
                    </div>
                </div>
            </div>
            `

            if (element.IDAbordagem == id){
                document.body.appendChild(dive);
                $('#myModal' + id).modal('show');
            }
         });
        }
    });
}

function fecharModalView(id) {
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
};


//Update Cadastro

function editAbo2(id){
    $.ajax({
        url: "http://127.0.0.1:3081/abordagemusers",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const editarDo = `
                <div id="myModal`+ id +`" class="modal customizar">
                <div class="modal-dialog" role="document">
                <div class="modal-content customize">
                    <div class="modal-body">
                    <label for="exampleInputEmail1" class="form-label"></label>
                    <h3>DADOS DO ASSISTIDO:</h3>
                    <br>
                    <div>
                        <h4>Nome Completo:</h4>

                        <input disabled onfocusout="disablitaredit(1)" class="form-control" type="text" id="inputcad1" placeholder="${element.nomeAbo}" value="${element.nomeAbo}">
                        <button onclick="edit(1)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                    </div>
                    <br>
                    <div>
                        <h4>Nome Social:</h4>
                        <input disabled onfocusout="disablitaredit(2)" class="form-control" type="text" id="inputcad2" placeholder="${element.chamadoAbo}" value="${element.chamadoAbo}">
                        <button onclick="edit(2)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>

                      
                    </div>
                    <br>
                    <div>
                        <h4>Local da abordagem social:</h4>

                        <input disabled onfocusout="disablitaredit(3)" class="form-control" type="text" id="inputcad3" placeholder="${element.origemAbo}" value="${element.origemAbo}">
                        <button onclick="edit(3)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                      
                    </div>
                    <br>
                    <div>
                        <h4>Está sendo atendido em Albergue ou casa de passagem, neste momento?</h4>

                        <input disabled onfocusout="disablitaredit(4)" class="form-control" type="text" id="inputcad4" placeholder="${element.albergueAbo}" value="${element.albergueAbo}">
                        <button onclick="edit(4)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                     
                    </div>
                    <br>
                    <div>
                        <h6>Sim, Qual?</h6>

                        <input disabled onfocusout="disablitaredit(5)" class="form-control" type="text" id="inputcad5" placeholder="${element.qualAbergAbo}" value="${element.qualAbergAbo}">
                        <button onclick="edit(5)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                    </div>
                    <br>
                    <div>
                        <h4>Quanto tempo vive na rua?</h4>

                        <input disabled onfocusout="disablitaredit(6)" class="form-control" type="text" id="inputcad6" placeholder="${element.tempoRuaAbo}" value="${element.tempoRuaAbo}">
                        <button onclick="edit(6)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                    </div>
                    <br>
                    <div>
                        <h4>Quais os principais motivos pelos quais passou a morar na rua, albergue ou outro local?</h4>

                        <input disabled onfocusout="disablitaredit(7)" class="form-control" type="text" id="inputcad7" placeholder="${element.IDMotivoAbo}" value="${element.IDMotivoAbo}">
                        <button onclick="edit(7)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                    </div>
                    <br>
                    <div>
                        <h4>Pretende ser atendido no Projeto Revirar?</h4>

                        <input disabled onfocusout="disablitaredit(8)" class="form-control" type="text" id="inputcad8" placeholder="${element.irProjetoAbo}" value="${element.irProjetoAbo}">
                        <button onclick="edit(8)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>

                    </div>
                    <br>
                    <div>
                        <h4>Observação:</h4>

                        <input disabled onfocusout="disablitaredit(9)" class="form-control" type="text" id="inputcad9" placeholder="${element.obsAbo}" value="${element.obsAbo}">
                        <button onclick="edit(9)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                    </div>
                    <br>
                    <div>
                        <h4>Educador Social:</h4>

                        <input disabled onfocusout="disablitaredit(10)" class="form-control" type="text" id="inputcad10" placeholder="${element.eduAbo}" value="${element.eduAbo}">
                        <button onclick="edit(10)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>

                    </div>
                    <br>
                    <div>
                        <h4>Data da Abordagem:</h4>

                        <input disabled onfocusout="disablitaredit(11)" class="form-control" type="text" id="inputcad11" placeholder="${element.dataAbo}" value="${element.dataAbo}">
                        <button onclick="edit(11)" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>

                    </div>
                    <br>
                    </div>
                    <div class="modal-footer">
                    <button onclick="saveEditAbo(${id})" type="button" class="btn btn-primary">Salvar Cadastro</button>
                    <button onclick="closemodalAbo(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Descartar Alterações</button>
                    </div>
                    </div>
                </div>
            </div>
            `
                // console.log(editarDo);

                if (element.IDAbordagem == id){
                    // console.log("entrou");
                    document.getElementById("modalAbordagem").innerHTML = editarDo;
                    $('#myModal' + id).modal('show');
                }
      
            });
        }
    });
};

function closemodalAbo(id) {
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
};

function edit(number){
    document.getElementById("inputcad" + number).disabled = false;
}

function disablitaredit(number){
    document.getElementById("inputcad" + number).disabled = true;
}

function saveEditAbo(id){

    var inputcad1 = document.getElementById('inputcad1').value;
    var inputcad2 = document.getElementById('inputcad2').value;
    var inputcad3 = document.getElementById('inputcad3').value;
    var inputcad4 = document.getElementById('inputcad4').value;
    var inputcad5 = document.getElementById('inputcad5').value;
    var inputcad6 = document.getElementById('inputcad6').value;
    var inputcad7 = document.getElementById('inputcad7').value;
    var inputcad8 = document.getElementById('inputcad8').value;
    var inputcad9 = document.getElementById('inputcad9').value;
    var inputcad10 = document.getElementById('inputcad10').value;
    var inputcad11 = document.getElementById('inputcad11').value;


    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3081/abordagemupdate',
        data: {IDAbordagem: id, nomeAbo: inputcad1, chamadoAbo: inputcad2, origemAbo: inputcad3, albergueAbo: inputcad4, qualAbergAbo: inputcad5, tempoRuaAbo: inputcad6, IDMotivoAbo: inputcad7, irProjetoAbo: inputcad8, obsAbo: inputcad9, eduAbo: inputcad10, dataAbo: inputcad11},
    }).done(function () {
        // console.log("aq")
    }).fail(function (msg) {
        //console.log('FAIL');
    }).always(function (msg) {
        //console.log('ALWAYS');
    });
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
