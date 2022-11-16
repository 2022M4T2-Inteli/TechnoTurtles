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
          <td class="fs-6">${id}"</td>
          <td class="fs-6">${tipo}</td>
          <td class="fs-6">${patrimonio}</td>
          <td class="fs-6 d-none d-md-table-cell">${sala}</td>
          </tr>`;
        })
      : (table.innerHTML = ``);
  };
  