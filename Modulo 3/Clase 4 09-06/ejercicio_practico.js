function calcularIVA(costo, descuento){
    // Se calcula el iva del objeto a vender
    let iva = costo * 0.19;
    // Se le suma el iva al objeto a vender
    let costoConIva = costo + iva;
    // Se calcula el valor del descuento
    let montoDescuento = costoConIva * descuento / 100;

    let costoFinal = costoConIva - montoDescuento;
    return costoFinal;
}

console.log(calcularIVA(20000, 10))