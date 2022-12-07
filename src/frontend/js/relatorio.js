const PORT = 3000;
const url = `http://localhost:${PORT}`;

//table get devices

const getDevices = () => {
  axios
    .get(url + `/devices`)
    .then((response) => {
      const devices = [];
      response.data.forEach((device) => {
        devices.push(device);
      });

      document.getElementById("resultado").innerHTML = "";

      renderDevices(devices);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getDevices();

//table render devices on the screen
const renderDevices = (list) => {
  const table = document.getElementById("resultado");

  list.length > 0
    ? list.map((device) => {
      const { id, tipo, patrimonio, localizacao, endereco, status } = device;

      table.innerHTML += `
          <tr data-bs-toggle="modal" data-bs-target="exampleModal${id}" id="tableRow">
          <td class="fs-6">${id}"</td>
          <td class="fs-6">${tipo}</td>
          <td class="fs-6">${patrimonio}</td>
          <td class="fs-6">${localizacao}</td>
          <td class="fs-6">${endereco}</td>
          <td class="fs-6">${status}</td>
          <td class="fs-6"><button class="buttonLog" id="tableRow" data-bs-toggle="modal" data-bs-target="#exampleModal${id}">Clique</button></td>
          </tr>

        ${modal(device)}
        `;
    })
    : (table.innerHTML = ``);
};

//ADMIN MODAL edit

const modal = (device) => {
  const { id, tipo, patrimonio, localizacao, endereco, status } = device;

  return `
  <!-- Modal -->
  <div class="modal fade" id="exampleModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Dispositivo ${patrimonio}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

        <!-- Tipo sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Tipo</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="tipo${id}" disabled=true value="${tipo}"..."></input>
            </div>
          </div>
        </div>

        <!-- Patrimonio sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Patrimônio</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="patrimonio${id}" disabled=true value="${patrimonio}"></input>
            </div>
          </div>
        </div>

        <!-- Localizacao sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Localização</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="localizacao${id}" disabled=true value="${localizacao}"></input>
            </div>
          </div>
        </div>

        
        <!-- Endereco sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Endereço</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="endereco${id}" disabled=true value="${endereco}"></input>
            </div>
          </div>
        </div>

        <!-- Status sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Status</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="status${id}" value="${status}" disabled=true></input>
            </div>
          </div>
        </div>

        <div class='col-12 mt-2 d-flex justify-content-center align-items-center'>
        <button type="button" class="col-5 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${id});">
        <span id="btnText${id}" class="fs-6">Habilitar edição </span>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        </button>
      </div>
        </div>

        <div class="modal-footer">
        
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-warning mx-auto" onclick="updateDevice(${id});" id="updateButton${id}" data-bs-dismiss="modal" disabled='true'>Atualizar</button>
          <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between" data-bs-dismiss="modal" onclick="deleteDevice(${id})"> Deletar</button>
        </div>
      </div>
    </div>
  </div>`;
};

const updateDevice = (id) => {
  if (confirm("Deseja mesmo atualizar os dados?")) {
    let tipo = document.getElementById("tipo" + id);
    let patrimonio = document.getElementById("patrimonio" + id);
    let endereco = document.getElementById("endereco" + id);
    let status = document.getElementById("status" + id);
    let localizacao = document.getElementById("localizacao" + id);


    let updatedDevice = {
      tipo: tipo.value,
      patrimonio: patrimonio.value,
      endereco: endereco.value,
      status: status.value,
      localizacao: localizacao.value,
      id: id,
    };

    axios
      .put(url + `/device/${id}`, updatedDevice)
      .then((response) => {
        getDevices();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const deleteDevice = (id) => {
  if (confirm("Deseja mesmo deletar?")) {
    axios
      .delete(url + `/device/${id}`)
      .then((response) => {
        getDevices();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const toggleInputs = (number) => {
  let ids = [
    "tipo",
    "patrimonio",
    "endereco",
    "status",
    "updateButton",
  ];
  let buttonText = document.getElementById(`btnText${number}`);

  let inputs = ids.map((id) => document.getElementById(id + number));
  inputs.map((input) => {
    input.disabled = !input.disabled;
    buttonText.innerText = input.disabled
      ? "Habilitar edição"
      : "Desabilitar edição";
  });
};


function typeFilter() {
  var select, input, filter, table, tr, td, i, txtValue;

  select = document.getElementById('searchInput');
  input = select.options[select.selectedIndex];

  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  if (input != "") {
    for (i = 0; i < tr.length; i++) {
      //search in the first column, if the text is found, search in the second column
      td = tr[i].getElementsByTagName("td")[1];
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
}

function searchFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById('exploreInput');

  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  if (input != "") {
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
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
}

function download() {
  // principal função dessa função é de baixar o relatório em csv ou excel, mas coloquei aqui pra chamar o modal

  Swal.fire(
    'Relatório',
    'Fazendo download do relatório...',
    'info'
  )
}