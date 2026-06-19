// Taxis

/*
Taxi Tradicional
conductor
Licencia
Patente
Color del Techo
*/
const taxi1 = new TaxiTradicional(
    "Carlos Rodriguez",
    "A1",
    "AA-BB-11",
    "Amarillo"
);

/*
Taxi Express
conductor
licencia
patente
tipo
modelo*/
const taxi2 = new TaxiExpress(
    "Juan Salazar",
    "B",
    "CC-DD-22",
    "Express",
    "Familiar"
)

/*
Taxi Premium
conductor
licencia
patente
modelo
servicios*/
const taxi3 = new TaxiPremium(
    "Felicia González",
    "B",
    "EE-FF-33",
    "Premium",
    "SUV",
    ["Aire Acondicionado", "Asientos Grandes", "Pago Digital"]
);

/*
Taxi Cargo
conductor
licencia
patente
capacidadCargo*/
const taxi4 = new TaxiCargo(
    "Rodrigo Morales",
    "B",
    "GG-HH-44",
    "300 KG"
);

console.log(taxi1);
console.log(taxi2);
console.log(taxi3);
console.log(taxi4);

document.getElementById("resultado-taxis").innerHTML = `
    <h3 class="h5">Escenario Taxis Urbanos</h3>

    <strong>Taxi tradicional</strong><br>
    ${taxi1.mostrarInfo()}

    <hr>

    <strong>Taxi Express</strong><br>
    ${taxi2.mostrarInfo()}

    <hr>

    <strong>Taxi Premium</strong><br>
    ${taxi3.mostrarInfo()}

    <hr>

    <strong>Taxi Cargo</strong><br>
    ${taxi4.mostrarInfo()}
`;

// Sony
const televisor1 = new Televisor(
    "Sony Bravia",
    "K-43s30 LA8",
    549990,
    43,
    "4K"
);

const consola1 = new Consola(
    "Sony PlayStation 5",
    "Slim",
    599990,
    "1 TB",
    "Gran Turismo 7 + Astro Bot + EA FC26"
);

const audio1 = new Audio(
    "Audifonos Sony",
    "WH-1000XM5",
    349990,
    "Audifonos Inalámbricos"
);

console.log(televisor1);
console.log(consola1);
console.log(audio1);

document.getElementById("resultado-sony").innerHTML = `
    <h3 class="h5">Escenario Catálogo Sony</h3>

    <strong>Televisor</strong><br>
    ${televisor1.mostrarInfo()}

    <hr>

    <strong>Consola</strong><br>
    ${consola1.mostrarInfo()}

    <hr>

    <strong>Audio</strong><br>
    ${audio1.mostrarInfo()}
`;

// Sumatoria
// Se genera un numero entre 1 y 10
let base = Math.floor(Math.random() * 10 + 1);

// Se crea el objeto de la clase sumatoria
const suma1 = new Sumatoria(base);

// Conectar botón
document.getElementById("btn-sumar").addEventListener("click", function(){
    suma1.sumar();
});