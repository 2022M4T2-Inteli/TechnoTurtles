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
//PÁGINA DE ATENDIMENTOS

$(document).ready( function() {
    enableSimTextInputAttendance();
});

function enableSimTextInputAttendance(){
    if (document.getElementById("flexRadioDefault2").checked){
        $("#fieldsetDisabled").prop("disabled",false);
    }else{
        $("#fieldsetDisabled").prop("disabled",true);
    }
}

$(document).ready( function() {
    enableSimWhenTextInputAttendance();
});

function enableSimWhenTextInputAttendance(){
    if (document.getElementById("flexRadioDefault2.0").checked){
        $("#fieldsetDisabled2").prop("disabled",false);
    }else{
        $("#fieldsetDisabled2").prop("disabled",true);
    }
}

function enableSimTextInputAttendance3(){
    if (document.getElementById("flexRadioDefault3").checked){
        $("#fieldsetDisabled3").prop("disabled",false);
    }else{
        $("#fieldsetDisabled3").prop("disabled",true);
    }
}

function enableSimTextInputAttendance4(){
    if (document.getElementById("inlineCheckbox1").checked){
        $("#fieldsetDisabled4").prop("disabled",false);
    }else{
        $("#fieldsetDisabled4").prop("disabled",true);
    }
}

function enableSimTextInputAttendance5(){
    if (document.getElementById("inlineCheckbox2").checked){
        $("#fieldsetDisabled5").prop("disabled",false);
    }else{
        $("#fieldsetDisabled5").prop("disabled",true);
    }
}

function enableSimTextInputAttendance6(){
    if (document.getElementById("inlineCheckbox3").checked){
        $("#fieldsetDisabled6").prop("disabled",false);
    }else{
        $("#fieldsetDisabled6").prop("disabled",true);
    }
}

function enableSimTextInputAttendance7(){
    if (document.getElementById("inlineCheckbox4").checked){
        $("#fieldsetDisabled7").prop("disabled",false);
    }else{
        $("#fieldsetDisabled7").prop("disabled",true);
    }
}

function enableSimTextInputAttendance8(){
    if (document.getElementById("inlineCheckbox5").checked){
        $("#fieldsetDisabled8").prop("disabled",false);
    }else{
        $("#fieldsetDisabled8").prop("disabled",true);
    }
}

function enableSimTextInputAttendance9(){
    if (document.getElementById("inlineCheckbox6").checked){
        $("#fieldsetDisabled9").prop("disabled",false);
    }else{
        $("#fieldsetDisabled9").prop("disabled",true);
    }
}

function enableSimTextInputAttendance10(){
    if (document.getElementById("inlineCheckbox7").checked){
        $("#fieldsetDisabled10").prop("disabled",false);
    }else{
        $("#fieldsetDisabled10").prop("disabled",true);
    }
}

function enableSimTextInputAttendance11(){
    if (document.getElementById("inlineCheckbox8").checked){
        $("#fieldsetDisabled11").prop("disabled",false);
    }else{
        $("#fieldsetDisabled11").prop("disabled",true);
    }
}

function enableSimTextInputAttendance12(){
    if (document.getElementById("inlineCheckbox9").checked){
        $("#fieldsetDisabled12").prop("disabled",false);
    }else{
        $("#fieldsetDisabled12").prop("disabled",true);
    }
}

function enableSimTextInputAttendance13(){
    if (document.getElementById("inlineCheckbox13").checked){
        $("#fieldsetDisabled13").prop("disabled",false);
    }else{
        $("#fieldsetDisabled13").prop("disabled",true);
    }
}

function enableSimTextInputAttendance14(){
    if (document.getElementById("inlineCheckbox14").checked){
        $("#fieldsetDisabled14").prop("disabled",false);
    }else{
        $("#fieldsetDisabled14").prop("disabled",true);
    }
}

function enableSimTextInputAttendance15(){
    if (document.getElementById("inlineCheckbox15").checked){
        $("#fieldsetDisabled15").prop("disabled",false);
    }else{
        $("#fieldsetDisabled15").prop("disabled",true);
    }
}

function enableSimTextInputAttendance16(){
    if (document.getElementById("inlineCheckbox16").checked){
        $("#fieldsetDisabled16").prop("disabled",false);
        $("#fieldsetDisabled17").prop("disabled",false);
    }else{
        $("#fieldsetDisabled16").prop("disabled",true);
        $("#fieldsetDisabled17").prop("disabled",true);
    }
}

function enableSimTextInputAttendance18(){
    if (document.getElementById("inlineCheckbox18").checked){
        $("#fieldsetDisabled18").prop("disabled",false);
    }else{
        $("#fieldsetDisabled18").prop("disabled",true);
    }
}

function enableSimTextInputAttendance19(){
    if (document.getElementById("flexRadioDefault19").checked){
        $("#fieldsetDisabled19").prop("disabled",true);
    }else{
        $("#fieldsetDisabled19").prop("disabled",false);
    }
}


window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
});








// INSERIR ATENDIMENTOS


const tableBodyAttendance = document.querySelector("#table-body-attendance");

var settingsAttendance = {
    "url":  "http://127.0.0.1:3081/atendimentoselect",
    "method": "GET",
    "timeout": 0,
};

