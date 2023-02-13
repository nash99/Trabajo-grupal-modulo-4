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
    categoria.productos.splice(indice,1)
    let productoActualizado = new Producto(arregloDatos.imagen.value,arregloDatos.nombre.value,arregloDatos.codigo.value,arregloDatos.descripcion.value,arregloDatos.precio.value,productoEditado.producto.stock,productoEditado.producto.cantidad)
    categoria.productos.push(productoActualizado)
    localStorage.removeItem("inventario")
    localStorage.setItem("inventario",JSON.stringify(inventario));
    alert("Producto editado con éxito")
    window.close()
})
