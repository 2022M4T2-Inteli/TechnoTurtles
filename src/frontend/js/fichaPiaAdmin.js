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
// PAGINA ficha PIA

function buttonNewAss() {
    $('#myModal').modal('show');
}

function fecharModal() {
    $('#myModal').modal('hide');
}

const tableBodyy = document.querySelector("#table-body-pia");

$.ajax({
    url: "http://127.0.0.1:3081/piaselect",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const tr = document.createElement("tr");
        tr.innerHTML = `
        
        <tr>
                <th scope="row">${element.IDPIA}</th>
                <td>${element.nomePIA}</td>
                <td>${element.datanascPIA}</td>
                <td>${element.rgPIA}</td>
                <td>${element.cpfPIA}</td>
                <td><button onclick="editDoacao(${element.IDPIA})" class="buttonEdit"><i class="bi bi-pencil-fill"></i></button>
                  <button onclick="deleteDoacao(${element.IDPIA})" class="buttonDelete"><i class="bi bi-trash-fill"></i></button>
                  <button onclick="viewDoacao(${element.IDPIA})" class="buttonView"><i class="bi bi-eye-fill"></i></button>
                </td>
        </tr>

        `
        tableBodyy.appendChild(tr);
        });
    }
});

function salvarAss() {
    const nomePIA = document.querySelector("input[name='nomePia']").value;
    const nomeSocPIA = document.querySelector("input[name='nomeSocPia']").value;
    const tecPIA = document.querySelector("input[name='tecnicoPia']").value;
    const filiacaoPIA = document.querySelector("input[name='filiacaoPia']").value;
    const datanascPIA = document.querySelector("input[name='dataNascPia']").value;
    const localPIA = document.querySelector("input[name='localPia']").value;
    const sexoPIA = document.getElementById('sexoPIA').value; //VER DEPOIS
    const estadoCivilPIA = document.querySelector("input[name='estadoCivilPia']").value;
    const racaPIA = document.getElementById('racaPIA').value; //VER DEPOIS
    const religiaoPIA = document.querySelector("input[name='religiaoPia']").value;
    const escolaridadePIA = document.querySelector("input[name='escolaridadePia']").value; 
    const rgPIA = document.querySelector("input[name='rgPia']").value;
    const emissaoPIA = document.querySelector("input[name='emissaoPia']").value;
    const orgaoDocPIA = document.querySelector("input[name='orgaoRgPia']").value; 
    const certPIA = document.querySelector("input[name='certPia']").value;
    const livroPIA = document.querySelector("input[name='livroPia']").value;
    const folhaPIA = document.querySelector("input[name='folhaPia']").value;
    const cpfPIA = document.querySelector("input[name='cpfPia']").value;
    const pisPIA = document.querySelector("input[name='pisPia']").value;
    const reservistaPIA = document.querySelector("input[name='reservistaPia']").value;
    const eleitorPIA = document.querySelector("input[name='eleitorPia']").value;
    const secaoPIA = document.querySelector("input[name='secaoPia']").value;
    const zonaPIA = document.querySelector("input[name='zonaPia']").value;
    const ctpsPIA = document.querySelector("input[name='ctpsPia']").value;
    const serieCtpsPIA = document.querySelector("input[name='serieCtpsPia']").value;
    const emissaoCtpsPIA = document.querySelector("input[name='emissaoCtpsPia']").value;
    const refEndePIA= document.querySelector("input[name='refEndePia']").value;
    const tipoPIA = document.querySelector("input[name='tipoPia']").value;
    const ruaPIA = document.querySelector("input[name='ruaPia']").value;
    const fonePIA = document.querySelector("input[name='fonePia']").value;
    const bairroPIA = document.querySelector("input[name='bairroPia']").value;
    const municipioPIA = document.querySelector("input[name='municipioPia']").value;
    const profissaoPIA = document.querySelector("input[name='profissaoPia']").value;
    const attProfPIA = document.getElementById('tipsTrabPIA').value; //VER DEPOIS TIPOS DE TRABALHO
    const tipoAttProfPIA = document.querySelector("input[name='atvProfPia']").value; //QUAL ATIVIDADE PROFISSIONAL
    const rendaMensalPIA = document.querySelector("input[name='rendaMensalPia']").value;
    const PTRS = document.getElementById('ptrsPIA').value; //VER DEPOIS PTRS
    const empresaPIA = document.querySelector("input[name='empresaPia']").value;
    const beneficioPIA = document.getElementById('benefPIA').value; //VER DEPOIS BENEFICIO
    const valorBenePIA = document.querySelector("input[name='valorBenePia']").value;
    const deficienciaPIA = document.getElementById('deficienciaPIA').value; //VER DEPOIS DEFICIENCIA
    const expeDefiPIA = document.querySelector("input[name='especiDefPia']").value;
    const probleSauPIA = document.getElementById('problemSauPIA').value; //VER DEPOIS SAUDE
    const especiSauPIA = document.querySelector("input[name='especiSauPia']").value;
    const medicacoesProblePIA = document.querySelector("input[name='especiMedPia']").value;
    const depQuimicoPIA= document.getElementById('dpQuiPIA').value; //VER DEPOIS DEPENDENTE QUIMICO
    const drogasDepPIA = document.querySelector("input[name='QuaisDrogPia']").value;
    const temRuaPIA = document.querySelector("input[name='tempoRuaPia']").value;
    const motivoTempRuaPIA = document.getElementById('motivoRuaPIA').value; //VER DEPOIS MOTIVO RUA
    const proceMotiTempRuaPIA = document.querySelector("input[name='procedenciaPia']").value;
    const centAcolhiPIA = document.querySelector("input[name='outrosAcoPia']").value;
    const comproJudiPIA = document.getElementById('juridicoPIA').value; //VER DEPOIS JURIDICO
    const qualComproJudiPIA = document.querySelector("input[name='qualJudiciPia']").value;
    const propInicialPIA = document.querySelector("input[name='propostaIniPia']").value;


    var settings = {
        "url": "http://127.0.0.1:3081/piainsert",
        "method": "POST",
        "timeout": 0,
        "data": {
            "nomePIA": nomePIA,
            "nomeSocPIA": nomeSocPIA,
            "tecPIA": tecPIA,
            "filiacaoPIA": filiacaoPIA,
            "datanascPIA": datanascPIA,
            "localPIA": localPIA,
            "sexoPIA": sexoPIA,
            "estadoCivilPIA": estadoCivilPIA,
            "racaPIA": racaPIA,
            "religiaoPIA": religiaoPIA,
            "escolaridadePIA": escolaridadePIA,
            "rgPIA": rgPIA,
            "emissaoPIA": emissaoPIA,
            "orgaoDocPIA": orgaoDocPIA,
            "certPIA": certPIA,
            "livroPIA": livroPIA,
            "folhaPIA": folhaPIA,
            "cpfPIA": cpfPIA,
            "pisPIA": pisPIA,
            "reservistaPIA": reservistaPIA,
            "eleitorPIA": eleitorPIA,
            "secaoPIA": secaoPIA,
            "zonaPIA": zonaPIA,
            "ctpsPIA": ctpsPIA,
            "serieCtpsPIA": serieCtpsPIA,
            "emissaoCtpsPIA": emissaoCtpsPIA,
            "refEndePIA": refEndePIA,
            "tipoPIA": tipoPIA,
            "ruaPIA": ruaPIA,
            "fonePIA": fonePIA,
            "bairroPIA": bairroPIA,
            "municipioPIA": municipioPIA,
            "profissaoPIA": profissaoPIA,
            "attProfPIA": attProfPIA,
            "tipoAttProfPIA": tipoAttProfPIA,
            "rendaMensalPIA": rendaMensalPIA,
            "PTRS": PTRS,
            "empresaPIA": empresaPIA,
            "beneficioPIA": beneficioPIA,
            "valorBenePIA": valorBenePIA,
            "deficienciaPIA": deficienciaPIA,
            "expeDefiPIA": expeDefiPIA,
            "probleSauPIA": probleSauPIA,
            "especiSauPIA": especiSauPIA,
            "medicacoesProblePIA": medicacoesProblePIA,
            "depQuimicoPIA": depQuimicoPIA,
            "drogasDepPIA": drogasDepPIA,
            "temRuaPIA": temRuaPIA,
            "motivoTempRuaPIA": motivoTempRuaPIA,
            "proceMotiTempRuaPIA": proceMotiTempRuaPIA,
            "centAcolhiPIA": centAcolhiPIA,
            "comproJudiPIA": comproJudiPIA,
            "qualComproJudiPIA": qualComproJudiPIA,
            "propInicialPIA": propInicialPIA,

        }
      };
      
      $.ajax(settings);
}

