// Arreglo de productos


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
let carrito = []
let totales = []

window.addEventListener('DOMContentLoaded', mostrarProductos)
window.addEventListener('DOMContentLoaded', consultarData)

/**
 * Muestra en el DOM todos los productos del arreglo
 */
function mostrarProductos() {
    catalogo.forEach(producto => { 
        const card = document.createElement('div')
        card.classList.add('card', 'p-2')
        card.innerHTML = 
        `
        <img class="w-100 mb-2" src="${producto.imagen}">
        <p>${producto.nombre}</p>
        <p>Código: ${producto.codigo}</p>
        <p>Descripción: ${producto.descripcion}.</p>
        <p>Precio: $${producto.precio}</p>
        <div class="d-flex column justify-content-center" class="tarjeta-modificar">
                <button class="btnAgregar" value=btn onclick="modificarCantidad(-1, ${producto.codigo})">-</button>
                <p class="mb-0 mt-2 align-self:center" id="cantX_${producto.codigo}" >1</p>
                <button class="btnAgregar" value=btn onclick="modificarCantidad(+1, ${producto.codigo})">+</button>
            </div>
        <button onclick="crearObj(${producto.codigo})" class="boton">Agregar al carrito</button>
        `
        cards.appendChild(card)
    })
}

// Función para modificar cantidad de productos en cada card.
function modificarCantidad(btn, codigo) {
    var cantidadCarrito = Number(document.querySelector(`#cantX_${codigo}`).textContent);
    cantidadCarrito = cantidadCarrito + btn;

    if (cantidadCarrito > 0) {
        document.querySelector(`#cantX_${codigo}`).textContent = cantidadCarrito;
    } else {
        cantidadCarrito = 1;
    }
};

/**
 * Filtra del arreglo original un producto según su id y crea un objeto de éste, evalúa si ya existe en el arreglo del carrito para así aumentar cantidad y precio. Finalmente retorna al arreglo carrito y se llama a la función encargada de imprimirlo junto a sus valores en el DOM
 * @param {Number} id: Código del producto que se extrae del botón "Agregar al carrito"  
 */
function crearObj(id){
    const producto = catalogo.filter(producto => id === producto.codigo)[0] 
    productoCarrito = {
        imagen: producto.imagen,
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        precio: producto.precio,
        id: producto.codigo
    }
    if(carrito.some(producto => producto.id === productoCarrito.id)) {
        const productos = carrito.map(producto => {
            if(producto.id === productoCarrito.id) {
                producto.cantidad++
                producto.precio = calcularPrecio(producto.cantidad, producto.id)
                return producto
            } else {
                return producto
            }
        })
        carrito = productos
    } else {
        carrito = [...carrito, productoCarrito]
    }
    calcularTotales()
    mostrarCarrito()
}
/**
 * Imprime el carrito de compra en el DOM
 */
function mostrarCarrito(){
    eliminarInfoPrevia()
    carrito.forEach(producto => {
        const productoTabla = document.createElement('tr')
        productoTabla.innerHTML =
        `
        <td>
            <img src=${producto.imagen} width="100px">
        </td>
        <td>${producto.nombre}</td>
        <td class="d-flex column justify-content-center" class="tarjeta-modificar">
                <button class="btnAgregar" value=btn onclick="modificarCantidad(-1, ${producto.codigo})">-</button>
                <p class="mb-0 mt-2 align-self:center" id="cantX_${producto.codigo}" >${producto.cantidad}</p>
                <button class="btnAgregar" value=btn onclick="modificarCantidad(+1, ${producto.codigo})">+</button>
            </td>
        <td>$${producto.precio}</td>
        <td>$${producto.precio * producto.cantidad}</td>
        
        <td>
            <button onclick="eliminarProducto(${producto.id})">X</button>
        </td>
        `
        contenidoTabla.appendChild(productoTabla)
    })
}

/**
 * Mientras exista un elemento en el contenedor padre, se remueve y se imprime el siguiente
 */
