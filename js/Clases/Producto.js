class Producto{
    imagen;
    nombre;
    codigo;
    descripcion;
    precio;
    cantidad;
    stock;

    //Getters
    get imagen(){return this.imagen};
    get nombre(){return this.nombre};
    get codigo(){return this.codigo};
    get descripcion(){return this.descripcion};
    get precio(){return this.precio};
    get cantidad(){return this.cantidad};
    get stock(){return this.stock}

    //Setters
    set imagen(imagen){this.imagen = imagen};
    set nombre(nombre){this.nombre = nombre};
    set codigo(codigo){this.codigo = codigo};
    set descripcion(descripcion){this.descripcion = descripcion};
    set precio(precio){this.precio = precio};
    set cantidad(cantidad){this.cantidad = cantidad};
    set stock(stock){this.stock = stock};

    constructor(imagen,nombre,codigo,descripcion,precio,stock,cantidad){
        this.imagen = imagen;
        this.nombre = nombre;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.stock = stock;
    }

}