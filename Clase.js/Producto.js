function Producto(nombre, imagen, codigo, descripcion, precio, stock) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
    this.stock = stock;

// getters

this.getNombre = () => {return this.nombre};
this.getImagen = () => {return this.imagen};
this.getCodigo = () => {return this.codigo};
this.getDescripcion = () => {return this.descripcion};
this.getPrecio = () => {return this.precio};
this.getCantidad = () => {return this.Cantidad};
this.getStock = () => {return this.stock};

// setters
this.setNombre = (nombre) => {this.nombre = nombre;};
this.setImagen = (imagen) => {this.imagen = imagen;};
this.setCodigo = (codigo) => {this.codigo = codigo;};
this.setDescripcion = (descripcion) => {this.descripcion = descripcion;};
this.setPrecio = (precio) => {this.precio = precio;};
this.setCantidad = (cantidad) => {this.cantidad = cantidad;};
this.setStock = (stock) => {this.stock = stock;}

};
