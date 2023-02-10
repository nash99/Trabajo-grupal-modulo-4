const dir = '/BDProductos.json'

fetch(dir) 
.then(response => response.json()) 
.then(data => { 
    data.push("kjkajs")
    
    $("#listado").on("click", () =>{
        data.forEach(categoria => {
            categoria.forEach(productos => {
                console.log(productos)
            })
        });
        let fila = document.createElement("tr")
        fila.innerHTML = `   <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>   `
        $("#cuerpoTabla").append(fila)                
    })
})

