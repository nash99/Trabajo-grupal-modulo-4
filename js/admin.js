import { Api } from "./API.js";

let api = new Api

let categoria = await api.obtenerCategoria();
let productosDB = await api.traerProductos();

let cuerpoTabla = document.getElementById("cuerpoTabla");



//Listar Productos
productosDB.forEach(producto => {
    let fila = document.createElement("tr")
    let categoriaProducto;
        categoria.forEach(element => {
            if(producto.idCategoria == element.id){
                categoriaProducto = element.nombre
            }
        });
    fila.innerHTML = `  <th scope="row">
                            <td>${producto.nombre}</td>
                            <td>${producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>${categoriaProducto}</td>
                            <td>${producto.stock}</td> 
                            <td><img src="${producto.link}" alt="Imagen No Disponible"  style="max-height: 50px; max-width: 50px"></td>
                            <td>${producto.etiqueta}</td>
                            <td><button type="button" class="btnEditar btn btn-success" value="${producto.id}">Editar</button></td> 
                            <td><button type="button" class="btnEliminar btn btn-danger" value="${producto.id}">Eliminar</button></td>  
                        </th>  `
    cuerpoTabla.append(fila)  
});



//Editar Producto
let botonesEditar = document.querySelectorAll(".btnEditar");

botonesEditar.forEach(boton =>{
    boton.addEventListener("click",function(){
        if(this.classList.contains("btnEditar")){
            let id = this.value; 
            localStorage.setItem("id",JSON.stringify(id))
            window.open("/html/edicion.html","_blank");
        }  
    })
})

categoria.forEach(element => { 
    if(element.id == 9 || element.id == 4 || element.id == 3 || element.id == 2){ 
            document.getElementById("categoria").innerHTML += `<option value="${element.id}">${element.nombre}</option>`
    }
});
//Crear producto

document.getElementById("formCreacion").addEventListener("submit",function(){
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let link = document.getElementById("link").value;
    let stock = document.getElementById("stock").value;
    let etiqueta = document.getElementById("etiqueta").value;
    let descripcion = document.getElementById("descripcion").value;
    let categoria = document.getElementById("categoria").value;
    let sucursal = document.getElementById("sucursal").value;
    
    let producto = {
                    "id": 0,
                    "nombre": nombre,
                    "precio": precio,
                    "link": link,
                    "stock": stock,
                    "etiqueta": etiqueta,
                    "descripcion": descripcion,
                    "idCategoria": categoria,
                    "idSucursal": sucursal
                }
    
                api.crearProducto(producto)
})

//eliminar producto

let botonesEliminar = document.querySelectorAll(".btnEliminar");

botonesEliminar.forEach(boton =>{
    boton.addEventListener("click",function(){
        if(this.classList.contains("btnEliminar")){
            let id = this.value; 
            api.eliminarProducto(id)
        }  
        location.reload()
    })
    
})