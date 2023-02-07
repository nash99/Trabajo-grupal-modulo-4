
// Variables y eventos
const cards = document.querySelector('.cards') 
const tabla = document.querySelector('#tabla') 
const contenidoTabla = document.querySelector('#contenido-tabla') 
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const pagarCarrito = document.querySelector('#pagar-carrito')
const totalNeto = document.querySelector('#totalNeto')
const totalIva = document.querySelector('#totalIva')
const netoIva = document.querySelector('#netoIva')
const precioEnvio = document.querySelector('#precioEnvio')
const totalTotal = document.querySelector('#totalTotal')
const contenedorTotales = document.querySelector('#contenedor-totales')
const botones = document.querySelector('.botones')
let carrito = new Carro();
//Formateo de numero a moneda
const formatoPeso = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  })

window.addEventListener('DOMContentLoaded', mostrarProductos)


/**
 * Muestra en el DOM todos los productos del arreglo
 */
function mostrarProductos() {
    i = 1
    catalogo.forEach(producto => { 
        
        const card = document.createElement('div')
        card.classList.add('card', 'p-2')
        card.innerHTML = 
        `
        <img id="img-${i}" class="w-100 mb-2" src="${producto.imagen}">
        <p id="nombre-${i}">${producto.nombre}</p>
        <p id="codigo-${i}">Código: ${producto.codigo}</p>
        <p id="descripcion-${i}">Descripción: ${producto.descripcion}.</p>
        <p id="precio-${i}">Precio:$${producto.precio}</p>
        <p id="stock-${i}">Stock: ${producto.stock}</p>
        <button id="boton-${i}" type="button" class="btn bg-primary agregarProducto">Agregar al carrito</button>
        `
        i++
        cards.appendChild(card)
    })
}

//Agregar al carro
$(document).on('click','button[type="button"]', function() {
  
    let id = parseInt(this.id.replace(/[^0-9]+/g, "")) ;
    let producto = catalogo.find(producto => producto.codigo == id)
    carrito.añadirProducto(producto)
    mostrarCarrito()
});

//Mostrar productos en carro
function mostrarCarrito(){
    eliminarInfoPrevia();
    let i=0;
    carrito.productos.forEach(producto => {
        const productoTabla = document.createElement('tr')
        productoTabla.innerHTML =
        `
        <td>
            <img  src=${producto.imagen} width="100px">
        </td>
        <td id="${producto.codigo}">${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio}</td>
        <td id="botonEliminar">
            <button type="button" class=" btn bg-danger">X</button>
        </td>
        `
        contenidoTabla.appendChild(productoTabla)
        i++
    })
    carrito.calcularTotales()
    
    $("#totalIva").text(`${formatoPeso.format(carrito.iva)}`);
    $("#totalBruto").text(`${formatoPeso.format(carrito.bruto)}`);
    $("#totalFinal").text(`${formatoPeso.format(carrito.total)}`);
    $("#totalNeto").text(`${formatoPeso.format(carrito.neto)}`)
    $("#precioEnvio").text(`${formatoPeso.format(carrito.envio)}`)
}

function eliminarInfoPrevia() {
    while(contenidoTabla.firstChild) {
        contenidoTabla.removeChild(contenidoTabla.firstChild)
    }
    $("#totalIva").text(`$${0}`);
    $("#totalBruto").text(`$${0}`);
    $("#totalFinal").text(`$${0}`);
    $("#totalNeto").text(`$${0}`)
    $("#precioEnvio").text(`$${0}`)
}

//Boton vaciar carro
$("#vaciar-carrito").on("click" ,function(){
    carrito.eliminarCarro();
    eliminarInfoPrevia()
})

//Boton eliminar item
$("#botonEliminar").on("click", function(){
    alert("aasffd")
})


