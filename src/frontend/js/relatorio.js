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
          const { id, tipo, patrimonio, sala, endereco} = device;
  
          table.innerHTML += `
          <tr data-bs-toggle="modal" data-bs-target="exampleModal${id}" id="tableRow">
          <td class="fs-6">${id}"</td>
          <td class="fs-6">${tipo}</td>
          <td class="fs-6">${patrimonio}</td>
          <td class="fs-6">${endereco}</td>
          <td class="fs-6 d-none d-md-table-cell">${sala}</td>
          <td class="fs-6"><button class="buttonLog" id="${id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Clique</button></td>
          </tr>

        ${adminModal(device)}
        `;
      })
    : (table.innerHTML = ``);
};

//ADMIN MODAL edit

function adminModal(){
  return  `
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          teste
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;
};
;
  
  
