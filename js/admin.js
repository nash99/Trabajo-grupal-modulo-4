var edicionProducto = [];
var productoEditado = {categoria:"",
                       producto:""};

$("#tablaProductos").hide();
$("#formCreacion").hide();

//Mostrar listado de productos
function mostrarListado(inventario){
    inventario.forEach(categoria => {
        categoria.productos.forEach(productos => {           
            let fila = document.createElement("tr")
            fila.innerHTML = `  <th scope="row">
                                    <td>${productos.nombre}</td>
                                    <td>${productos.codigo}</td>
                                    <td>${productos.descripcion}</td>
                                    <td>${productos.precio}</td>
                                    <td>${categoria.categoria}</td>
                                    <td>${productos.stock}</td> 
                                    <td><button type="button" class="btnEditar btn btn-success ${categoria.categoria}" id="edit-${productos.codigo}">Editar</button></td> 
                                    <td><button type="button" class="btnEliminar btn btn-danger ${categoria.categoria}" id="delete-${productos.codigo}">Eliminar</button></td> 
                                </th>  `
            $("#cuerpoTabla").append(fila)     
        })
    }); 
}

$("#listado").on("click", () =>{
    $("#cuerpoTabla").html("");
    $("#formCreacion").hide();
    $("#tablaProductos").show() 
    mostrarListado(inventario)
})

//Editar Producto
$(document).on("click",'button[type="button"]', function(){
    if(this.classList.contains("btnEditar")){
        let id = parseInt(this.id.replace(/[^0-9]+/g, "")); 
        productoEditado.producto = catalogo.find(productoo => productoo.codigo == id);
        productoEditado.categoria = this.classList[3];
        localStorage.setItem("productoEditado",JSON.stringify(productoEditado));
        window.open("/edicion.html","_blank");
    }         
})

//Crear producto
$("#crearProducto").on("click",function(){
    $("#tablaProductos").hide();
    $("#formCreacion").show();
    $("#categoriaCreacion").html('<option value="" selected>Categoria</option>')
    inventario.forEach(categoria => {
        let opciones = document.createElement("option");
        opciones.setAttribute("value", categoria.categoria);
        opciones.innerHTML = categoria.categoria;  
        $("#categoriaCreacion").append(opciones);
    });
})

$("#formCreacion").on("submit", event =>{
    event.preventDefault();
    let arrayProdNuevo = document.getElementsByClassName("datoProdNuevo");
    let producto = new Producto(arrayProdNuevo.imagenCreacion.value,arrayProdNuevo.nombreCreacion.value,arrayProdNuevo.codigoCreacion.value,arrayProdNuevo.descripcionCreacion.value,arrayProdNuevo.precioCreacion.value,arrayProdNuevo.stockCreacion.value,0)
    let category = inventario.find(categoria => categoria.categoria == arrayProdNuevo.categoriaCreacion.value)
    category.productos.push(producto)
    localStorage.removeItem("inventario")
    localStorage.setItem("inventario",JSON.stringify(inventario));
})

//Eliminar Producto

$(document).on("click",'button[type="button"]', function(){
    if(this.classList.contains("btnEliminar")){
        let id = parseInt(this.id.replace(/[^0-9]+/g, "")); 
        productoEditado.producto = catalogo.find(productoo => productoo.codigo == id);
        
        
        inventario.forEach(categoria =>{
            let i = 0;
            
            categoria.productos.forEach(producto =>{
                if(producto.codigo == productoEditado.producto.codigo){
                    categoria.productos.splice(i,1)
                }
                i++
            })
            
        })
        localStorage.removeItem("inventario")
        localStorage.setItem("inventario",JSON.stringify(inventario));

        
    }         
})