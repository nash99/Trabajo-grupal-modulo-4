// Variables a utilizar

const pdtosCanasta = document.querySelector("#tabla");
const cardPdtos = document.querySelector(".cards");
const totales = document.querySelector("#contenedor-totales");
var cantPdto = Number(document.querySelector("#cantX"));
var carro = new Carro();
let catalogo = [];
let canasta = [];


// Fetch json
let url = "./Clase.js/catalogo.json";
fetch(url)
.then(response => response.json())
.then(data => {
    data.forEach(categoria =>{
        categoria.productos.forEach(productos =>{
           catalogo.push(productos)
        })
    })

    mostrarProductos();
    // 1) mostrar cards con productos
    mostrarProductos = () => {
       
        catalogo.forEach(producto => { 
            let card = document.createElement("div");
            card.classList.add('card', 'p-2');
               
            card.innerHTML =
                `
                <img class="w-100 mb-2" src="${producto.imagen}">
                <p>${producto.nombre}</p>
                <p>Código: ${producto.codigo}</p>
                <p>Descripción: ${producto.descripcion}.</p>
                <p>Precio: $${producto.precio}</p>
                <div class="d-flex column justify-content-center" id="tarjeta-modificar">
                        <button class="btnAgregar" value=btn onclick="modificarCantidad(-1, ${producto.codigo})">-</button>
                        <p class="mb-0 mt-2 align-self:center" id="cantX_${producto.codigo}" >1</p>
                        <button class="btnAgregar" value=btn onclick="modificarCantidad(+1, ${producto.codigo})">+</button>
                    </div>
                <button onclick="crearObj(${producto.codigo})" class="boton">Agregar al carrito</button>
                `
            cardPdtos.appendChild(card);
        })
    };

// 2) modificar cantidad de productos en la card
modificarCantidad = (btn, codigo) => {
    cantPdto +=  btn
        
    if (cantPdto > 0) {

    document.querySelector(`#cantX_${codigo}`).textContent = cantPdto
        
    } else {
        cantPdto = 1;            
    }
};

// 3) agregar productos al carrito
let nuevoProducto = new Producto(nombre, imagen, codigo, descripcion, precios, cantidad, stock);
carro.añadirProducto(nuevoProducto)




})
.catch(error => console.log(error))








// 4) agregar cantidad de productos en carrito
// 5) calcular montos en carrito
// 6) eliminar productos en carrito
// 7) vaciar carrito de compras