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


const tableBody = document.querySelector("#table-body-contato");

$.ajax({
    url: "http://127.0.0.1:3094/formcontatoselect",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const tr = document.createElement("tr");
        tr.innerHTML = `
        
        <tr>
                <th scope="row">${element.IDContato}</th>
                <td>${element.nome}</td>
                <td>${element.contato}</td>
                <td>
                <button onclick="viewform(${element.IDContato})" class="buttonView"><i class="bi bi-eye-fill"></i></button>
                <button onclick="deleteForm(${element.IDContato})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                </td>
                <td><select id="select-btn" class="form-select alinhamento" aria-label="Default select example">
                <option selected class="white">Selecionar</option>
                <option class="white">Realizado</option>
                <option class="white">Pendente</option>
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



function contatoform() {

    Swal.fire(
        'Enviado!',
        'Formulário enviado',
        'success'
    )
    

   const nome = document.getElementById("nome").value;
   const contato  = document.getElementById("contato").value;
   const assunto  = document.getElementById("assunto").value;

    var settings = {
        "url": "http://127.0.0.1:3094/formcontatoinsert",
        "method": "POST",
        "timeout": 0,
        "data": {

            "nome": nome,
            "contato": contato,
            "assunto": assunto,
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
                <p>Tem certeza que deseja excluir o contato com id `+ id +`?</p>
                </div>
                <div class="modal-footer">
                <button onclick="deleteAssistido(${id})" type="button" class="btn btn-primary">Excluir Contato</button>
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
        "url": "http://127.0.0.1:3094/formcontatodelete",
        "method": "POST",
        "timeout": 0,
        "data": {
          "IDContato": id, 
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    
}

// Visualizar form Total

function viewform(id){
    $.ajax({
        url: "http://127.0.0.1:3094/formcontatoselect",
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
                        <p class="designer">${element.nome}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Contato:</h4>
                        <p class="designer">${element.contato}</p>
                    </div>
                    <br>
                    <div>
                        <h4>Assunto:</h4>
                        <p class="designer">${element.assunto}</p>
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

            if (element.IDContato == id){
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