function deleteDoacao(id) {
  $.ajax({
      url: "http://127.0.0.1:3081/piaselect",
      type: 'GET',
      success: data => {
          data.forEach(element => {
              var excluirPI = `
              <div id="myModal`+ id +`"class="modal customizar">
              <div class="modal-dialog" role="document">
              <div class="modal-content customize">
                  <div class="modal-body">
                  <p>Tem certeza que deseja excluir a ficha com o ` + id + `?</p>
                  </div>
                  <div class="modal-footer">
                  <button onclick="deletedoc(${id})" type="button" class="btn btn-primary">Confirmar exclusão</button>
                  <button onclick="fecharModall(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar exclusão</button>
                  </div>
              </div>
              </div>
              </div>
                  `
  if(element.IDPIA == id){
      document.getElementById("modalViewPIA").innerHTML = excluirPI;
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
            url: "http://127.0.0.1:3081/piadelete",
            data: {IDPIA: id},
        })
        $('#myModal' + id).remove();
}

function enableField(number){
  console.log("VSF")
  var oii = document.getElementById("inputEdit" + number).value;
  var oi = document.getElementById("inputEdit" + number).disabled = false;
  console.log(oi)
  console.log(oii);
}

function disableField(number){
    console.log("entrou aq")
    document.getElementById("inputEdit" + number).disabled = true;
    var PIA1 = document.getElementById('inputEdit1').value;
    console.log(PIA1)
}

function testee(){
  console.log("yt")
}

function editDoacao(id) {
    console.log(id);
    $.ajax({
        url: "http://127.0.0.1:3081/piaselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                var editarDo = `
                    <div id="myModal`+id+`"class="modal customizar">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content customize">
                            <div class="modal-body">
                            <div class="mb-1">
                            <label for="exampleInputEmail1" class="form-label"></label>Nome:
                            <input disabled onfocusout="disableField(1)" class="form-control" type="text" id="inputEdit1" placeholder="${element.nomePIA}" value="${element.nomePIA}"></input>
                            <button onclick="enableField(1)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-2">
                                <label for="exampleInputEmail1" class="form-label"></label>Nome Social:
                                <input disabled onfocusout="disableField(2)" class="form-control" type="text" id="inputEdit2" placeholder="${element.nomeSocPIA}" value="${element.nomeSocPIA}"></input>
                                <button onclick="enableField(2)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label"></label>Técnico:
                                <input disabled onfocusout="disableField(3)" class="form-control" type="text" id="inputEdit3"  placeholder="${element.tecPIA}" value="${element.tecPIA}"></input>
                                <button onclick="enableField(3)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-4">
                                <label for="exampleInputEmail1" class="form-label"></label>Filiação:
                                <input disabled onfocusout="disableField(4)" class="form-control" type="text" id="inputEdit4" placeholder="${element.filiacaoPIA}" value="${element.filiacaoPIA}"></input>
                                <button onclick="enableField(4)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-4">
                                <label for="exampleInputEmail1" class="form-label"></label>Data de Nascimento:
                                <input disabled onfocusout="disableField(5)" class="form-control" type="text" id="inputEdit5" placeholder="${element.datanascPIA}" value="${element.datanascPIA}"></input>
                                <button onclick="enableField(5)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-6">
                                <label for="exampleInputEmail1" class="form-label"></label>Local:
                                <input disabled onfocusout="disableField(6)" class="form-control" type="text" id="inputEdit6" placeholder="${element.localPIA}" value="${element.localPIA}"></input>
                                <button onclick="enableField(6)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-7">
                                <label for="exampleInputEmail1" class="form-label"></label>Sexo:
                                <input disabled onfocusout="disableField(7)" class="form-control" type="text" id="inputEdit7" placeholder="${element.sexoPIA}" value="${element.sexoPIA}"></input>
                                <button onclick="enableField(7)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-8">
                                <label for="exampleInputEmail1" class="form-label"></label>Estado Civil:
                                <input disabled onfocusout="disableField(8)" class="form-control" type="text" id="inputEdit8" placeholder="${element.estadoCivilPIA}" value="${element.estadoCivilPIA}"></input>
                                <button onclick="enableField(8)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-9">
                                <label for="exampleInputEmail1" class="form-label"></label>Raça:
                                <input disabled onfocusout="disableField(9)" class="form-control" type="text" id="inputEdit9" placeholder="${element.racaPIA}" value="${element.racaPIA}"></input>
                                <button onclick="enableField(9)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-10">
                                <label for="exampleInputEmail1" class="form-label"></label>Religião:
                                <input disabled onfocusout="disableField(10)" class="form-control" type="text" id="inputEdit10" placeholder="${element.religiaoPIA}" value="${element.religiaoPIA}"></input>
                                <button onclick="enableField(10)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-11">
                                <label for="exampleInputEmail1" class="form-label"></label>Escolaridade:
                                <input disabled onfocusout="disableField(11)" class="form-control" type="text" id="inputEdit11" placeholder="${element.escolaridadePIA}" value="${element.escolaridadePIA}"></input>
                                <button onclick="enableField(11)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-12">
                                <label for="exampleInputEmail1" class="form-label"></label>RG:
                                <input disabled onfocusout="disableField(12)" class="form-control" type="text" id="inputEdit12" placeholder="${element.rgPIA}" value="${element.rgPIA}"></input>
                                <button onclick="enableField(12)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-13">
                                <label for="exampleInputEmail1" class="form-label"></label>Emissão:
                                <input disabled onfocusout="disableField(13)" class="form-control" type="text" id="inputEdit13" placeholder="${element.emissaoPIA}" value="${element.emissaoPIA}"></input>
                                <button onclick="enableField(13)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-14">
                                <label for="exampleInputEmail1" class="form-label"></label>Orgão:
                                <input disabled onfocusout="disableField(14)" class="form-control" type="text" id="inputEdit14" placeholder="${element.orgaoDocPIA}" value="${element.orgaoDocPIA}"></input>
                                <button onclick="enableField(14)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-15">
                                <label for="exampleInputEmail1" class="form-label"></label>Certidão de Nascimento/Casamento:
                                <input disabled onfocusout="disableField(15)" class="form-control" type="text" id="inputEdit15" placeholder="${element.certPIA}" value="${element.certPIA}"></input>
                                <button onclick="enableField(15)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-16">
                                <label for="exampleInputEmail1" class="form-label"></label>Livro:
                                <input disabled onfocusout="disableField(16)" class="form-control" type="text" id="inputEdit16" placeholder="${element.livroPIA}" value="${element.livroPIA}"></input>
                                <button onclick="enableField(16)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-17">
                                <label for="exampleInputEmail1" class="form-label"></label>Folha:
                                <input disabled onfocusout="disableField(17)" class="form-control" type="text" id="inputEdit17" placeholder="${element.folhaPIA}" value="${element.folhaPIA}"></input>
                                <button onclick="enableField(17)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-18">
                                <label for="exampleInputEmail1" class="form-label"></label>CPF:
                                <input disabled onfocusout="disableField(18)" class="form-control" type="text" id="inputEdit18" placeholder="${element.cpfPIA}" value="${element.cpfPIA}"></input>
                                <button onclick="enableField(18)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-19">
                                <label for="exampleInputEmail1" class="form-label"></label>PIS:
                                <input disabled onfocusout="disableField(19)" class="form-control" type="text" id="inputEdit19" placeholder="${element.pisPIA}" value="${element.pisPIA}"></input>
                                <button onclick="enableField(19)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-20">
                                <label for="exampleInputEmail1" class="form-label"></label>Reservista:
                                <input disabled onfocusout="disableField(20)" class="form-control" type="text" id="inputEdit20" placeholder="${element.reservistaPIA}" value="${element.reservistaPIA}"></input>
                                <button onclick="enableField(20)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-21">
                                <label for="exampleInputEmail1" class="form-label"></label>Eleitor:
                                <input disabled onfocusout="disableField(21)" class="form-control" type="text" id="inputEdit21" placeholder="${element.eleitorPIA}" value="${element.eleitorPIA}"></input>
                                <button onclick="enableField(21)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-22">
                                <label for="exampleInputEmail1" class="form-label"></label>Seção:
                                <input disabled onfocusout="disableField(22)" class="form-control" type="text" id="inputEdit22" placeholder="${element.secaoPIA}" value="${element.secaoPIA}"></input>
                                <button onclick="enableField(22)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-23">
                                <label for="exampleInputEmail1" class="form-label"></label>Zona:
                                <input disabled onfocusout="disableField(23)" class="form-control" type="text" id="inputEdit23" placeholder="${element.zonaPIA}" value="${element.zonaPIA}"></input>
                                <button onclick="enableField(23)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-24">
                                <label for="exampleInputEmail1" class="form-label"></label>Carteira de trabalho:
                                <input disabled onfocusout="disableField(24)" class="form-control" type="text" id="inputEdit24" placeholder="${element.ctpsPIA}" value="${element.ctpsPIA}"></input>
                                <button onclick="enableField(24)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-25">
                                <label for="exampleInputEmail1" class="form-label"></label>Serie CTPS:
                                <input disabled onfocusout="disableField(25)" class="form-control" type="text" id="inputEdit25" placeholder="${element.serieCtpsPIA}" value="${element.serieCtpsPIA}"></input>
                                <button onclick="enableField(25)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-26">
                                <label for="exampleInputEmail1" class="form-label"></label>Emissão CTPS:
                                <input disabled onfocusout="disableField(26)" class="form-control" type="text" id="inputEdit26" placeholder="${element.emissaoCtpsPIA}" value="${element.emissaoCtpsPIA}"></input>
                                <button onclick="enableField(26)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-27">
                                <label for="exampleInputEmail1" class="form-label"></label>Referência de Referencia:
                                <input disabled onfocusout="disableField(27)" class="form-control" type="text" id="inputEdit27" placeholder="${element.refEndePIA}" value="${element.refEndePIA}"></input>
                                <button onclick="enableField(27)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-28">
                                <label for="exampleInputEmail1" class="form-label"></label>Tipo:
                                <input disabled onfocusout="disableField(28)" class="form-control" type="text" id="inputEdit28" placeholder="${element.tipoPIA}" value="${element.tipoPIA}"></input>
                                <button onclick="enableField(28)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-29">
                                <label for="exampleInputEmail1" class="form-label"></label>Rua:
                                <input disabled onfocusout="disableField(29)" class="form-control" type="text" id="inputEdit29" placeholder="${element.ruaPIA}" value="${element.ruaPIA}"></input>
                                <button onclick="enableField(29)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-30">
                                <label for="exampleInputEmail1" class="form-label"></label>Rua:
                                <input disabled onfocusout="disableField(30)" class="form-control" type="text" id="inputEdit30" placeholder="${element.fonePIA}" value="${element.fonePIA}"></input>
                                <button onclick="enableField(30)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-31">
                                <label for="exampleInputEmail1" class="form-label"></label>Bairro:
                                <input disabled onfocusout="disableField(31)" class="form-control" type="text" id="inputEdit31" placeholder="${element.bairroPIA}" value="${element.bairroPIA}"></input>
                                <button onclick="enableField(31)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-32">
                                <label for="exampleInputEmail1" class="form-label"></label>Municipio:
                                <input disabled onfocusout="disableField(32)" class="form-control" type="text" id="inputEdit32" placeholder="${element.municipioPIA}" value="${element.municipioPIA}"></input>
                                <button onclick="enableField(32)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-33">
                                <label for="exampleInputEmail1" class="form-label"></label>Profissao:
                                <input disabled onfocusout="disableField(33)" class="form-control" type="text" id="inputEdit33" placeholder="${element.profissaoPIA}" value="${element.profissaoPIA}"></input>
                                <button onclick="enableField(33)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-34">
                                <label for="exampleInputEmail1" class="form-label"></label>Tipo de trabalho:
                                <input disabled onfocusout="disableField(34)" class="form-control" type="text" id="inputEdit34" placeholder="${element.attProfPIA}" value="${element.attProfPIA}"></input>
                                <button onclick="enableField(34)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-35">
                                <label for="exampleInputEmail1" class="form-label"></label>Tipo de atividade:
                                <input disabled onfocusout="disableField(35)" class="form-control" type="text" id="inputEdit35" placeholder="${element.tipoAttProfPIA}" value="${element.tipoAttProfPIA}"></input>
                                <button onclick="enableField(35)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-36">
                                <label for="exampleInputEmail1" class="form-label"></label>Renda Mensal:
                                <input disabled onfocusout="disableField(36)" class="form-control" type="text" id="inputEdit36" placeholder="${element.rendaMensalPIA}" value="${element.rendaMensalPIA}"></input>
                                <button onclick="enableField(36)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-37">
                                <label for="exampleInputEmail1" class="form-label"></label>PTRS:
                                <input disabled onfocusout="disableField(37)" class="form-control" type="text" id="inputEdit37" placeholder="${element.PTRS}" value="${element.PTRS}"></input>
                                <button onclick="enableField(37)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-38">
                                <label for="exampleInputEmail1" class="form-label"></label>Empresa:
                                <input disabled onfocusout="disableField(38)" class="form-control" type="text" id="inputEdit38" placeholder="${element.empresaPIA}" value="${element.empresaPIA}"></input>
                                <button onclick="enableField(38)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-39">
                                <label for="exampleInputEmail1" class="form-label"></label>Beneficio:
                                <input disabled onfocusout="disableField(39)" class="form-control" type="text" id="inputEdit39" placeholder="${element.beneficioPIA}" value="${element.beneficioPIA}"></input>
                                <button onclick="enableField(39)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-40">
                                <label for="exampleInputEmail1" class="form-label"></label>Valor do beneficio:
                                <input disabled onfocusout="disableField(40)" class="form-control" type="text" id="inputEdit40" placeholder="${element.valorBenePIA}" value="${element.valorBenePIA}"></input>
                                <button onclick="enableField(40)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-41">
                                <label for="exampleInputEmail1" class="form-label"></label>Deficiencia:
                                <input disabled onfocusout="disableField(41)" class="form-control" type="text" id="inputEdit41" placeholder="${element.deficienciaPIA}" value="${element.deficienciaPIA}"></input>
                                <button onclick="enableField(41)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-42">
                                <label for="exampleInputEmail1" class="form-label"></label>Especifique:
                                <input disabled onfocusout="disableField(42)" class="form-control" type="text" id="inputEdit42" placeholder="${element.expeDefiPIA}" value="${element.expeDefiPIA}"></input>
                                <button onclick="enableField(42)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-43">
                                <label for="exampleInputEmail1" class="form-label"></label>Problema de saúde?
                                <input disabled onfocusout="disableField(43)" class="form-control" type="text" id="inputEdit43" placeholder="${element.probleSauPIA}" value="${element.probleSauPIA}"></input>
                                <button onclick="enableField(43)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-44">
                                <label for="exampleInputEmail1" class="form-label"></label>Especifique:
                                <input disabled onfocusout="disableField(44)" class="form-control" type="text" id="inputEdit44" placeholder="${element.especiSauPIA}" value="${element.especiSauPIA}"></input>
                                <button onclick="enableField(44)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-45">
                                <label for="exampleInputEmail1" class="form-label"></label>Faz uso de medicações?
                                <input disabled onfocusout="disableField(45)" class="form-control" type="text" id="inputEdit45" placeholder="${element.medicacoesProblePIA}" value="${element.medicacoesProblePIA}"></input>
                                <button onclick="enableField(45)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-46">
                                <label for="exampleInputEmail1" class="form-label"></label>É dependente quimico?
                                <input disabled onfocusout="disableField(46)" class="form-control" type="text" id="inputEdit46" placeholder="${element.depQuimicoPIA}" value="${element.depQuimicoPIA}"></input>
                                <button onclick="enableField(46)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-47">
                                <label for="exampleInputEmail1" class="form-label"></label>Qual droga?
                                <input disabled onfocusout="disableField(47)" class="form-control" type="text" id="inputEdit47" placeholder="${element.drogasDepPIA}" value="${element.drogasDepPIA}"></input>
                                <button onclick="enableField(47)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-48">
                                <label for="exampleInputEmail1" class="form-label"></label>Tempo de rua:
                                <input disabled onfocusout="disableField(48)" class="form-control" type="text" id="inputEdit48" placeholder="${element.temRuaPIA}" value="${element.temRuaPIA}"></input>
                                <button onclick="enableField(48)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-49">
                                <label for="exampleInputEmail1" class="form-label"></label>Motivo:
                                <input disabled onfocusout="disableField(49)" class="form-control" type="text" id="inputEdit49" placeholder="${element.motivoTempRuaPIA}" value="${element.motivoTempRuaPIA}"></input>
                                <button onclick="enableField(49)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-50">
                                <label for="exampleInputEmail1" class="form-label"></label>Procedencia:
                                <input disabled onfocusout="disableField(50)" class="form-control" type="text" id="inputEdit50" placeholder="${element.proceMotiTempRuaPIA}" value="${element.proceMotiTempRuaPIA}"></input>
                                <button onclick="enableField(50)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-51">
                                <label for="exampleInputEmail1" class="form-label"></label>Já esteve em outro centro de acolhida?
                                <input disabled onfocusout="disableField(51)" class="form-control" type="text" id="inputEdit51" placeholder="${element.centAcolhiPIA}" value="${element.centAcolhiPIA}"></input>
                                <button onclick="enableField(51)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-52">
                                <label for="exampleInputEmail1" class="form-label"></label>Tem compromisso judicial?
                                <input disabled onfocusout="disableField(52)" class="form-control" type="text" id="inputEdit52" placeholder="${element.comproJudiPIA}" value="${element.comproJudiPIA}"></input>
                                <button onclick="enableField(52)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-53">
                                <label for="exampleInputEmail1" class="form-label"></label>Qual?:
                                <input disabled onfocusout="disableField(53)" class="form-control" type="text" id="inputEdit53" placeholder="${element.qualComproJudiPIA}" value="${element.qualComproJudiPIA}"></input>
                                <button onclick="enableField(53)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
                            </div>
                            <div class="mb-54">
                                <label for="exampleInputEmail1" class="form-label"></label>Proposta Inicial:
                                <input disabled onfocusout="disableField(54)" class="form-control" type="text" id="inputEdit54" placeholder="${element.propInicialPIA}" value="${element.propInicialPIA}"></input>
                                <button onclick="enableField(54)" class="buttonEdi"><i class="bi bi-pencil-fill"></i></button>
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
    if(element.IDPIA == id){
        document.getElementById("modalViewPIA").innerHTML = editarDo;
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
    const nomePIA1 = document.getElementById('inputEdit1').value;
    const nomeSocPIA1 = document.getElementById('inputEdit2').value;
    const tecPIA1 = document.getElementById('inputEdit3').value;
    const filiacaoPIA1 = document.getElementById('inputEdit4').value;
    const datanascPIA1 = document.getElementById('inputEdit5').value;
    const localPIA1 = document.getElementById('inputEdit6').value;
    const sexoPIA1 = document.getElementById('inputEdit7').value; //VER DEPOIS
    const estadoCivilPIA1 = document.getElementById('inputEdit8').value;
    const racaPIA1 = document.getElementById('inputEdit9').value; //VER DEPOIS
    const religiaoPIA1 = document.getElementById('inputEdit10').value;
    const escolaridadePIA1 = document.getElementById('inputEdit11').value; 
    const rgPIA1 = document.getElementById('inputEdit12').value;
    const emissaoPIA1 = document.getElementById('inputEdit13').value;
    const orgaoDocPIA1 = document.getElementById('inputEdit14').value; 
    const certPIA1 = document.getElementById('inputEdit15').value;
    const livroPIA1 = document.getElementById('inputEdit16').value;
    const folhaPIA1 = document.getElementById('inputEdit17').value;
    const cpfPIA1 = document.getElementById('inputEdit18').value;
    const pisPIA1 = document.getElementById('inputEdit19').value;
    const reservistaPIA1 = document.getElementById('inputEdit20').value;
    const eleitorPIA1 = document.getElementById('inputEdit21').value;
    const secaoPIA1 = document.getElementById('inputEdit22').value;
    const zonaPIA1 = document.getElementById('inputEdit23').value;
    const ctpsPIA1 = document.getElementById('inputEdit24').value;
    const serieCtpsPIA1 = document.getElementById('inputEdit25').value;
    const emissaoCtpsPIA1 = document.getElementById('inputEdit26').value;
    const refEndePIA1 = document.getElementById('inputEdit27').value;
    const tipoPIA1 = document.getElementById('inputEdit28').value;
    const ruaPIA1 = document.getElementById('inputEdit29').value;
    const fonePIA1 = document.getElementById('inputEdit30').value;
    const bairroPIA1 = document.getElementById('inputEdit31').value;
    const municipioPIA1 = document.getElementById('inputEdit32').value;
    const profissaoPIA1 = document.getElementById('inputEdit33').value;
    const attProfPIA1 = document.getElementById('inputEdit34').value; //VER DEPOIS TIPOS DE TRABALHO
    const tipoAttProfPIA1 = document.getElementById('inputEdit35').value; //QUAL ATIVIDADE PROFISSIONAL
    const rendaMensalPIA1 = document.getElementById('inputEdit36').value;
    const PTRS1 = document.getElementById('inputEdit37').value; //VER DEPOIS PTRS
    const empresaPIA1 = document.getElementById('inputEdit38').value;
    const beneficioPIA1 = document.getElementById('inputEdit39').value; //VER DEPOIS BENEFICIO
    const valorBenePIA1 = document.getElementById('inputEdit40').value;
    const deficienciaPIA1 = document.getElementById('inputEdit41').value; //VER DEPOIS DEFICIENCIA
    const expeDefiPIA1 = document.getElementById('inputEdit42').value;
    const probleSauPIA1 = document.getElementById('inputEdit43').value; //VER DEPOIS SAUDE
    const especiSauPIA1 = document.getElementById('inputEdit44').value;
    const medicacoesProblePIA1 = document.getElementById('inputEdit45').value;
    const depQuimicoPIA1 = document.getElementById('inputEdit46').value; //VER DEPOIS DEPENDENTE QUIMICO
    const drogasDepPIA1 = document.getElementById('inputEdit47').value;
    const temRuaPIA1 = document.getElementById('inputEdit48').value;
    const motivoTempRuaPIA1 = document.getElementById('inputEdit49').value; //VER DEPOIS MOTIVO RUA
    const proceMotiTempRuaPIA1 = document.getElementById('inputEdit50').value;
    const centAcolhiPIA1 = document.getElementById('inputEdit51').value;
    const comproJudiPIA1 = document.getElementById('inputEdit52').value; //VER DEPOIS JURIDICO
    const qualComproJudiPIA1 = document.getElementById('inputEdit53').value;
    const propInicialPIA1 = document.getElementById('inputEdit54').value;

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3081/piaupdate',
        data: {IDPIA: id,
            nomePIA: nomePIA1,
            nomeSocPIA: nomeSocPIA1,
            tecPIA: tecPIA1,
            filiacaoPIA: filiacaoPIA1,
            datanascPIA: datanascPIA1,
            localPIA: localPIA1,
            sexoPIA: sexoPIA1,
            estadoCivilPIA: estadoCivilPIA1,
            racaPIA: racaPIA1,
            religiaoPIA: religiaoPIA1,
            escolaridadePIA: escolaridadePIA1,
            rgPIA: rgPIA1,
            emissaoPIA: emissaoPIA1,
            orgaoDocPIA: orgaoDocPIA1,
            certPIA: certPIA1,
            livroPIA: livroPIA1,
            folhaPIA: folhaPIA1,
            cpfPIA: cpfPIA1,
            pisPIA: pisPIA1,
            reservistaPIA: reservistaPIA1,
            eleitorPIA: eleitorPIA1,
            secaoPIA: secaoPIA1,
            zonaPIA: zonaPIA1,
            ctpsPIA: ctpsPIA1,
            serieCtpsPIA: serieCtpsPIA1,
            emissaoCtpsPIA: emissaoCtpsPIA1,
            refEndePIA: refEndePIA1,
            tipoPIA: tipoPIA1,
            ruaPIA: ruaPIA1,
            fonePIA: fonePIA1,
            bairroPIA: bairroPIA1,
            municipioPIA: municipioPIA1,
            profissaoPIA: profissaoPIA1,
            attProfPIA: attProfPIA1,
            tipoAttProfPIA: tipoAttProfPIA1,
            rendaMensalPIA: rendaMensalPIA1,
            PTRS: PTRS1,
            empresaPIA: empresaPIA1,
            beneficioPIA: beneficioPIA1,
            valorBenePIA: valorBenePIA1,
            deficienciaPIA: deficienciaPIA1,
            expeDefiPIA: expeDefiPIA1,
            probleSauPIA: probleSauPIA1,
            especiSauPIA: especiSauPIA1,
            medicacoesProblePIA: medicacoesProblePIA1,
            depQuimicoPIA: depQuimicoPIA1,
            drogasDepPIA: drogasDepPIA1,
            temRuaPIA: temRuaPIA1,
            motivoTempRuaPIA: motivoTempRuaPIA1,
            proceMotiTempRuaPIA: proceMotiTempRuaPIA1,
            centAcolhiPIA: centAcolhiPIA1,
            comproJudiPIA: comproJudiPIA1,
            qualComproJudiPIA: qualComproJudiPIA1,
            propInicialPIA: propInicialPIA1,
        },
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
        url: "http://127.0.0.1:3081/piaselect",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const divvv = `
        <div id="myModal`+id+`"class="modal customizar">
        <div class="modal-dialog" role="document">
        <div class="modal-content customize">
            <div class="modal-body">
            <div class="mb-1">
            <label for="exampleInputEmail1" class="form-label"></label>Nome:
            <p class="textAA">${element.nomePIA}</p>
          </div>
          <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label"></label>Nome Social:
            <p class="textAA">${element.nomeSocPIA}</p>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"></label>Técnico:
            <p class="textAA">${element.tecPIA}</p>
          </div>
          <div class="mb-4">
            <label for="exampleInputEmail1" class="form-label"></label>Filiaçao:
            <p class="textAA">${element.filiacaoPIA}</p>
          </div>
          <div class="mb-4">
            <label for="exampleInputEmail1" class="form-label"></label>Data de nascimento:
            <p class="textAA">${element.datanascPIA}</p>
          </div>
          <div class="mb-6">
            <label for="exampleInputEmail1" class="form-label"></label>Local:
            <p class="textAA">${element.localPIA}</p>
          </div>
          <div class="mb-7">
            <label for="exampleInputEmail1" class="form-label"></label>Sexo:
            <p class="textAA">${element.sexoPIA}</p>
          </div>
          <div class="mb-8">
            <label for="exampleInputEmail1" class="form-label"></label>Estado Civil:
            <p class="textAA">${element.estadoCivilPIA}</p>
          </div>
          <div class="mb-9">
            <label for="exampleInputEmail1" class="form-label"></label>Raça:
            <p class="textAA">${element.racaPIA}</p>
          </div>
          <div class="mb-10">
            <label for="exampleInputEmail1" class="form-label"></label>Religião:
            <p class="textAA">${element.religiaoPIA}</p>
          </div>
          <div class="mb-11">
            <label for="exampleInputEmail1" class="form-label"></label>Escolaridade:
            <p class="textAA">${element.escolaridadePIA}</p>
          </div>
          <div class="mb-12">
            <label for="exampleInputEmail1" class="form-label"></label>RG:
            <p class="textAA">${element.rgPIA}</p>
          </div>
          <div class="mb-13">
            <label for="exampleInputEmail1" class="form-label"></label>Emissão:
            <p class="textAA">${element.emissaoPIA}</p>
          </div>
          <div class="mb-14">
            <label for="exampleInputEmail1" class="form-label"></label>Orgão:
            <p class="textAA">${element.orgaoDocPIA}</p>
          </div>
          <div class="mb-15">
            <label for="exampleInputEmail1" class="form-label"></label>Certidão de Nascimento/Casamento:
            <p class="textAA">${element.certPIA}</p>
          </div>
          <div class="mb-16">
            <label for="exampleInputEmail1" class="form-label"></label>Livro:
            <p class="textAA">${element.livroPIA}</p>
          </div>
          <div class="mb-17">
            <label for="exampleInputEmail1" class="form-label"></label>Folha:
            <p class="textAA">${element.folhaPIA}</p>
          </div>
          <div class="mb-18">
            <label for="exampleInputEmail1" class="form-label"></label>CPF:
            <p class="textAA">${element.cpfPIA}</p>
          </div>
          <div class="mb-19">
            <label for="exampleInputEmail1" class="form-label"></label>PIS:
            <p class="textAA">${element.pisPIA}</p>
          </div>
          <div class="mb-20">
            <label for="exampleInputEmail1" class="form-label"></label>Reservista:
            <p class="textAA">${element.reservistaPIA}</p>
          </div>
          <div class="mb-21">
            <label for="exampleInputEmail1" class="form-label"></label>Eleitor:
            <p class="textAA">${element.eleitorPIA}</p>
          </div>
          <div class="mb-22">
            <label for="exampleInputEmail1" class="form-label"></label>Seção:
            <p class="textAA">${element.secaoPIA}</p>
          </div>
          <div class="mb-23">
            <label for="exampleInputEmail1" class="form-label"></label>Zona:
            <p class="textAA">${element.zonaPIA}</p>
          </div>
          <div class="mb-24">
            <label for="exampleInputEmail1" class="form-label"></label>Carteira de trabalho:
            <p class="textAA">${element.ctpsPIA}</p>
          </div>
          <div class="mb-25">
            <label for="exampleInputEmail1" class="form-label"></label>Série:
            <p class="textAA">${element.serieCtpsPIA}</p>
          </div>
          <div class="mb-26">
            <label for="exampleInputEmail1" class="form-label"></label>Emissão CTPS:
            <p class="textAA">${element.emissaoCtpsPIA}</p>
          </div>
          <div class="mb-27">
            <label for="exampleInputEmail1" class="form-label"></label>Referencia de endereço:
            <p class="textAA">${element.refEndePIA}</p>
          </div>
          <div class="mb-28">
            <label for="exampleInputEmail1" class="form-label"></label>Tipo:
            <p class="textAA">${element.tipoPIA}</p>
          </div>
          <div class="mb-29">
            <label for="exampleInputEmail1" class="form-label"></label>Rua:
            <p class="textAA">${element.ruaPIA}</p>
          </div>
          <div class="mb-30">
            <label for="exampleInputEmail1" class="form-label"></label>Fone:
            <p class="textAA">${element.fonePIA}</p>
          </div>
          <div class="mb-31">
            <label for="exampleInputEmail1" class="form-label"></label>Bairro:
            <p class="textAA">${element.bairroPIA}</p>
          </div>
          <div class="mb-32">
            <label for="exampleInputEmail1" class="form-label"></label>Municipio:
            <p class="textAA">${element.municipioPIA}</p>
          </div>
          <div class="mb-33">
            <label for="exampleInputEmail1" class="form-label"></label>Profissão:
            <p class="textAA">${element.profissaoPIA}</p>
          </div>
          <div class="mb-34">
            <label for="exampleInputEmail1" class="form-label"></label>Tipo de trabalho:
            <p class="textAA">${element.attProfPIA}</p>
          </div>
          <div class="mb-35">
            <label for="exampleInputEmail1" class="form-label"></label>Atividade Profissional:
            <p class="textAA">${element.tipoAttProfPIA}</p>
          </div>
          <div class="mb-36">
            <label for="exampleInputEmail1" class="form-label"></label>Renda Mensal:
            <p class="textAA">${element.rendaMensalPIA}</p>
          </div>
          <div class="mb-37">
            <label for="exampleInputEmail1" class="form-label"></label>PTRS:
            <p class="textAA">${element.PTRS}</p>
          </div>
          <div class="mb-38">
            <label for="exampleInputEmail1" class="form-label"></label>Empresa:
            <p class="textAA">${element.empresaPIA}</p>
          </div>
          <div class="mb-39">
            <label for="exampleInputEmail1" class="form-label"></label>Beneficio:
            <p class="textAA">${element.beneficioPIA}</p>
          </div>
          <div class="mb-40">
            <label for="exampleInputEmail1" class="form-label"></label>Valor do Beneficio:
            <p class="textAA">${element.valorBenePIA}</p>
          </div>
          <div class="mb-41">
            <label for="exampleInputEmail1" class="form-label"></label>Deficiencia:
            <p class="textAA">${element.deficienciaPIA}</p>
          </div>
          <div class="mb-42">
            <label for="exampleInputEmail1" class="form-label"></label>Especifique a deficiencia:
            <p class="textAA">${element.expeDefiPIA}</p>
          </div>
          <div class="mb-43">
            <label for="exampleInputEmail1" class="form-label"></label>Problemas de saúde:
            <p class="textAA">${element.probleSauPIA}</p>
          </div>
          <div class="mb-44">
            <label for="exampleInputEmail1" class="form-label"></label>Especifique problema de saúde:
            <p class="textAA">${element.especiSauPIA}</p>
          </div>
          <div class="mb-45">
            <label for="exampleInputEmail1" class="form-label"></label>Faz usos de medicações?
            <p class="textAA">${element.medicacoesProblePIA}</p>
          </div>
          <div class="mb-46">
            <label for="exampleInputEmail1" class="form-label"></label>É dependende quimico?
            <p class="textAA">${element.depQuimicoPIA}</p>
          </div>
          <div class="mb-47">
            <label for="exampleInputEmail1" class="form-label"></label>Qual droga?
            <p class="textAA">${element.drogasDepPIA}</p>
          </div>
          <div class="mb-48">
            <label for="exampleInputEmail1" class="form-label"></label>Tempo na rua:
            <p class="textAA">${element.temRuaPIA}</p>
          </div>
          <div class="mb-49">
            <label for="exampleInputEmail1" class="form-label"></label>Motivo:
            <p class="textAA">${element.motivoTempRuaPIA}</p>
          </div>
          <div class="mb-50">
            <label for="exampleInputEmail1" class="form-label"></label>Procedencia:
            <p class="textAA">${element.proceMotiTempRuaPIA}</p>
          </div>
          <div class="mb-51">
            <label for="exampleInputEmail1" class="form-label"></label>Já esteve em outro centro de acolhida?
            <p class="textAA">${element.centAcolhiPIA}</p>
          </div>
          <div class="mb-52">
            <label for="exampleInputEmail1" class="form-label"></label>Tem compromisso judicial?
            <p class="textAA">${element.comproJudiPIA}</p>
          </div>
          <div class="mb-53">
            <label for="exampleInputEmail1" class="form-label"></label>Qual?
            <p class="textAA">${element.qualComproJudiPIA}</p>
          </div>
          <div class="mb-54">
            <label for="exampleInputEmail1" class="form-label"></label>Proposta Inicial:
            <p class="textAA">${element.propInicialPIA}</p>
          </div>
            </div>
            <div class="modal-footer">
            <button onclick="fecharform(${id})" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar formulário</button>
            </div>
        </div>
        </div>
    </div>
    `
    if(element.IDPIA == id){
        document.getElementById("modalViewPIA").innerHTML = divvv;
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


function upBeneficio() {
    var selectBene = document.getElementById('benefPIA');
    var valueBene = selectBene.options[selectBene.selectedIndex].value;

    if(valueBene == "Aposentado" || valueBene == "Aposentado por invalidez" || valueBene == "Beneficiario BPC"){
        document.getElementById("valorbene").disabled = false;
    } else {document.getElementById("valorbene").disabled = true;}
};

function upDeficiencia() {
    var selectDef = document.getElementById('deficienciaPIA');
    var valueDef = selectDef.options[selectDef.selectedIndex].value;

    if(valueDef == "Deficiente Físico" || valueDef == "Transtornos de Ordem Psíquica"){
        document.getElementById("especifiqueDefi").disabled = false;
    } else {document.getElementById("especifiqueDefi").disabled = true;}
};

function upSaude() {
    var selectSau = document.getElementById('problemSauPIA');
    var valueSau = selectSau.options[selectSau.selectedIndex].value;

    if(valueSau == "Sim"){
        document.getElementById("especSaude").disabled = false;
        document.getElementById("medSaud").disabled = false;
    } else {document.getElementById("medSaud").disabled = true;
    document.getElementById("especSaude").disabled = true;}
};

function upDep() {
    var selectQui = document.getElementById('dpQuiPIA');
    var valueQui = selectQui.options[selectQui.selectedIndex].value;

    if(valueQui == "Sim"){
        document.getElementById("inputDrogas").disabled = false;
    } else {document.getElementById("inputDrogas").disabled = true;}
};

function update() {
    var select = document.getElementById('juridicoPIA');
    var value = select.options[select.selectedIndex].value;

    if(value == "Sim"){
        document.getElementById("inputJudicial").disabled = false;
    } else {document.getElementById("inputJudicial").disabled = true;}

}