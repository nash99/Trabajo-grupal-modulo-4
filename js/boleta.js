(function() {
    emailjs.init('pb6kz97fw3xs0gDgA');
})();

const formulario = document.querySelector('#formulario-boleta')
const btnEnviar = document.querySelector('#enviar-datos')

function enviar() {
    const nombre1= document.getElementById('nombrecliente').value;
    const correo1= document.getElementById('correocliente').value;
    const mensajecliente1= document.getElementById('mensajeenviar').value;
    const region = document.getElementById('regioncliente').value;
    const comuna = document.getElementById('comunacliente').value;
    var pago = document.getElementsByClassName('form-check-input');
    const espacio= ' ';
    let newelement = ' ';


    carrito.forEach(producto => {
        newelement= newelement + espacio + producto.nombre + espacio + '//' + espacio + 'Cantidad: ' + espacio + producto.cantidad + '//' + espacio + '$' + producto.precio + '\n';
    })

    if (pago[0].checked == true){
        var metodo_pago = "Tarjeta Débito/Crédito"
    }else if (pago[1].checked == true){
        var metodo_pago = "Transferencia Bancaria"
    }else if (pago[2].checked == true){
        var metodo_pago = "Cheque"
    }
    
    let templateParams= {
        nombre: nombre1,
        correo: correo1,
        mensajecliente: mensajecliente1,
        carritoenviar: newelement,
        regionboleta: region,
        comunaboleta: comuna,
        pagoboleta: metodo_pago,
        total: totales[0].totalTotal
    }


    emailjs.send("pago_carrito","template_w82u42h",templateParams)
        .then(res =>  {
            console.log(res);
        })
        .catch(err => console.log(err));
    
    
    formulario.reset()
    mensaje()
};

function mensaje() {
    const alerta = document.querySelector('.bg-success')
    if(alerta) {
        alerta.remove()
    }
    const divAlerta = document.createElement('div')
    divAlerta.classList.add('text-center', 'fw-bold', 'bg-success', 'w-100', 'rounded', 'text-white', 'p-2', 'mt-2')
    divAlerta.textContent = 'La boleta fue enviada a su correo de manera exitosa'
    formulario.appendChild(divAlerta)

    setTimeout(() => {
        divAlerta.remove()
    }, 5000);
}
        