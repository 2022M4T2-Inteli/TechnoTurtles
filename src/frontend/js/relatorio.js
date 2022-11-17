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
          const { id, tipo, patrimonio, sala} = device;
  
          table.innerHTML += `
          <td class="fs-6">${id}"</td>
          <td class="fs-6">${tipo}</td>
          <td class="fs-6">${patrimonio}</td>
          <td class="fs-6 d-none d-md-table-cell">${sala}</td>
          <td class="fs-6"><button class="buttonLog" id="${id}">Clique</button></td>
          </tr>`;
        })
      : (table.innerHTML = ``);
  };
  

  const modal = (assisted) => {
    const {
      name,
      nickname,
      place,
      time,
      approachDate,
      beingAttended,
      observation,
      reason,
      responsibleId,
      assistedId,
    } = assisted;
  
    return `
      <div class="modal fade" id="exampleModal${assistedId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title fs-3" id="exampleModalLabel">
                #${assistedId} ${nickname} 
              </p>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
              <div class="row">
                <div class="col-md-12">
                  <!-- Name sec -->
                  <div class="form-group mb-2">
                    <label for="exampleInputEmail1" class="fs-4">Nome</label>
                    <div class="d-flex flex-row justify-content-between">
                      <div class='col-12'>
                        <input type="text" class="form-control" id="nameInput${assistedId}" aria-describedby="emailHelp" placeholder="Não informado..." value="${name == "" || name == null ? "" : name
      }" disabled='true'>
                      </div>
                      </div>
                  </div>
                  <!-- Nickname sec -->
                  <div class="form-group mb-2">
                    <label for="exampleInputEmail1" class="fs-4">Apelido / nome fornecido</label>
                    <div class="d-flex flex-row justify-content-between">
                      <div class='col-12'>
                        <input type="text" class="form-control" id="nicknameInput${assistedId}" aria-describedby="emailHelp" placeholder="Apelido / Nome fornecido" value=${nickname} disabled='true'>
                      </div>
                      </div>
                  </div>
                  <!-- Approach date sec -->
                  <div class="form-group mb-2">
                    <label for="exampleInputEmail1" class="fs-4">Data de abordagem</label>
                    <div class="d-flex flex-row justify-content-between">
                      <div class='col-12'>
                        <input type="date" class="form-control" id="approachDateInput${assistedId}" aria-describedby="emailHelp" placeholder="Data de abordagem" value=${approachDate} disabled='true'>
                      </div>
                      </div>
                  </div>
                  <!-- Place sec -->
                  <div class="form-group mb-2">
                    <label for="exampleInputEmail1" class="fs-4">Local de abordagem</label>
                    <div class="d-flex flex-row justify-content-between">
                      <div class='col-12'>
                        <input type="text" class="form-control" id="placeInput${assistedId}" aria-describedby="emailHelp" placeholder="Local de abordagem" value=${place} disabled='true'>
                      </div>
                    </div>
                  </div>
                  <!-- Time sec -->
                  <div class="form-group mb-2">
                    <label for="exampleInputEmail1" class="fs-4">Tempo em situação de rua</label>
                    <div class="d-flex flex-row justify-content-between">
                      <div class='col-12'>
                        <input type="date" class="form-control" id="timeInput${assistedId}" aria-describedby="emailHelp" placeholder="Tempo em situação de rua" value=${time} disabled>
                      </div>
                    </div>
                  </div>
                  <!-- beingAttended sec -->
                  <div class="form-group mb-2">
                    <label for="exampleInputEmail1" class="fs-4">Está sendo atendido</label>
                    <div class="d-flex flex-row justify-content-between">
                      <div class='col-12'>
                      <select name="beingAttended" id="beingAttended${assistedId}" class="form-select" aria-label="Default select example" disabled="true">
                        <option
                          value="1"
                          selected="${beingAttended === 1 ? "selected" : ""}"
                        >Sim</option>
                        <option 
                          selected=${beingAttended === 0 ? "selected" : ""}
                          value="0"
                        >Não</option>
                      </select>
                      </div>
                    </div>
                  </div>
                  
                </div>              
            </div>
            <div class='col-12 my-4 d-flex justify-content-center align-items-center'>
              <button type="button" class="col-5 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${assistedId});">
                <span id="btnText${assistedId}" class="fs-6">Habilitar edição </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
            </div>
          </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning mx-auto" onclick="updateUser(${assistedId});" disabled='true' id="updateButton${assistedId}">Atualizar</button>
              <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between"
              data-bs-dismiss="modal"
            onclick="deleteUser(${assistedId})">
              Deletar 
              <img src="../../frontend/images/trash-2.svg" alt="Deletar" height="16" class="d-inline-block align-text-top" />
            </button>
              
              <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };
