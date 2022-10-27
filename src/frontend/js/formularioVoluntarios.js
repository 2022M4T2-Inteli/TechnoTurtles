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

$("document").ready(function(){
        
    $("#header").load("menu.html", function() {
        $("#btn").on('click', showmenu);
    });
    
});

function showmenu(){
    nav.classList.toggle('active');
}

//MENU HAMBURGUER
const btn = document.getElementById('btn')

function menu(event){
    if (event.type == 'touchstart') event.preventDefault()
    const btn = document.getElementById('nav');
    nav.classList.toggle('active');
}

btn.addEventListener('click', menu);
btn.addEventListener('touchstart', menu);


// funções 


const tableBody = document.querySelector("#table-body-form");

$.ajax({
    url: "http://127.0.0.1:3094/formselect",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const tr = document.createElement("tr");
        tr.innerHTML = `
        
        <tr>
                <th scope="row">${element.IDform}</th>
                <td>${element.Nome}</td>
                <td>${element.TelefoneEmail}</td>
                <td>${element.IDFuncao}</td>
                <td>
                <button onclick="editform(${element.IDform})" class="buttonEdit"><i class="bi bi-plus-lg"></i></button>
                <button onclick="viewform(${element.IDform})" class="buttonView"><i class="bi bi-eye-fill"></i></button>
                <button onclick="deleteForm(${element.IDform})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                </td>
                <td><select id="select-btn" class="form-select alinhamento" aria-label="Default select example">
                <option selected>Selecionar</option>
                <option>Realizado</option>
                <option>Pendente</option>
                </select></td>
                
        </tr>

        `

            tableBody.appendChild(tr);
        });

        document.querySelectorAll("#select-btn").forEach(selectButton => {
            selectButton.addEventListener("change", function(event) {
                if(event.target.classList.contains("red")) {
                    event.target.classList.remove("red");
                } else if(event.target.classList.contains("green")) {
                    event.target.classList.remove("green");
                } else if((event.target).classList.contains("white")) {
                    event.target.classList.remove("white");
                }

                if(event.target.value == "Pendente") {
                    (event.target).classList.add("red");
                } else if (event.target.value == "Realizado") {
                    (event.target).classList.add("green");
                } else {
                    (event.target).classList.add("white");
                }
            })
        })

    }
});



function salvarAssAbo() {

    Swal.fire(
        'Enviado!',
        'Formulário enviado',
        'success'
    )
    

   const Nome = document.getElementById("Nome").value;
   const TelefoneEmail  = document.getElementById("TelefoneEmail").value;
   const IDFuncao  = document.getElementById("IDFuncao").value;

    var settings = {
        "url": "http://127.0.0.1:3094/forminsert",
        "method": "POST",
        "timeout": 0,
        "data": {

            "Nome": Nome,
            "TelefoneEmail": TelefoneEmail,
            "IDFuncao": IDFuncao,
        }
      };
      
    $.ajax(settings).done(response => {
        console.log(response)
    });
}


// Deletar Cadastro

function deleteForm(id){

    const divdelete = document.createElement("div");
    divdelete.innerHTML = `
        
        <div id="myModal`+ id +`" class="modal customizar">
            <div class="modal-dialog" role="document">
            <div class="modal-content customize">
                <div class="modal-body">
                <p>Tem certeza que deseja excluir o formulario com id `+ id +`?</p>
                </div>
                <div class="modal-footer">
                <button onclick="deleteAssistido(${id})" type="button" class="btn btn-primary">Excluir formulário</button>
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
        "url": "http://127.0.0.1:3094/formdelete",
        "method": "POST",
        "timeout": 0,
        "data": {
          "IDform": id, 
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    
}



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






// EDIÇÃO

function editform(id) {
    console.log(id);
    $.ajax({
        url: "http://127.0.0.1:3094/formselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                var editarform = `
                    <div id="myModal`+id+`"class="modal customizar">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content customize">
                            <div class="modal-body">
                            <div class="mb-1" id="teste23">
                            <h5 for="exampleInputEmail1" class="form-label">Observação:</h5>
                            <br>
                            <div id="displaytt">
                                <input class="form-control" type="text" id="inputEdit1" placeholder="${element.obsForm}" value="${element.obsForm}"></input>
                            </div>
                            <br>
                            <div class="modal-footer">
                            <button onclick="editVal(${id})" type="button" class="btn btn-primary">Confirmar edição</button>
                            <button onclick="fecharVal(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar edição</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `
                if(element.IDform == id){
                    document.getElementById("modalForm").innerHTML = editarform;
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
    var editform = document.getElementById('inputEdit1').value;

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3094/formupdate',
        data: {IDform: id, obsForm: editform},
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



// VISUALIZAR


// Visualizar form Total

function viewform(id){
    $.ajax({
        url: "http://127.0.0.1:3094/formselect",
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
                    <h3>Dados do Formulário</h3>
                    <br>
                    <div>
                        <h4>Nome:</h4>
                        <p class="designer">${element.Nome}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Contato:</h4>
                        <p class="designer">${element.TelefoneEmail}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Função Desejada:</h4>
                        <p class="designer">${element.IDFuncao}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Observação:</h4>
                        <p class="designer">${element.obsForm}</p>
                    </div>
                    <br>
                    <div>
                    <div class="modal-footer">
                    <button onclick="closemodal(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar Visualização</button>
                    </div>
                </div>
                </div>
            </div>
            `

            if (element.IDform == id){
                document.body.appendChild(dive);
                $('#myModal' + id).modal('show');
            }
         });
        }
    });
}

function closemodal(id) {
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
