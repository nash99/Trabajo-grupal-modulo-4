
class Carro{
    productos = [];
    neto;
    bruto;
    envio;
    total;
    iva; 

    //Getters
    get productos(){return this.productos};
    get neto(){return this.neto};
    get bruto(){return this.bruto};
    get envio(){return this.envio};
    get total(){return this.total};
    get iva(){return this.iva}

    //Setters

    set productos(_productos){this.productos = _productos};
    set neto(_neto){this.neto = _neto};
    set bruto(_bruto){this.bruto = _bruto};
    set envio(_envio){this.envio = _envio};
    set total(_total){this.total = _total};
    set iva(_iva){ this.iva = _iva}
    
    //Custom
    calcularTotales = () =>{
        let valor = []
        this.productos.forEach(element =>{
            valor.push(element.precio)
        })
        this.neto = valor.reduce((a, b) => a + b, 0);
        if(this.neto < 100000){
            this.envio = Math.round(this.neto * 0.05)
        }else{
            this.envio = 0
        }
        this.total = this.neto - this.envio;
        this.iva = Math.round(this.total * 0.19);
        this.bruto = this.neto - this.iva;
        
        
        
    }

    añadirProducto = (productoNuevo) =>{
   
        if(carrito.productos.find(producto => producto.codigo == productoNuevo.codigo)){
            let prod = carrito.productos.find(producto => producto.codigo == productoNuevo.codigo)
            prod.cantidad += 1;
            prod.precio *= prod.cantidad;
            
        }else{
            productoNuevo.cantidad += 1
            this.productos.push(productoNuevo)
            
        }
        
    }

    eliminarCarro = () =>{
        this.productos.forEach(element =>{
            element.cantidad = 0
        })
        this.productos =[]
        this.total = 0;
        this.iva = 0;
        this.neto = 0;
        this.descuento = 0;
        this.bruto = 0;
    }

    eliminarItem = (prod) =>{
        let indice = this.productos.indexOf(prod)
        
        this.productos.splice(indice,1)
    }
    
   

}