$.ajax({
    url:  "http://127.0.0.1:3081/atendimentoselect",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const trr = document.createElement("tr");
        trr.innerHTML = `
        <tr>
                <th scope="row">${element.IDAtendimento}</th>
                <td>${element.tituloAtendi}</td>
                <td>${element.observacaoAtendi}</td>
                <td>${element.dataAtendi}</td>
                <td>${element.horaAtendi}</td>
                <td><button class="buttonEdit" onclick="editAttendance(${element.IDAtendimento})"><i class="bi bi-pencil-fill"></i></button>
                  <button class="buttonDelete" onclick="buttonNewAssAttendance2(${element.IDAtendimento})"><i class="bi bi-trash-fill"></i></button>
                </td>
        </tr>

        `
        tableBodyAttendance.appendChild(trr);
        });
    }
});

function buttonNewAssAttendance() {
    $('#myModalAttendance').modal('show');
}

function closeModalAttendance() {
    $('#myModalAttendance').modal('hide');
}









// VISUALIZAR ATENDIMENTOS NA TABELA

function saveAttend() {
    const inputTituloAtendimento = document.querySelector("input[name='titulo']").value;
    const inputDescricaoAtendimento = document.querySelector("input[name='observacao']").value;
    const inputDataAtendimento = document.querySelector("input[name='data']").value;
    const inputhoraAtendimento = document.querySelector("input[name='hora']").value;

    var settingsAttendance = {
        "url": "http://127.0.0.1:3081/atendimentoinsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "tituloAtendi": inputTituloAtendimento,
            "observacaoAtendi": inputDescricaoAtendimento,
            "dataAtendi": inputDataAtendimento,
            "horaAtendi": inputhoraAtendimento
        }
      };
      
      $.ajax(settingsAttendance).done(response => {
          console.log(response)
      });

      console.log("foi")
}






// DELETE ATENDIMENTOS

function buttonNewAssAttendance2(id) {

    console.log("foi delete")
    const deleteAttend = document.createElement("div");
    deleteAttend.innerHTML = `
    
    <div id="myModalAttendance2"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <p>Tem certeza que deseja excluir o atendimento com id ${id}?</p>
            </div>
            <div class="modal-footer">
            <button onclick="deleteAttendance(${id})" type="button" class="btn btn-primary">Excluir Atendimento</button>
            <button onclick="closeModalAttendance2()" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar Exclusão</button>
            </div>
        </div>
        </div>
    </div>

    `

    document.body.appendChild(deleteAttend);

    $('#myModalAttendance2').modal('show');
}

function closeModalAttendance2() {
    $('#myModalAttendance2').modal('hide');
    $('#myModalAttendance2').remove();
}

function deleteAttendance(id){
    console.log("o id é ", id)
    var settingsAttendii = {
        "url": "http://127.0.0.1:3081/atendimentodelete",
        "method": "POST",
        "timeout": 0,
        "data": {"IDAtendimento": id},
      };
      
      $.ajax(settingsAttendii).done(function (response) {
        console.log(response);
      });
    
}





// UPDATE ATENDIMENTOS

function editAttendance(id) {
    const updateAttend = document.createElement("div");
    updateAttend.innerHTML = `
    <div id="myModalAttendance10"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label"></label>Titulo:
            <div id="displaytt">
            <input onfocusout="disableField(5)" class="editInput" type="text" id="inputEditAtendi1" placeholder="" value=""></input>
            <button onclick="enableField(5)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
            </div>
            </div>

            <div class="modal-body">
            <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label"></label>Titulo:
            <div id="displaytt">
            <input onfocusout="disableField(5)" class="editInput" type="text" id="inputEditAtendi2" placeholder="" value=""></input>
            <button onclick="enableField(5)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
            </div>
            </div>

            <div class="modal-body">
            <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label"></label>Titulo:
            <div id="displaytt">
            <input onfocusout="disableField(5)" class="editInput" type="text" id="inputEditAtendi3" placeholder="" value=""></input>
            <button onclick="enableField(5)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
            </div>
            </div>

            <div class="modal-body">
            <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label"></label>Titulo:
            <div id="displaytt">
            <input onfocusout="disableField(5)" class="editInput" type="text" id="inputEditAtendi4" placeholder="" value=""></input>
            <button onclick="enableField(5)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
            </div>
            </div>
            </div>
            <div class="modal-footer">
            <button onclick="editAtendimento(${id})" type="button" class="btn btn-primary">Confirmar edição</button>
            <button onclick="fecharValAtendi()" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar edição</button>
            </div>
        </div>
        </div>
    </div>
    `
    document.body.appendChild(updateAttend);
    $('#myModalAttendance10').modal('show');
};
function fecharValAtendi() {
    $('#myModalAttendance10').modal('hide');
    $('#myModalAttendance10').remove();
};
function editAtendimento(id) {
    var editAttendances = document.getElementById('inputEditAtendi1').value;
    // var newObservacao = document.getElementById('inputEditAtendi2').value
    // var newDataAtendi = document.getElementById('inputEditAtendi3').value
    // var newHoraAtendi = document.getElementById('inputEditAtendi4').value
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3081/atendimentoupdate',
        data: {IDAtendimento: id, tituloAtendi: editAttendances}
    }).done(function () {
        console.log("aq")
    }).fail(function (msg) {
        //console.log('FAIL');
    }).always(function (msg) {
        //console.log('ALWAYS');
    });
    $('#myModalAttendance10').modal('hide');
    $('#myModalAttendance10').remove();
};