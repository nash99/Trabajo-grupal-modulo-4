
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
    let id = parseInt(this.id[this.id.length - 1]) ;
    let producto = catalogo.find(producto => producto.codigo == id)
    carrito.añadirProducto(producto)
    mostrarCarrito()
});

//Mostrar productos en carro
function mostrarCarrito(){
    carrito.productos.forEach(producto => {
        const productoTabla = document.createElement('tr')
        productoTabla.innerHTML =
        `
        <td>
            <img src=${producto.imagen} width="100px">
        </td>
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio}</td>
        <td>
            <button onclick="eliminarProducto(${producto.id})">X</button>
        </td>
        `
        contenidoTabla.appendChild(productoTabla)
    })
}

