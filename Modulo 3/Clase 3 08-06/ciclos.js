// For
for(i=1; i <= 3; i++){
    console.log("Intento: " + i);
}

console.log("Fuera del ciclo for");

console.log("###############################################################");

// While
let contador = 1;

while(contador <= 3){
    console.log("Intento: "+ contador);
    contador++;
}

console.log("Fuera del ciclo while");



// Do while
let counter = 1;
do{
    console.log("Intento: " + counter)
    counter++;
}while(counter<=3);

console.log("Fuera del ciclo do while");

console.log("###############################################################");

// Insertar y borrar elementos

let datos;

datos = ['Dato 1', 'Dato 2', 'Dato 3'];
console.log(datos);

// Insertar datos
datos[4] = 'Dato 5';
console.log(datos);

datos.push = 'Dato 6';
console.log(datos);

console.log("###############################################################");

// splice
let frutas = ["manzana", "pera", "uva", "sandia"];
console.log(frutas);

frutas.splice(2, 1); // Desde la posición 2, elimina 1 elemento
console.log(frutas);

console.log("###############################################################");

// Buscar con includes
let usuarios = ["Ana", "Pedro", "Camila"];

console.log(usuarios.includes("Pedro"));
console.log(usuarios.includes("Juan"));