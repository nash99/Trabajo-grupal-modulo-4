import { Api } from "./API.js";
import {Producto} from "./Producto.js"

export let api = new Api;

//Comprobar carro en localStorage
let carrito = [];
if(localStorage.getItem("carro")){
    carrito = JSON.parse(localStorage.getItem("carro"))
}

let inventario = await api.traerProductos();
let contenidoTabla = document.getElementById('contenido-tabla');
let containerCards = document.getElementById("containerCards");
let pTotalIva = document.getElementById("totalIva");
let pTotalFinal = document.getElementById("totalTotal");
let pTotalNeto  = document.getElementById("totalNeto");
let pPrecioEnvio = document.getElementById("precioEnvio");
let pTotalTotal = document.getElementById("totalMasIva");
let btnAdmin = document.getElementById("admin")


const formatoPeso = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
})

function mostrarCarrito(){
    carrito.forEach(producto => {
        let productoTabla = document.createElement('tr');
        productoTabla.setAttribute("id",`fila${producto.id}`)
        productoTabla.innerHTML += `<tr>
                                        <td><img  src=${producto.link} width="100px"></td>                                    
                                        <td>${producto.nombre}</td>
                                        <td><button class="btn btn-danger btnRestar" type="button" value="${producto.id}">-</button></td>
                                        <td id="${producto.id}">${producto.cantidad}</td>
                                        <td><button class="btn btn-success btnSumar" type="button" value="${producto.id}">+</button></td>
                                        <td id="precio${producto.id}">${formatoPeso.format(producto.precio)}</td>
                                        <td><button value="${producto.id}" type="button" class="btn bg-danger btnEliminar">X</button></td>
                                    </tr>`
        contenidoTabla.appendChild(productoTabla)
        calcularTotales(carrito)
    })  
    
}

//Mostrar cards
inventario.forEach(producto => {
    
    if(producto.stock > 4){
        containerCards.innerHTML +=    `<div class="card" style="width: 15rem; ">
                                        <img src="${producto.link}" class="card-img-top" alt="Imagen No Disponible" style="height:200px;width:100%">
                                        <div class="card-body" style="height:100px; overflow-x:hidden; overflow-y:scroll">
                                            <p class="card-text" >${producto.descripcion}</p>
                                        </div>
                                        <div class="card-footer">
                                        <h5 class="card-text">${producto.nombre}</h5>
                                            <p class="card-text">Stock: ${producto.stock}</p>
                                            <p class="card-text">Precio: ${formatoPeso.format(producto.precio)}</p>
                                            <div class="controles">
                                                <button class="btn btn-success btnAgregar" type="button" value="${producto.id}">Agregar al carro</button>
                                            </div>
                                        </div>
                                    </div>`
    }else if(producto.stock == 0){
        containerCards.innerHTML +=    `<div class="card" style="width: 15rem; ">
                                        <img src="${producto.link}" class="card-img-top" alt="Imagen No Disponible" style="height:200px;width:100%">
                                        <div class="card-body" style="height:100px; overflow-x:hidden; overflow-y:scroll">
                                            <p class="card-text" >${producto.descripcion}</p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="card-text">Stock: ${producto.stock}</p>
                                            <p class="card-text">Precio: ${formatoPeso.format(producto.precio)}</p>
                                            <div class="controles">
                                                <button class="btn btn-success btnAgregar" type="button" value="${producto.id}" disabled>Sin Stock</button>
                                            </div>
                                        </div>
                                    </div>`
    }else{
        containerCards.innerHTML +=    `<div class="card" style="width: 15rem; ">
                                        <img src="${producto.link}" class="card-img-top" alt="Imagen No Disponible" style="height:200px;width:100%">
                                        <div class="card-body" style="height:100px; overflow-x:hidden; overflow-y:scroll">
                                            <p class="card-text" >${producto.descripcion}</p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="card-text">Stock: ${producto.stock}</p>
                                            <p class="card-text">Precio: ${formatoPeso.format(producto.precio)}</p>
                                            <p class="card-text ultimasUnidades" >¡ÚLTIMAS UNIDADES DISPONIBLES!</p>
                                            <div class="controles">
                                                <button class="btn btn-success btnAgregar" type="button" value="${producto.id}">Agregar al carro</button>
                                            </div>
                                        </div>
                                    </div>`
    }
    
});

