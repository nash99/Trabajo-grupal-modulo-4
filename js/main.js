//VARIABLES
const cards = document.querySelector('.cards')
let stock = []

// FETCH
let url = "./js/BDproductos.json"
fetch(url)
.then(response => response.json())// se usa then o await
.then(data=> {
    data.forEach(categoria => {
        categoria.productos.forEach(productos=>{
            stock.push(productos)
            //catalogo es un arreglo vacio donde se insertan los datos del json
        })
            
        })



            //ACTIVAR FUNCIONES
            mostrarProductos();  //a cada producto del stock 


            //FUNCIONES
            function mostrarProductos (){
                stock.forEach(element => {
                    let producto = new Producto(element.imagen, element.nombre, element.codigo, element.descripcion, element.precio, element.cantidad, element.stock)
                
                
                    // += itera los elementos
                    //el boton Agregar al carrito tiene que tener la opcion de buscar clase (porque si fuese ID todos van a tener la misma ID y solo va a buscar el primero)
                    cards.innerHTML += `   <div> 
                                            <img src="${producto.imagen}">                           
                                            <p>${producto.nombre}</p>
                                            <p>${producto.descripcion}</p>
                                            <p>${producto.precio}</p>
                                            <button id="botonAgregar_${producto.codigo} " onclick="buscarId()">Agregar al carrito</button> 
                                        </div>
                                        `                   
                });

                // function buscarId () {
                //    if(this.classList.contains("agregarProducto"))


                // };


    }
})



.catch(error=> console.log(error))