function Canasta() {
    this.productos = [];
    this.subtotalNeto = 0;
    this.subtotalBruto = 0;
    this.montoFinal = 0;
    this.costoFlete = 0;
    this.iva = 0;
    this.descuento = 0;

    // getters
    this.getProductos = () => { return this.productos };
    this.getSubtotalNeto = () => { return this.subtotalNeto };
    this.getSubtotalBruto = () => { return this.subtotalBruto };
    this.getNontoFinal = () => { return this.montoFinal };
    this.getCostoFlete = () => { return this.costoFlete };
    this.getIva = () => { return this.iva };
    this.getDescuento = () => { return this.descuento };

    // setters
    this.setProductos = (productos) => { this.productos = productos };

    this.setSubtotalNeto = (subtotalNeto) => {
        if (this.productos.lenght > 0) {
            this.productos.map(producto => {
                this.subtotalNeto += this.productos.precio;
            });
        } else {
            this.subtotalNeto = 0;
        }
    };

    this.setSubtotalBruto = (subtotalBruto) => {
        if (this.productos.length > 0) {
            this.subtotalBruto = this.subtotalNeto + this.iva;
        } else {

        }
    };

    this.setMontoFinal = (montoFinal) => {
        if (condition) {
            this.montoFinal = this.subtotalBruto + this.flete - this.descuento;
        } else {

        }
    };

    // this.setCostoFlete = (costoFlete) => {
    //     if (this.productos.length > 0) {
    //         this.costoFlete = this.tamañoPdto * 0.05;
    //     } else {

    //     }
    // };

    this.setIva = (iva) => {
        if (this.productos.length > 0) {
            this.iva = Math.round(this.subtotalNeto * 0.19);
        } else {
            this.iva = 0;
        }
    };

    // this.setDescuento = (descuento) => {
    //     if (condition) {
    //         this.Descuento = descuento
    //     } else {

    //     }
    // };

};