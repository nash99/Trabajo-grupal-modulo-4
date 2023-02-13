productoEditado = JSON.parse(localStorage.getItem("productoEditado"));
inventario = JSON.parse(localStorage.getItem("inventario"));

$("#nombre").val(productoEditado.producto.nombre);
$("#imagen").val(productoEditado.producto.imagen);
$("#codigo").val(productoEditado.producto.codigo);
$("#descripcion").val(productoEditado.producto.descripcion);
$("#precio").val(productoEditado.producto.precio);


inventario.forEach(categoria => {
    let opciones = document.createElement("option");
    opciones.innerHTML = categoria.categoria;  
    $("#categoria").append(opciones);
});

$("form").on("submit", event =>{
    event.preventDefault();
    let arregloDatos = document.getElementsByClassName("dato");
    
    
    
    if(arregloDatos.categoria.value != ""){
        productoEditado.categoria = arregloDatos.categoria.value 
    }
    
    let categoria = inventario.find(categoria => categoria.categoria == productoEditado.categoria);
    let prodEnInventario = (categoria.productos.find(producto => producto.codigo == productoEditado.producto.codigo));
    let indice = categoria.productos.indexOf(prodEnInventario);
    categoria.productos[indice].nombre = arregloDatos.nombre.value;
    categoria.productos[indice].imagen = arregloDatos.imagen.value;
    categoria.productos[indice].descripcion = arregloDatos.descripcion.value;
    categoria.productos[indice].precio = arregloDatos.precio.value;
    localStorage.setItem("inventario",JSON.stringify(inventario));
})
