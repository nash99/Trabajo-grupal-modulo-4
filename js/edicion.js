import { Api } from "./API.js";
import{Producto} from "./Producto.js"

let api = new Api()
let categorias = await api.obtenerCategoria()
let id =JSON.parse(localStorage.getItem("id")) 
let producto = (await api.buscarProducto(id))[0];

document.getElementById("nombreEdit").value = producto.nombre;
document.getElementById("precioEdit").value = producto.precio;
document.getElementById("linkEdit").value = producto.link;
document.getElementById("stockEdit").value = producto.stock;
document.getElementById("etiquetaEdit").value = producto.etiqueta;
document.getElementById("descripcionEdit").value = producto.descripcion;



document.getElementById("sucursalEdit").value = producto.idSucursal;
categorias.forEach(element => { 
    if(element.id == 9 || element.id == 4 || element.id == 3 || element.id == 2){ 
        if(element.id == producto.idCategoria){
            document.getElementById("categoriaSelected").value= producto.idCategoria
            document.getElementById("categoriaSelected").innerHTML= element.nombre
        }else{
            document.getElementById("categoriaEdit").innerHTML += `<option value="${element.id}">${element.nombre}</option>`
        }
    }
});
document.getElementById("formEdicion").addEventListener("submit",event =>{
    event.preventDefault();
    let arrProdEdit = document.getElementsByClassName("datoEdit");
    let prod = new Producto(arrProdEdit.nombreEdit.value,parseInt(arrProdEdit.precioEdit.value),arrProdEdit.linkEdit.value,parseInt(arrProdEdit.stockEdit.value),arrProdEdit.etiquetaEdit.value,arrProdEdit.descripcionEdit.value,parseInt(arrProdEdit.categoriaEdit.value),parseInt(arrProdEdit.sucursalEdit.value))
    prod.setID(parseInt(id))
    api.editarProducto(prod)
    window.close()
})