function eliminarInfoPrevia() {
    while(contenidoTabla.firstChild) {
        contenidoTabla.removeChild(contenidoTabla.firstChild)
    }
}
/**
 * Elimina contenidos del carrito, los valores totales y localstorage al momento de presionar el botón de vaciar
 */
function borrarCarrito() {
    carrito = []
    totales = []
    totalNeto.textContent = '$0'
    totalIva.textContent = '$0'
    netoIva.textContent = '$0'
    precioEnvio.textContent = '$0'
    totalTotal.textContent = '$0'
    localStorage.removeItem('carrito')
    localStorage.removeItem('totales')
    
    mostrarCarrito()
}

/**
 * Calcula el precio total dependiendo de la cantidad de un producto en el carrito
 * @param {Number} cantidad: Cantidad de un producto del arreglo carrito
 * @param {Number} id: Identificador para extraer el precio del arreglo original
 * @returns El resultado de la cantidad del producto del carrito por el precio original
 */
function calcularPrecio(cantidad, id) {
    const producto = catalogo.filter(producto => id === producto.codigo)[0]
    return cantidad * producto.precio
}

/**
 * Elimina un producto del carrito
 * @param {Number} id: Código del producto
 */
function eliminarProducto(id) {
    carrito = carrito.filter(producto => id !== producto.id)
    mostrarCarrito()
    if(carrito.length !== 0) {
        calcularTotales()
    } else {
        borrarCarrito()
    }
}

/** 
 * Calcula los precios totales según contenido del carrito (total neto, el IVA incluido, el total + IVA, precio de envio y el total a pagar)
*/
function calcularTotales() {
    const preciosCarrito = carrito.map(producto => producto.precio)
    let totalCarrito = preciosCarrito.reduce((total, actual) => total + actual)

    totalNeto.textContent = '$' + (totalCarrito - (totalCarrito * 0.19))
    totalIva.textContent = '$' + (totalCarrito * 0.19)
    netoIva.textContent = `$ ${totalCarrito}`
    
    if(totalCarrito < 100000) {
        const montoEnvio = totalCarrito * 0.05
        precioEnvio.textContent = '$' + montoEnvio
        totalTotal.textContent = '$' + (montoEnvio + totalCarrito)
    } else {
        precioEnvio.textContent = '$0'
        totalTotal.textContent = `$ ${totalCarrito}`
    }

    const valoresTotales = {
        neto: totalNeto.textContent,
        iva: totalIva.textContent,
        netoIva: netoIva.textContent,
        precioEnvio: precioEnvio.textContent,
        totalTotal: totalTotal.textContent
    }
    totales = [valoresTotales]
}

/**
 * Al presionar el botón pagar si existe algo en el carrito manda todos los datos de este al ls y redirije a otro html con un formulario y los datos del ls
 */
function pagoCarrito() {
    if(carrito.length !== 0) {
        localStorage.setItem('carrito', JSON.stringify(carrito))
        localStorage.setItem('totales', JSON.stringify(totales))
        window.location.href = 'pago.html'
    } else {
        crearAlerta()
    }
}

/**
 * Si al presionar el botón de pagar no hay ningún elemento en el carrito que imprima la alerta en el DOM
 */
function crearAlerta() {
    const mensaje = document.createElement('div')
    mensaje.classList.add('bg-warning', 'p-3', 'w-100', 'fw-bold', 'text-center', 'border', 'border-dark', 'rounded', 'mb-2')
    mensaje.textContent = 'Agregue al menos un producto para realizar el pago'
    contenedorTotales.insertBefore(mensaje, botones)
    setTimeout(() => {
        mensaje.remove()
    }, 3000)
}

/**
 * Si existe información en el local storage mostrarla en el carrito
 */
function consultarData() {
    const data = JSON.parse(localStorage.getItem('carrito'))
    carrito = [...data]
    mostrarCarrito()
    calcularTotales()
}