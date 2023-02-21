export class Api{
    constructor(){}

    traerProductos(){
        return fetch("https://bsite.net/metalflap/td-producto")
        .then(response => response.json())
        .then(data => data.filter(producto => producto.idSucursal == 2))
        .catch(error => console.log(error))
    }

    obtenerCategoria(){
        return fetch("https://bsite.net/metalflap/td-categoria")
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))
    }

    crearProducto(producto){
        fetch("https://bsite.net/metalflap/td-producto",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:   JSON.stringify(producto)
            }
        )
        .catch(error => console.log(error))
    }

    eliminarProducto(id){
        fetch(`https://bsite.net/metalflap/td-producto/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(alert("Producto Eliminado"))
        .catch(error => console.log(error))
    }

    editarProducto(producto){
        fetch(`https://bsite.net/metalflap/td-producto`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            }
        ).then(alert("Producto Editado"))
        .catch(error =>console.log(error))
    }

    buscarProducto(id){
        return fetch(`https://bsite.net/metalflap/td-producto/${id}`)
        .then(response => response.json())
        .then(data =>data)
        .catch(error => console.log(error))
    }
    

}