
//VARIABLES
const cards = document.querySelector('.cards');
const contenidoTabla = document.querySelector("#contenido-tabla")

let stock = []
var carrito = new Carrito()

// FETCH
let url = "./js/BDproductos.json"
fetch(url)
.then(response => response.json())// se usa then o await
.then(data => {
    data.forEach(categoria => {
        categoria.productos.forEach(productos => {
        stock.push(productos)
            //catalogo es un arreglo vacio donde se insertan los datos del json
        })
    })


})
.then(() => {
    //ACTIVAR FUNCIONES
    mostrarProductos();  //a cada producto del stock 
})
// .then(() => prueba())
.catch(error => console.log(error))

//FUNCIONES
function mostrarProductos() {
        stock.forEach(element => {
        let producto = new Producto(element.imagen, element.nombre, element.codigo, element.descripcion, element.precio, element.cantidad, element.stock)

        // += itera los elementos
        //el boton Agregar al carrito tiene que tener la opcion de buscar clase (porque si fuese ID todos van a tener la misma ID y solo va a buscar el primero)
        cards.innerHTML += `   <div class="productoCatalogo"> 
                                <img src="${producto.imagen}">                           
                                <p>${producto.nombre}</p>
                                <p>${producto.descripcion}</p>
                                <p>${producto.precio}</p>
                                <button value=${producto.codigo} class="botonAgregar${producto.codigo}">Agregar al carrito</button> 
                            </div>
                            `
    })
    busquedaBoton()
};

//AGREGAR A CARRITO//
function busquedaBoton() {
    const botonAgregarCarrito = document.querySelectorAll(".botonAgregar"); // selecciono donde irá la funcion, en la clase "boton agregar"
    botonAgregarCarrito.forEach(botonAgregarProducto => {
        botonAgregarProducto.addEventListener('click', () => {
            agregadoAlCarro(botonAgregarProducto)
            
        }); // a cada (forEach) boton le agrego un event listener que escuche el click y agrege al carrito
    });
}

function agregadoAlCarro(obj) {
    const id = obj.value// se elimina y cambia por value -->let id = parseInt(obj.id.replace(/[^0-9]+/g, "")); //borra las letras y deja solo numeros
    const productoAcarrito = stock.find(producto => producto.codigo == id)
    carrito.productos.push(productoAcarrito)
    console.log(carrito.productos)
    
    mostrarCarrito()
    
    // const boton = obj.id; // buscar event y target
    
    // let productoAcarrito = stock.find(producto => producto.codigo == id)
    // carrito.productos.push(productoAcarrito)
    // console.log(carrito.productos)
    // mostrarProductos()
}

function mostrarCarrito() {
    console.log("hola")
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
            <td>
                <button id="${producto.codigo}" type="button" class="btn bg-danger botonEliminar">X</button>
            </td>
            `
        contenidoTabla.appendChild(productoTabla)
    })
};

