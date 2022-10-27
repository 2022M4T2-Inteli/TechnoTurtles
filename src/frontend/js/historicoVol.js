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

function newHisVol() {
    $('#exampleModal').modal('show');
}

function fecharModal() {
    $('#exampleModal').modal('hide');
}

const histvoluntarios = document.querySelector("#table-historico-voluntarios");

$.ajax({
    url: "http://127.0.0.1:3081/historicovoluntariosselect",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const histvol = document.createElement("tr");
        histvol.innerHTML = `
        
        <tr>
                <th scope="row">${element.IDHistoricoVol}</th>
                <td>${element.tituloHisVol}</td>
                <td>${element.dataHisVol}</td>
                <td>${element.duracaoHisVol}</td>
                <td><button onclick="edithistoricovol(${element.IDHistoricoVol})" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                  <button onclick="deletehistoricovol(${element.IDHistoricoVol})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                </td>
        </tr>

        `
        histvoluntarios.appendChild(histvol);
        });
    }
});

function saveHisVol() {
    const inputTitulo = document.querySelector("input[name='tituloHisVol']").value;
    const inputData = document.querySelector("input[name='dataHisVol']").value;
    const inputDuracao = document.querySelector("input[name='duracaoHisVol']").value;


    var settings = {
        "url": "http://127.0.0.1:3081/historicovoluntariosinsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "tituloHisVol": inputTitulo,
            "dataHisVol": inputData,
            "duracaoHisVol": inputDuracao,

        }
      };
      
      $.ajax(settings);
}

function deletehistoricovol(id) {
    const hisvol = document.createElement("div");
    hisvol.innerHTML = `
    <div id="myModal`+ id +`"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <p>Tem certeza que deseja excluir o histórico ${id}?</p>
            </div>
            <div class="modal-footer">
            <button onclick="deletehisvol(${id})" type="button" class="btn btn-primary">Confirmar exclusão</button>
            <button onclick="fecharModall(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar exclusão</button>
            </div>
        </div>
        </div>
    </div>
    `
    document.body.appendChild(hisvol);
    $('#myModal' + id).modal('show');
};

function fecharModall(id) {
    $('#myModal' + id).modal('hide');
    $('#myModal' + id).remove();
};

function deletehisvol(id) {
        $.ajax({
            type: 'POST',
            url: "http://127.0.0.1:3081/historicovoluntariosdelete",
            data: {IDHistoricoVol: id},
        })
    }

function edithistoricovol(id) {
    $.ajax({
        url: "http://127.0.0.1:3081/historicovoluntariosselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const editarDo = `
                <div id="myModal`+id+`"class="modal customizar">
                <div class="modal-dialog" role="document">
                <div class="modal-content customize">
                    <div class="modal-body">
                    <label for="exampleInputEmail1" class="form-label"></label>Novo Titulo:
                    <input type="text" class="form-control" name="valorNew" id="edittt">
                    </div>
                    <div class="modal-footer">
                    <button onclick="editVal(${id})" type="button" class="btn btn-primary">Confirmar edição</button>
                    <button onclick="fecharVal(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar edição</button>
                    </div>
                </div>
                </div>
            </div>
    `
    if(element.IDHistoricoVol == id){
        console.log("oi")
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
    var yr = document.getElementById('edittt').value;
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3081/historicovoluntariosupdate',
        data: {IDHistoricoVol: id, tituloHisVol: yr},
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