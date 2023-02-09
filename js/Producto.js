class Producto{ // P:por qué no tiene constructores? estan al final jaja
   
   //____ATRIBUTOS_____?? esto es colocar atributo = ""
    imagen;
    nombre;
    codigo;
    descripcion;
    precio;
    cantidad; 
    stock;
    // Por qué estan indicandos sin nada? sin this y sin igual ?
    // si lo dejo sin constructor y busco el atributo "imagen" al utilizarlo como acá arriba se entregará undefined... si lo declaro como ="", me entregará el paramtro vacio ""


    //_____CONSTRUCTOR________

    constructor(imagen,nombre,codigo,descripcion,precio,stock,cantidad){
        // imagen que va arriba "imagen;" va a ser igual a la imagen ingresada "imagen"
        this.imagen = imagen;
        this.nombre = nombre;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.stock = stock;
    }

    //_______METODOS_____
    //Getters: get imagen vacio y retorna la imagen que también esta vacío 

    get imagen(){return this.imagen};
    get nombre(){return this.imagen};
    get codigo(){return this.imagen};
    get descripcion(){return this.imagen};
    get precio(){return this.imagen};
    get cantidad(){return this.imagen};
    get stock(){return this.imagen};
    //get categoria(){return this.imagen}; porqué no tiene la categoría?


    // por qué va entre parentesis la imagen? va en parentesis porque el setter necesita saber al atributo al cual va a responder.
    set imagen(imagen){this.imagen = imagen};
    set nombre(nombre){this.nombre = nombre};
    set codigo(codigo){this.codigo = codigo};
    set descripcion(descripcion){this.descripcion = descripcion};
    set precio(precio){this.precio = precio};
    set cantidad(cantidad){this.cantidad = cantidad};
    set stock(stock){this.stock = stock};

 

}