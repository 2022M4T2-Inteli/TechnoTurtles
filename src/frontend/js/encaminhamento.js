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

function newEnca() {
    $('#exampleModal').modal('show');
}

function fecharModal() {
    $('#exampleModal').modal('hide');
}

const encaminhamento = document.querySelector("#tabela-encaminhamento");
$.ajax({
    url: "http://127.0.0.1:3081/encaminhamentoselect",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const encam = document.createElement("tr");
            encam.innerHTML = `
            <tr>
                <th scope="row">${element.IDEncaminhamento}</th>
                <td>${element.servEnca}</td>
                <td>${element.dataEnca}</td>
                <td><button onclick="editEnca(${element.IDEncaminhamento})" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                  <button onclick="deleteEnca(${element.IDEncaminhamento})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                  <button onclick="viewEnca(${element.IDEncaminhamento})" class="buttonView"><i class="bi bi-eye-fill"></i></button>
                </td>
        </tr>
            ` 
            encaminhamento.appendChild(encam);
        });
        
    }
});

function saveEnca() {
    const inputServ = document.querySelector("input[name='servEnca']").value;
    const inputData = document.querySelector("input[name='dataEnca']").value;
    const inputobs = document.querySelector("input[name='obsEnca']").value;


    var settings = {
        "url":"http://127.0.0.1:3081/encaminhamentoinsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "servEnca": inputServ,
            "dataEnca": inputData,
            "obsEnca": inputobs,
        }
    };

    $.ajax(settings);
    $('#exampleModal').modal('hide');
}

function deleteEnca(id) {
    $.ajax({
        url: "http://127.0.0.1:3081/encaminhamentoselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const encamin = `
                <div id="myModal`+ id +`"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <p>Tem certeza que deseja excluir o encaminhamento ${id}?</p>
            </div>
            <div class="modal-footer">
            <button onclick="deleteEnc(${id})" type="button" class="btn btn-primary">Confirmar exclusão</button>
            <button onclick="fecharModall(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar exclusão</button>
            </div>
        </div>
        </div>
    </div>
    `
    if(element.IDEncaminhamento == id){
        console.log("oi")
        document.getElementById("modal").innerHTML = encamin;
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

function deleteEnc(id) {
    $.ajax({
        type: 'POST',
        url: "http://127.0.0.1:3081/encaminhamentodelete",
        data: {IdEncaminhamento: id},
    })
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
}

function editEnca(id) {
    $.ajax({
        url: "http://127.0.0.1:3081/encaminhamentoselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const editarDo = `
                <div id="myModal`+id+`"class="modal customizar">
                <div class="modal-dialog" role="document">
                <div class="modal-content customize">
                    <div class="modal-body">
                    <label for="exampleInputEmail1" class="form-label"></label>Alteração de Observação:
                    <input type="text" class="form-control" name="valorNew" id="obsEnca">
                    </div>
                    <div class="modal-footer">
                    <button onclick="editEnca2(${id})" type="button" class="btn btn-primary">Confirmar edição</button>
                    <button onclick="fecharEnca(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar edição</button>
                    </div>
                </div>
                </div>
            </div>
    `
    if(element.IDEncaminhamento == id){
        console.log("oi")
        document.getElementById("modal").innerHTML = editarDo;
        $('#myModal' + id).modal('show');
    }
            });
        }
    });
};

function fecharEnca(id) {
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
};

function editEnca2(id) {
    var gh = document.getElementById('obsEnca').value;
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3081/encaminhamentoupdate',
        data: {IdEncaminhamento: id, obsEnca: gh},
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

function viewEnca(id) {
    $.ajax({
        url: "http://127.0.0.1:3081/encaminhamentoselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const divvv = `
    <div id="myModal`+ id +`"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label"></label>Serviço:
            <p class="textAA">${element.servEnca}</p>
          </div>
          <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label"></label>Data:
            <p class="textAA">${element.dataEnca}</p>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"></label>Observação:
            <p class="textAA">${element.obsEnca}</p>
          </div>
            </div>
            <div class="modal-footer">
            <button onclick="fecharform(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar formulário</button>
            </div>
        </div>
        </div>
    </div>
    `
    if(element.IDEncaminhamento == id){
        document.getElementById("modal").innerHTML = divvv;
        $('#myModal'+ id).modal('show');
    }

            });
        }
    });
};

function fecharform(id) {
    $('#myModal'+ id).modal('hide');
    $('#myModal'+ id).remove();
};
