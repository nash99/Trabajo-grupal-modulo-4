function Producto(imagen,nombre,codigo,descripcion,precio,stock){
    this.imagen = imagen;
    this.nombre = nombre;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad;
    this.stock = stock;

    //Getters
    this.getImagen      = () => {return this.imagen};
    this.getNombre      = () => {return this.nombre};
    this.getCodigo      = () => {return this.codigo};
    this.getDescripcion = () => {return this.descripcion};
    this.getPrecio      = () => {return this.precio};
    this.getCantidad    = () => {return this.cantidad};
    this.getStock       = () => {return this.stock}

    //Setters
    this.setImagen      = (imagen) =>       {this.imagen = imagen};
    this.setNombre      = (nombre) =>       {this.nombre = nombre};
    this.setCodigo      = (codigo) =>       {this.codigo = codigo};
    this.setDescripcion = (descripcion) =>  {this.descripcion = descripcion};
    this.setPrecio      = (precio) =>       {this.precio = precio};
    this.setCantidad    = (cantidad) =>     {this.cantidad = cantidad};
    this.setStock       = (stock) =>        {this.stock = stock};

    //Custom

    

}