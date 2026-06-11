// Strings
// Primitivos - Inmutables - Iterables

// Concatenación de strings
let myName = "Francisco";

let saludo = "Hola " + myName + "!";
// console.log(saludo);
// console.log(typeof saludo);


// Longitud de un array
// Introducción a metodos
// console.log(saludo.length);


// Acceso a caracteres
// console.log(saludo[0]);


// Metodos comunes
// console.log(saludo.toLocaleLowerCase()); // Para escribir a minúsculas el string
// console.log(saludo.toLocaleUpperCase()); // Para escribir en mayúsculas el string
// console.log(saludo.indexOf("Francisco")); // Muestra el indice donde parte el string
// console.log(saludo.includes("Francisco")); // Muestra si el string existe o no
// console.log(saludo.replace("Francisco", "Pancho")); // Reemplaza el valor dentro del string
// console.log(saludo.startsWith("Hola")); // Inicia con
// console.log(saludo.endsWith("!")); // Finaliza con


// Split
let palabras = saludo.split(" ");
let letras = saludo.split("");
// console.log(palabras);
// console.log(letras);


// Trim
let sucio = "  Hola mundo    ";
// console.log(sucio.trim()); // Elimina espacios en blanco innecesarios


// Repeat
// console.log("JS".repeat(3));


// Template literal
let mensaje = "Hola, este es mi clase";
let email = "prueba@prueba.com";

// console.log(`Hola, soy ${myName} y mi correo es ${email}`);


// Recorrer un string
let fruta = "Banana";

for (let index = 0; index < fruta.length; index++){
    console.log(`${index} ${fruta[index]}`);
}