let botonesAgregar = document.querySelectorAll(".btnAgregar");
//agregar desde card
botonesAgregar.forEach(boton =>{
    boton.addEventListener("click", function(){
        let id  = this.value
        let producto = inventario.find(element => element.id == id)
        
        if(!carrito.find(element => element.id == id)){
            let prodNuevo = new Producto(producto.nombre,producto.precio,producto.link,producto.stock,producto.etiqueta,producto.descripcion,producto.idCategoria,producto.IdSucursal,1)
            prodNuevo.setID(id);
            carrito.push(prodNuevo)
        }else{
            let prodEnCarro = carrito.find(element => element.id == id);
            prodEnCarro.cantidad += 1
            
        } 
        calcularTotales(carrito)
        localStorage.setItem("carro",JSON.stringify(carrito))    
    })
    
    
    
})


//Mostrar carro y acciones de edicion
document.getElementById("mostrarCarro").addEventListener("click",function(){
    eliminarInfoPrevia();
    mostrarCarrito();
    
    let botonesSumar = document.querySelectorAll(".btnSumar");
    let botonesRestar = document.querySelectorAll(".btnRestar");
    let botonesEliminar = document.querySelectorAll(".btnEliminar");

    //Sumar  y restar  desde carro
    botonesSumar.forEach(boton =>{
        boton.addEventListener("click", function(){
            let id  = this.value;
            let producto = carrito.find(element => element.id == id);
            let cantTabla = document.getElementById(id);
            let precioTabla = document.getElementById(`precio${producto.id}`)
            if(producto.cantidad < producto.stock){
                producto.cantidad += 1;
                cantTabla.innerText = producto.cantidad;
                precioTabla.innerText = formatoPeso.format(producto.precio * producto.cantidad) 
            }      
            calcularTotales(carrito)
            localStorage.setItem("carro",JSON.stringify(carrito))             
        })  
    })

    botonesRestar.forEach(boton =>{
        boton.addEventListener("click", function(){
            let id  = this.value
            let producto = carrito.find(element => element.id == id)
            let cantTabla = document.getElementById(id);
            let precioTabla = document.getElementById(`precio${producto.id}`)
            if(producto.cantidad == 1){
                cantTabla.innerText = 1
            }else{
                producto.cantidad -= 1;
                cantTabla.innerText = producto.cantidad
                precioTabla.innerText = formatoPeso.format(producto.precio * producto.cantidad) 
            }
            calcularTotales(carrito)
            localStorage.setItem("carro",JSON.stringify(carrito))
        })  
    })

    //Eliminar desde carro
    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", function(){
            let id  = this.value
            let prod = carrito.find(element => element.id == id)
            let indiceProducto = carrito.indexOf(prod)
            carrito.splice(indiceProducto,1)
            contenidoTabla.removeChild(document.getElementById(`fila${prod.id}`))
            localStorage.setItem("carro",JSON.stringify(carrito))
            calcularTotales(carrito)
        }) 
    })
})



function eliminarInfoPrevia() {
    while(contenidoTabla.firstChild) {
        contenidoTabla.removeChild(contenidoTabla.firstChild)
    }
    
    pTotalIva.innerText = `$${0}`;
    pPrecioEnvio.innerText = `$${0}`;
    pTotalFinal.innerText = `$${0}`;
    pTotalNeto.innerText = `$${0}`;
    pTotalTotal.innerText = `$${0}`;

}

document.getElementById("vaciar-carrito").addEventListener("click",function(){
    localStorage.removeItem("carro")
    eliminarInfoPrevia();
    carrito = []
})

//Calcular totales

