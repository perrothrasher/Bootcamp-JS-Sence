// Clase Padre
class productoSony{
    constructor(nombre, modelo, categoria, precio){
        this.nombre = nombre;
        this.modelo = modelo;
        this.categoria = categoria;
        this.precio = precio;
    }

    mostrarInfo() {
        return `
            Producto: ${this.nombre} <br>
            Modelo: ${this.modelo} <br>
            Categoría: ${this.categoria} <br>
            Precio referencial: $${this.precio}
        `;
    }
}

// Clase hijo
// Televisores
class Televisor extends productoSony{
    constructor(nombre, modelo, precio, pulgadas, resolucion){
        super(nombre, modelo, "Televisores", precio);
        this.pulgadas = pulgadas;
        this.resolucion = resolucion;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Pulgadas: ${this.pulgadas} <br>
            Resolución: ${this.resolucion}
        `;
    }
}

// Consolas
class Consola extends productoSony{
    constructor(nombre, modelo, precio, almacenamiento, version){
        super(nombre, modelo, "Consolas", precio);
        this.almacenamiento = almacenamiento;
        this.version = version;
    }

    mostrarInfo(){
        return`
            ${super.mostrarInfo()} <br>
            Almacenamiento: ${this.almacenamiento} <br>
            Version: ${this.version}
        `
    }
}

// Audio
class Audio extends productoSony {
    constructor(nombre, modelo, precio, tipoAudio) {
        super(nombre, modelo, "Audio", precio);
        this.tipoAudio = tipoAudio;
    }

    mostrarInfo() {
        return `
            ${super.mostrarInfo()} <br>
            Tipo de audio: ${this.tipoAudio}
        `;
    }
}