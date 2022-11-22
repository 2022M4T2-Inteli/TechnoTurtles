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

      renderAdmins(devices);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getDevices();

const renderAdmins = (list) => {
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
              <input class="form-control border" id="adminDonation${id}" disabled=true value="${patrimonio}"></input>
            </div>
          </div>
        </div>

        <!-- Localizacao sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Localização</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="adminDate${id}" disabled=true value="${localizacao}"></input>
            </div>
          </div>
        </div>

        
        <!-- Endereco sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Endereço</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="adminContact${id}" disabled=true value="${endereco}"></input>
            </div>
          </div>
        </div>

        <!-- Status sec -->
        <div class="form-group mb-2">
          <label for="exampleInputEmail1" class="fs-4">Status</label>
          <div class="d-flex flex-row justify-content-between">
            <div class='col-12'>
              <input class="form-control border" id="adminPassword${id}" value="${status}" disabled=true></input>
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
        
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;
};

const updateAdmin = (id) => {
  if (confirm("Deseja mesmo atualizar os dados?")) {
    let name = document.getElementById("tipo" + id);
    let type = document.getElementById("adminType" + id);
    let donation = document.getElementById("adminDonation" + id);
    let date = document.getElementById("adminDate" + id);
    let contact = document.getElementById("adminContact" + id);
    let status = document.getElementById("adminStatus" + id);

    let updatedAdmin = {
      name: name.value,
      type: type.value,
      donation: donation.value,
      date: date.value,
      contact: contact.value,
      status: status.value,
      id: id,
    };

    axios
      .put(url + `/api/admin/${id}`, updatedAdmin)
      .then((response) => {
        getAdmins();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const toggleInputs = (number) => {
  let ids = [
    "tipo",
    "adminDonation",
    "adminDate",
    "adminContact",
    "adminPassword",
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