function calcularTotales(carrito){
    let total = [];
    carrito.forEach(producto =>{
        total.push(producto.cantidad * producto.precio)
    })
    let totalMasIva = total.reduce((a, b) => a + b, 0) 
    let iva = Math.round(totalMasIva * 0.19) 
    let totalNeto = Math.round(totalMasIva * 0.81)
    let totalEnvio;
    if(totalMasIva > 100000){
        totalEnvio = 0
    }else{
        totalEnvio = Math.round(totalMasIva * 0.05)
    }
    let totalTotal = totalEnvio + totalMasIva
    pTotalIva.innerText = `${formatoPeso.format(iva)}`;
    pPrecioEnvio.innerText = `${formatoPeso.format(totalEnvio)}`;
    pTotalFinal.innerText = `${formatoPeso.format(totalTotal)}`;
    pTotalNeto.innerText = `${formatoPeso.format(totalNeto)}`;
    pTotalTotal.innerText = `${formatoPeso.format( totalMasIva)}`;
}

btnAdmin.addEventListener("click",function(){
    window.open("/html/admin.html")
})

//Pagar

let botonPagar = document.getElementById("pagar-carrito");

botonPagar.addEventListener("click",function(){
    document.getElementById("tablaFinalizar").innerHTML = ""
    carrito.forEach(producto =>{
        let fila = document.createElement("tr")
        fila.innerHTML = `  <th scope="row">
                                <td>${producto.nombre}</td>
                                <td>${producto.cantidad}</td>
                                <td>${formatoPeso.format(producto.precio * producto.cantidad)}</td>
                            </th>  `
        document.getElementById("tablaFinalizar").append(fila)
    })
    let total = [];
    carrito.forEach(producto =>{
        total.push(producto.cantidad * producto.precio)
    })
    let totalMasIva = total.reduce((a, b) => a + b, 0) 
    let iva = Math.round(totalMasIva * 0.19) 
    let totalNeto = Math.round(totalMasIva * 0.81)
    let totalEnvio;
    if(totalMasIva > 100000){
        totalEnvio = 0
    }else{
        totalEnvio = Math.round(totalMasIva * 0.05)
    }
    let totalTotal = totalEnvio + totalMasIva;

    document.getElementById("totalesFinalizar").innerHTML = `   <tr>
                                                                    <td>Neto: ${formatoPeso.format(totalNeto)}</td>   
                                                                    <td>IVA: ${formatoPeso.format(iva)}</td>   
                                                                    <td>Total + IVA: ${formatoPeso.format( totalMasIva)}</td>   
                                                                    <td>Envio: ${formatoPeso.format(totalEnvio)}</td>   
                                                                    <td>Total a Pagar: ${formatoPeso.format(totalTotal)}</td>   
                                                                <tr>`;
    
});



let formContacto = document.getElementById("formContacto");

formContacto.addEventListener("submit",e =>{
    e.preventDefault();
    let datosForm = document.getElementsByClassName("datoContacto");
    let nombreCliente =datosForm.nombreCliente.value;
    let emailCliente = datosForm.correoCliente.value;
    let mensaje = "";
    let total = 0;
    let iva;
    let envio;
    
    carrito.forEach(producto =>{
        total += producto.cantidad * producto.precio;
        
        mensaje += `\n========================================\n
                    Producto: ${producto.nombre}\n
                    Cantidad: ${producto.cantidad}\n
                    Precio Unitario: ${formatoPeso.format(producto.precio)}\n
                    Total Item: ${formatoPeso.format(producto.cantidad * producto.precio)}\n
                    `
    })
    iva = formatoPeso.format(Math.round(total*0.19))
    if(total > 100000){
        envio = 0
    }else{
        envio = formatoPeso.format(Math.round(total * 0.05))
    }
    
    mensaje += `\nTotal: ${formatoPeso.format(total)}\n
                IVA: ${iva}\n
                Envio: ${envio}`

    emailjs.send("service_yakjw2q","template_akmtu9l",{
        nombre: nombreCliente,
        message: mensaje,
        email: emailCliente,
        });
})