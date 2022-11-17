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

        console.log(devices);    
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
          <tr data-bs-toggle="modal" data-bs-target="exampleModal${id}" id="tableRow">
          <td class="fs-6">${id}"</td>
          <td class="fs-6">${tipo}</td>
          <td class="fs-6">${patrimonio}</td>
          <td class="fs-6 d-none d-md-table-cell">${sala}</td>
          <td class="fs-6"><button class="buttonLog" id="${id}" onclick="adminModal()">Clique</button></td>

        ${adminModal(device)}
        `;
      })
    : (table.innerHTML = ``);
};

//ADMIN MODAL edit
const adminModal = (device) => {
  const { id, tipo, patrimonio, sala} = device;

  return `<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;
};
;
  
  
