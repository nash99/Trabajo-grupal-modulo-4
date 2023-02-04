
function Carro(){
    this.productos = [];
    this.neto = 0;
    this.bruto = 0;
    this.descuento = 0;
    this.total = 0;
    this.iva = 0;

    //Getters
    this.getProductos = () => {return this.productos};
    this.getNeto = () => {return this.neto};
    this.getBruto = () => {return this.bruto};
    this.getDescuento = () => {return this.descuento};
    this.getTotal = () => {return this.total};
    this.getIva = () => {return this.iva}

    //Setters
    this.setNeto = () => {
        if (this.productos.length == 0) {
            this.neto = 0
        } else {
            this.productos.forEach(producto => {
                this.neto += producto.precio
            });
        }
    };

    this.setBruto = () => {
        if (this.productos.length == 0) {
            this.bruto = 0
        } else {
            this.bruto = Math.round(this.neto * 1.19)
        }
        
    };

    this.setDescuento = () => {
        if (this.productos.length == 0) {
            this.descuento = 0
        } else {
            if(this.total > 100000){
                this.descuento = Math.round(this.total - this.total * 0.05)
            }else{
                this.descuento = 0
            }
        }
    };

    this.setIva = () => {
        if (this.productos.length == 0) {
            this.iva = 0
        } else {
            this.iva = Math.round(this.total * 0.19)
        }
    }

    this.calcularTotales = () =>{
        this.total = this.bruto - this.descuento
    }

    
   

}