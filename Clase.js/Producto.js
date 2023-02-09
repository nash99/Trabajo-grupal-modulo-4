// Creación de Clase con ES6

class Producto {
nombre;
imagen;
codigo;
descripcion;
categoria;
precio;
cantidad; 
stock

// getters 
get nombre(){this.nombre = nombre}
get imagen(){this.imagen = imagen}
get codigo(){this.codigo = codigo}
get descripcion(){this.descripcion = descripcion}
get categoria(){this.categoria = categoria}
get precio(){this.precio = precio}
get cantidad(){this.cantidad = cantidad}
get stock(){this.stock = stock}

// setters
set nombre (nombre){this.nombre = nombre}
set imagen (imagen){this.imagen = imagen}
set codigo (codigo){this.codigo = codigo}
set descripcion (descripcion){this.descripcion = descripcion}
set categoria (categoria){this.categoria = categoria}
set precio (precio){this.precio = precio}
set cantidad (cantidad){this.cantidad = cantidad}
set stock (stock){this.stock = stock}

constructor(nombre, imagen, codigo, descripcion, categoria, precios, cantidad, stock){ 
this.nombre = nombre;
this.imagen = imagen;
this.codigo = codigo;
this.descripcion = descripcion;
this.categoria = categoria;
this.precios = precios;
this.cantidad = cantidad;
this.stock = stock;
}
};


// Creación de Clase con ES5
// function Producto(nombre, imagen, codigo, descripcion, precio, stock) {
//     this.nombre = nombre;
//     this.imagen = imagen;
//     this.codigo = codigo;
//     this.descripcion = descripcion;
//     this.categoria = categoria;
//     this.precio = precio;
//     this.cantidad = cantidad;
//     this.stock = stock;

// // getters

// this.getNombre = () => {return this.nombre};
// this.getImagen = () => {return this.imagen};
// this.getCodigo = () => {return this.codigo};
// this.getDescripcion = () => {return this.descripcion};
// this.getCategoria = () => {return this.categoria};
// this.getPrecio = () => {return this.precio};
// this.getCantidad = () => {return this.Cantidad};
// this.getStock = () => {return this.stock};

// // setters
// this.setNombre = (nombre) => {this.nombre = nombre;};
// this.setImagen = (imagen) => {this.imagen = imagen;};
// this.setCodigo = (codigo) => {this.codigo = codigo;};
// this.setDescripcion = (descripcion) => {this.descripcion = descripcion;};
// this.setCategoria = (categoria) => {this.categoria = categoria;};
// this.setPrecio = (precio) => {this.precio = precio;};
// this.setCantidad = (cantidad) => {this.cantidad = cantidad;};
// this.setStock = (stock) => {this.stock = stock;}


// };
