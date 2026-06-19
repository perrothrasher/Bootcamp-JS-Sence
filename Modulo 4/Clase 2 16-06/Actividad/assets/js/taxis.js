// Clase Padre
class Taxi {
    constructor(conductor, licencia, tipo, patente){
        this.conductor = conductor;
        this.licencia = licencia;
        this.tipo = tipo;
        this.patente = patente;
    }

    mostrarInfo(){
        return`
            Conductor: ${this.conductor} <br>
            Licencia: ${this.licencia} <br>
            Tipo: ${this.tipo} <br>
            Patente: ${this.patente}
        `;
    }
}

// Clase hijo
// Taxi tradicional
class TaxiTradicional extends Taxi{
    constructor(conductor, licencia, patente, colorTecho){
        super(conductor, licencia, "Taxi Tradicional",patente);
        this.colorTecho = colorTecho;
    }

    mostrarInfo(){
        return`
            ${super.mostrarInfo()} <br>
            Color del techo: ${this.colorTecho}
        `;
    }
}

// Taxi Particular
class TaxiParticular extends Taxi{
    constructor(conductor, licencia, patente, tipo, categoria){
        super(conductor, licencia, patente, tipo);
        this.categoria = categoria;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Categoría: ${this.categoria}
        `;
    }
}

// Taxi Express
class TaxiExpress extends TaxiParticular{
    constructor(conductor, licencia, patente, modelo, categoria){
        super(conductor, licencia, "Taxi Express", patente, categoria);
        this.modelo = modelo;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Modelo: ${this.modelo}
        `;
    }
}

// Taxi Premium
class TaxiPremium extends TaxiParticular{
    constructor(conductor, licencia, categoria, patente, modelo, servicios){
        super(conductor, licencia, "Taxi Premium", categoria, patente)
        this.modelo = modelo;
        this.servicios = servicios;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Modelo: ${this.modelo} <br>
            Servicios: ${this.servicios.join(", ")}
        `;
    }
}

// Taxi Cargo
class TaxiCargo extends Taxi{
    constructor(conductor, licencia, patente, capacidadCarga){
        super(conductor, licencia, "Taxi Cargo", patente);
        this.capacidadCarga = capacidadCarga;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Capacidad de carga: ${this.capacidadCarga}
        `;
    }
}