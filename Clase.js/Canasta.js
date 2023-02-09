class Canasta {
productos = [];
subtotalNeto;
subtotalBruto;
montoFinal;
costoFlete;
iva;
descuento


// getters ES 6
get productos(){return this.productos};
get subtotalNeto(){return this.subtotalNeto};
get subtotalBruto(){return this.subtotalBruto};
get montoFinal(){return this.montoFinal};
get costoFlete(){return this.costoFlete};
get iva(){return this.iva};
get descuento(){return this.descuento};

// setters ES 6
set productos(productos){this.productos = productos};
set subtotalNeto(subtotalNeto){this.subtotalNeto = subtotalNeto};
set subtotalBruto(subtotalBruto){this.subtotalBruto = subtotalBruto};
set montoFinal(montoFinal){this.montoFinal = montoFinal};
set costoFlete(costoFlete){this.costoFlete = costoFlete};
set iva(iva){this.iva = iva};
set descuento(descuento){this.descuento = descuento};

calcularTotales (){
    let preciosCarrito = [];
productos.forEach(element => {
    preciosCarrito.push(element.precio);
    })
    subtotalBruto = preciosCarrito.reduce((a,b) =>
        a + b, 0)
    if(subtotalBruto > 100000){
    costoFlete = subtotalBruto * 0.05;
    } else {
        costoFlete = 0;
    }
    iva = (subtotalBruto + costoFlete) * 0.19;
    montoFinal = subtotalBruto + costoFlete + iva;
}

agregarProductos(){

}
}





// ES 5
// function Canasta() {
//     this.productos = [];
//     this.subtotalNeto = 0;
//     this.subtotalBruto = 0;
//     this.montoFinal = 0;
//     this.costoFlete = 0;
//     this.iva = 0;
//     this.descuento = 0;

//     // getters
//     this.getProductos = () => { return this.productos };
//     this.getSubtotalNeto = () => { return this.subtotalNeto };
//     this.getSubtotalBruto = () => { return this.subtotalBruto };
//     this.getNontoFinal = () => { return this.montoFinal };
//     this.getCostoFlete = () => { return this.costoFlete };
//     this.getIva = () => { return this.iva };
//     this.getDescuento = () => { return this.descuento };

//     // setters
//     this.setProductos = (productos) => { this.productos = productos };

//     this.setSubtotalNeto = (subtotalNeto) => {
//         if (this.productos.lenght > 0) {
//             this.productos.map(producto => {
//                 this.subtotalNeto += this.productos.precio;
//             });
//         } else {
//             this.subtotalNeto = 0;
//         }
//     };

//     this.setSubtotalBruto = (subtotalBruto) => {
//         if (this.productos.length > 0) {
//             this.subtotalBruto = this.subtotalNeto + this.iva;
//         } else {

//         }
//     };

//     this.setMontoFinal = (montoFinal) => {
//         if (condition) {
//             this.montoFinal = this.subtotalBruto + this.flete - this.descuento;
//         } else {

//         }
//     };

//     this.setCostoFlete = () => {
//         if (this.montoNeto > 100000) {
//            return this.costoFlete = 0;
    
//         } else {
//             return this.costoFlete = this.montoNeto * 0.05;
//         }
//     };

//     this.setIva = (iva) => {
//         if (this.productos.length > 0) {
//             this.iva = Math.round(this.subtotalNeto * 0.19);
//         } else {
//             this.iva = 0;
//         }
//     };

//     // this.setDescuento = (descuento) => {
//     //     if (condition) {
//     //         this.Descuento = descuento
//     //     } else {

//     //     }
//     // };

// };