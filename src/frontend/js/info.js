// modal com o tempo
function sweetAlert() {
    let timerInterval
    Swal.fire({
        title: 'Encontrando dispositivos!',
        html: 'Dura aproximadamente <b></b> milisegundos.',
        timer: 2000,    // tempo do alerta em milisegundos
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}