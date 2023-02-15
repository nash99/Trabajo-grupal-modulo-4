class Carrito {
    
//ATRIBUTOS
productos = [];
neto;
bruto;
envio;
total;
iva; 
// va sin constructores porque el carrito debe ser algo a settear.
//Getters en ES6 va get separado.
get productos(){return this.productos};
get neto(){return this.neto};
get bruto(){return this.bruto};
get envio(){return this.envio};
get total(){return this.total};
get iva(){return this.iva}
    
//Setters
//por razones de recursividad(se llama a si mismo muchas veces) por eso se utiliza el "_productos"
set productos(_productos){this.productos = _productos};
set neto(_neto){this.neto = _neto};
set bruto(_bruto){this.bruto = _bruto};
set envio(_envio){this.envio = _envio};
set total(_total){this.total = _total};
set iva(_iva){ this.iva = _iva};
}

//MOSTRAR CARRITO
       
