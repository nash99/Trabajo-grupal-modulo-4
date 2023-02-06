
class Carro{
    productos = [];
    neto;
    bruto;
    descuento;
    total;
    iva; 

    //Getters
    get productos(){return this.productos};
    get neto(){return this.neto};
    get bruto(){return this.bruto};
    get descuento(){return this.descuento};
    get total(){return this.total};
    get iva(){return this.iva}

    //Setters

    set producto(_producto){this.producto = _producto};
    set neto(_neto){this.neto = _neto};
    set bruto(_bruto){this.bruto = _bruto};
    set descuento(_descuento){this.descuento = _descuento};
    set total(_total){this.total = _total};
    set iva(_iva){ this.iva = _iva}
    //Constructor
    
    
    //Custom
    calcularTotales = () =>{
        this.productos.forEach(element => {
            this.neto += element.precio;
            this.iva = Math.round(this.neto * 0.19)
            this.bruto = this.neto - this.iva;
            if(this.neto > 100000){
                this.descuento = Math.round(this.neto * 0.05)
            }else{
                this.descuento = 0
            }
            this.total = this.neto - this.descuento
        });
        return this.neto,this.iva,this.bruto,this.descuento,this.total
    }

    añadirProducto = (productoNuevo) =>{
        if(carrito.productos.find(producto => producto.codigo == productoNuevo.codigo)){
            let prod = carrito.productos.find(producto => producto.codigo == productoNuevo.codigo)
            prod.cantidad += 1
            carrito.productos.indexOf(prod)
            console.log(prod)
        }else{
            productoNuevo.cantidad += 1
            this.productos.push(productoNuevo)
            console.log(productoNuevo)
        }
        
    }

    eliminarCarro = () =>{
        this.productos = [];
        this.total = 0;
        this.iva = 0;
        this.neto = 0;
        this.descuento = 0;
        this.bruto = 0;
    }

    
   

}