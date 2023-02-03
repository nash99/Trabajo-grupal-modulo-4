// Variables y eventos
const contenedorProductos = document.querySelector('#contenedor-productos');
const contenedorPrecio = document.querySelector('#contenedor-precio');
const carrito = JSON.parse(localStorage.getItem('carrito'))
const totales = JSON.parse(localStorage.getItem('totales'))
window.addEventListener('DOMContentLoaded', mostrarProductosCarrito)

/**
 * Imprime en el DOM los archivos que vienen desde el localstorage con el respectivo total a pagar (considerando costos de IVA y envío)
 */
function mostrarProductosCarrito(){
    carrito.forEach(producto => {
        const cardProducto = document.createElement('div')
        cardProducto.classList.add('contenedor-productos')
        cardProducto.innerHTML =
        `
        <img src="${producto.imagen}" width="200px">
        <p>${producto.nombre}</p>
        <p>${producto.cantidad}</p>
        <p>$${producto.precio}</p>
        `
        contenedorProductos.appendChild(cardProducto)
    })
    const precio = document.createElement('p')
    precio.classList.add('fw-bold')
    precio.textContent = `El precio total de la compra es: ${totales[0].totalTotal}`
    contenedorPrecio.appendChild(precio)
}