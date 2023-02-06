function Producto(id,nombre,precio,stock){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio ;
    this.stock = stock;

    this.getId = () =>{return this.id};// se escribre como getNombre para evitar que se pueda modificar ese dato.
    this.getNombre = () =>{return this.nombre};
    this.getPrecio = () =>{return this.precio};
    this.getStock = () =>{return this.stock};


}

____