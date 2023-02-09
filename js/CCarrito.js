class Carrito { 

    //ATRIBUTOS

    productos = [];
    totalBruto;
    iva;
    totalNeto;
    envio;
    totalPagar;
    


    constructor(productos,totalBruto,iva,totalNeto,envio,totalPagar){
        this.productos = productos;
        this.totalBruto = totalBruto
        this.iva = iva
        this.totalNeto = totalNeto
        this.envio = envio
        this.totalPagar = totalPagar
    }


    //Getters

    get productos(){return this.productos};
    get totalBruto(){return this.totalBruto};
    get iva(){return this.iva}
    get totalNeto(){return this.totalNeto};
    get envio(){return this.envio};
    get totalPagar(){return this.totalPagar};




    //SETTERS
    set productos(productos_){this.productos=productos_};
    set totalBruto(totalBruto_){this.totalBruto = totalBruto_};
    set iva(iva_){this.iva = iva_};
    set totalNeto(totalNeto_){this.totalNeto = totalNeto_};
    set envio(envio_){this.envio = envio_};
    set totalPagar(totalPagar_){this.totalPagar = totalPagar_};


   
        



}