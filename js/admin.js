var edicionProducto = [];
var productoEditado = {categoria:"",
                       producto:""};
inventario = JSON.parse(localStorage.getItem("inventario"))              
//Mostrar listado de productos
$("#tablaProductos").hide()
$("#listado").on("click", () =>{
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
    $("#tablaProductos").show()      
})

//Editar Producto
$(document).on("click",'button[type="button"]', function(){
    if(this.classList.contains("btnEditar")){
        let id = parseInt(this.id.replace(/[^0-9]+/g, "")); 
        productoEditado.producto = catalogo.find(productoo => productoo.codigo == id);
        console.log(productoEditado)
        productoEditado.categoria = this.classList[3];
        localStorage.setItem("productoEditado",JSON.stringify(productoEditado));
        window.open("/edicion.html","_blank");
    }         
})



