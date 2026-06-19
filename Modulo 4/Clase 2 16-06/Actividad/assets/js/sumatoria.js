class Sumatoria {
    constructor(base) {
        this.base = base;
        this.acumulado = 0;
        this.contador = 0;

        document.getElementById("resultado-sumatoria").innerHTML = `
            Número base generado: ${this.base} <br>
            Presione el botón para comenzar la sumatoria.
        `;
    }

    sumar() {
        this.contador++;
        this.acumulado = this.acumulado + this.base;

        document.getElementById("resultado-sumatoria").innerHTML += `
            <br>
            Ejecución ${this.contador}: acumulado = ${this.acumulado}
        `;

        console.log("Ejecución:", this.contador);
        console.log("Acumulado:", this.acumulado);
    }
}