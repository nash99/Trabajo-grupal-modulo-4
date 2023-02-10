const dir = '/BDProductos.json'

fetch(dir) 
.then(response => response.json()) 
.then(data => { 
    
    $("#listado").on("click", () =>{
        data.forEach(categoria => {
            categoria.productos.forEach(productos => {
                let fila = document.createElement("tr")
                fila.innerHTML = `   <th scope="row">
                                        <td>${productos.nombre}</td>
                                        <td>${productos.codigo}</td>
                                        <td>${productos.descripcion}</td>
                                        <td>${productos.precio}</td>
                                        <td>${categoria.categoria}</td>
                                        <td>${productos.stock}</td>  
                                    </th>  `
                $("#cuerpoTabla").append(fila)  
               
            })
        });
                      
    })
})

