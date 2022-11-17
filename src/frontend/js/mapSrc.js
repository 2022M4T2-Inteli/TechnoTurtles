$(() => {
  $('button.map.0').css("opacity", "100%");
  $('#vector-map').dxVectorMap({
    maxZoomFactor: 4,
    projection: {
      to(coordinates) {
        return [coordinates[0] / 500, coordinates[1] / 500];
      },

      from(coordinates) {
        return [coordinates[0] * 500, coordinates[1] * 500];
      },
    },
    layers: [{
      hoverEnabled: false,
      dataSource: buildingData,
      name: 'building',
    },
    {
      color: 'orange',
      opacity: '40%',
      onclick() { alert("") },
      borderWidth: 1,
      label: {
        enabled: true,
        dataField: 'name',
      },
      dataSource: roomsData,
      name: 'rooms',
    }],
    tooltip: {
      enabled: true,
      customizeTooltip(arg) {
        if (arg.layer.name === 'rooms') {
          return { text: `Aparelhos na área: ${arg.attribute('devNum')} aparelho` };
        }
        return null;
      },
    },
  });
});

function changeFloor(floor) {
  $(() => {
    $('button.map').css("opacity", "44%");
    $(`button.map.${floor}`).css("opacity", "100%");
  });

}