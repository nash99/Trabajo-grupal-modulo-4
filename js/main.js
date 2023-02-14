
// Variables y eventos
const cards = document.querySelector('.cards') 
const tabla = document.querySelector('#tabla') 
const contenidoTabla = document.querySelector('#contenido-tabla') 
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const pagarCarrito = document.querySelector('#pagar-carrito')
const totalNeto = document.querySelector('#totalNeto')
const totalIva = document.querySelector('#totalIva')
const netoIva = document.querySelector('#netoIva')
const precioEnvio = document.querySelector('#precioEnvio')
const totalTotal = document.querySelector('#totalTotal')
const contenedorTotales = document.querySelector('#contenedor-totales')
const botones = document.querySelector('.botones')
var carrito = new Carro();
var catalogo = [];
var arreglo= []
var inventario
//Llamada a JSON
const url = '/BDProductos.json';

fetch(url) //Ingreso como parametro de la url a la funcion fetch
.then(response => response.json()) //La response se transforma en un json, la funcion then se ejecuta luego de resolverse la promesa anterior, en este caso fetch
.then(data => {  //Nuevamente una funcion then que se ejecuta luego de resuelto el then anterior, dentro de este then va todo el código que maneja el funcionamiento de la página
    if(!localStorage.getItem("inventario")){
        inventario = data
        localStorage.setItem("inventario",JSON.stringify(data));
        
    
    }else{
        inventario = JSON.parse(localStorage.getItem("inventario"))
        
    }
    
    inventario.forEach(categoria => { //ingreso de los productos a al arreglo catalogo, el cual se usa mas adelante para mostrar las cards entre otros usos
        categoria.productos.forEach(producto => {
            catalogo.push(producto)
        })
        arreglo.push(categoria)
        
    })
    //Formateo de numero a moneda
    const formatoPeso = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    })


    mostrarProductos(catalogo)
    /**
     * Muestra en el DOM todos los productos del arreglo
     */
    function mostrarProductos(catalogo) {
        let i = 1
        catalogo.forEach(producto => { 
            if(producto.stock > 0){
                const card = document.createElement('div')
                card.classList.add('card', 'p-2')
                card.innerHTML = 
                `
                <img id="img-${i}" class="w-100 mb-2 img" src="${producto.imagen}">
                <p id="nombre-${i}">${producto.nombre}</p>
                <p id="codigo-${i}">Código: ${producto.codigo}</p>
                <p id="descripcion-${i}">Descripción: ${producto.descripcion}.</p>
                <p id="precio-${i}">Precio:$${producto.precio}</p>
                
                <button id="boton-${producto.codigo}" type="button" class="btn bg-primary agregarProducto">Agregar al carrito</button>
                `
                if(producto.stock > 1 && producto.stock < 4){
                    card.append(`Unidades Disponibles: ${producto.stock}`)
                }else if(producto.stock == 1){
                    card.append(`Ultima unidad disponible!`)
                }
                
                i++
                cards.appendChild(card)
            }else{
                const card = document.createElement('div')
                card.classList.add('card', 'p-2')
                card.innerHTML = 
                `
                <img id="img-${i}" class="w-100 mb-2 img" src="${producto.imagen}">
                <p id="nombre-${i}">${producto.nombre}</p>
                <p id="codigo-${i}">Código: ${producto.codigo}</p>
                <p id="descripcion-${i}">Descripción: ${producto.descripcion}.</p>
                <p id="precio-${i}">Precio:$${producto.precio}</p>
                <p >Producto Agotado</p>
                <button id="boton-${producto.codigo}" type="button" class="btn bg-primary agregarProducto disabled">Agregar al carrito</button>
                `
                if(producto.stock > 1 && producto.stock < 4){
                    card.append(`Unidades Disponibles: ${producto.stock}`)
                }else if(producto.stock == 1){
                    card.append(`Ultima unidad disponible!`)
                }
                
                i++
                cards.appendChild(card)
            }
            
        })
    }

    //Agregar al carro y Borrar un producto del carro
    $(document).on('click','button[type="button"]', function(){ //Detecta los clicks en los elementos tipo Button
        if(this.classList.contains("agregarProducto")){ //Este if evalua si el boton contiene la clase "agregarProducto", así se diferencia de otros botones en la página
            let id = parseInt(this.id.replace(/[^0-9]+/g, "")); //Obtiene el id del boton clickeado
            let producto = catalogo.find(productoo => productoo.codigo == id) //Busca el producto por el id(Declarado antes como el codigo del producto)
            let productoNuevo = new Producto(producto.imagen,producto.nombre,producto.codigo,producto.descripcion,producto.precio,producto.stock,producto.cantidad)
            carrito.añadirProducto(productoNuevo); 
            mostrarCarrito();
            console.log(carrito)
        }else if(this.classList.contains("botonEliminar")){
            let  id =  parseInt(this.id); //Obtiene el id del boton clickeado
            let producto = carrito.productos.find(productoo => productoo.codigo == id); //Busca el producto en el arreglo catalogo
            //let index = carrito.productos.indexOf(producto); //Obtiene el indice del producto en el carro
            producto.cantidad = 0
            carrito.eliminarItem(producto) //Elimina el producto del carro
            mostrarCarrito();
        }
        
    });

    //Mostrar productos en carro
    function mostrarCarrito(){
        eliminarInfoPrevia();
        carrito.productos.forEach(producto => {
            const productoTabla = document.createElement('tr')
            productoTabla.innerHTML =
            `
            <td>
                <img  src=${producto.imagen} width="100px">
            </td>
            <td id="${producto.codigo}">${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
            <td>
                <button id="${producto.codigo}" type="button" class="btn bg-danger botonEliminar">X</button>
            </td>
            `
            contenidoTabla.appendChild(productoTabla)
            
        })
        carrito.calcularTotales()
        
        $("#totalIva").text(`${formatoPeso.format(carrito.iva)}`);
        $("#totalBruto").text(`${formatoPeso.format(carrito.bruto)}`);
        $("#totalFinal").text(`${formatoPeso.format(carrito.total)}`);
        $("#totalNeto").text(`${formatoPeso.format(carrito.neto)}`)
        $("#precioEnvio").text(`${formatoPeso.format(carrito.envio)}`)
    }

    function eliminarInfoPrevia() {
        while(contenidoTabla.firstChild) {
            contenidoTabla.removeChild(contenidoTabla.firstChild)
        }
        $("#totalIva").text(`$${0}`);
        $("#totalBruto").text(`$${0}`);
        $("#totalFinal").text(`$${0}`);
        $("#totalNeto").text(`$${0}`)
        $("#precioEnvio").text(`$${0}`)
    }

    //Boton vaciar carro
    $("#vaciar-carrito").on("click" ,function(){
        carrito.eliminarCarro();
        eliminarInfoPrevia()
    })


    //Filtros
    function mostrarBusqueda(parametro){  
        let categoria = arreglo.filter(categoria => categoria.categoria == parametro)
        if(categoria.length > 0){
            cards.innerHTML = ""
            
            mostrarProductos(categoria[0].productos)
            
        }else{
            cards.innerHTML = "<h1>SIN RESULTADOS<h1>"
        }
    }

    //Busqueda por palabra
    $("#buttonBuscar").on("click",function(){ //Con boton buscar
        if($("#inputBusqueda").val()){
            let busqueda = $("#inputBusqueda").val();
            mostrarBusqueda(busqueda)
        }
    })

    $("#inputBusqueda").on("keyup",function(tecla){//Al presionar enter
        if (tecla.code === "Enter") {
            let prodEncontrado = [];
            let busqueda = $("#inputBusqueda").val();
            arreglo.forEach(categoria =>{
                categoria.productos.forEach(producto =>{
                    if( producto.nombre.toUpperCase() == busqueda.toUpperCase()){
                        prodEncontrado.push(producto)    
                    }
                })
            })
            if(prodEncontrado.length > 0){
                cards.innerHTML = ""
                mostrarProductos(prodEncontrado)
            }else{
                cards.innerHTML = "<h1>SIN RESULTADOS<h1>"
            }
            
            
        }
        if(!$("#inputBusqueda").val()){
            cards.innerHTML = ""
            mostrarProductos(catalogo)
        }
    })

    //Busqueda por categoria (select)

    //Ingreso de opciones a select de categoria
    arreglo.forEach(element =>{
        let option = document.createElement("option");
        option.text = element.categoria;
        option.id = element.categoria
        $("#selectCategorias").append(option)
    })

    //Evento al cambiar el valor del select
    $("#selectCategorias").on("change",() =>{
        if($("#selectCategorias").val() != "Buscar Categoría"){
            let valueSelect = $("#selectCategorias").val();
            mostrarBusqueda(valueSelect);
        }else  if($("#selectCategorias").val() == "Buscar Categoría"){
            cards.innerHTML = "";
            mostrarProductos(catalogo)
        }
        
    })

    
    //Busqueda por rango de precio
    $("#rango").on("change", () =>{
        let rangoPrecio = $("#rango").val();
        let arr = []
        arreglo.forEach(categoria =>{
            categoria.productos.forEach(producto =>{
                if(producto.precio < rangoPrecio){
                    arr.push(producto)
                }
            })
        })
        cards.innerHTML = ""
        mostrarProductos(arr)
        
    })



    $("#rango").on("change",function(){
        $("#divRango").text(`$0 hasta $${$("#rango").val()}`)
    })

    
}) //Aquí termina el then donde se ejecuta todo el código que controla el funcionamiento de la página
.catch(err => console.log(err)) //la función catch se ejecuta en caso de encontrar un error, en este caso muestra por consola el error, pero podría ejecutar cualquier cosa que queramos