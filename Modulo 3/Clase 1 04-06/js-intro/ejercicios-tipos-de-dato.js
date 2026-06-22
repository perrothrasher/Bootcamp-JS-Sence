// =======================================================
// MÓDULO 3 - FUNDAMENTOS DE PROGRAMACIÓN EN JAVASCRIPT
// Ejercicio práctico: comentarios, variables, tipos de datos y constantes
// Ejecutar con: node app.js
// =======================================================


// 1. Escriba un comentario en una línea
// Esto es un comentario el cual será ignorado

// 2. Escriba un comentario en varias líneas
/*Esto es un comentario
de varias lineas el cual será
ignorado por el codigo*/

// 3. Declare variables con valores asociados a todos los tipos de datos primitivos

// Cadena de texto (String)
let texto = "Esto es una cadena de texto (String)"

// Número (Number)
let numero = 123;

// Booleano (Boolean)
let es_Dia = true;

// Undefined
let hola = undefined;

// Null
let adios = null;

// Symbol
let simbolo = Symbol("simbolo");

// BigInt
let BigInt_1 = BigInt(9999999999999999999999999999999999999999);
let BigInt_2 = 9999999999999999999999999999999999999999n;


// 4. Imprima por consola el valor de todas las variables

// Use console.log() para mostrar el contenido de cada variable
console.log("Tipos de datos");
console.log(texto);
console.log(numero);
console.log(es_Dia);
console.log(hola);
console.log(adios);
console.log(simbolo);
console.log(BigInt_1);
console.log(BigInt_2);

// 5. Imprima por consola el tipo de dato de todas las variables
console.log("######################################################")
// Use typeof para verificar el tipo de dato de cada variable
console.log("Tipos de datos con typeof");
console.log(typeof nombre);
console.log(typeof numero);
console.log(typeof es_Dia);
console.log(typeof hola);
console.log(typeof adios);
console.log(typeof simbolo);
console.log(typeof BigInt_1);
console.log(typeof BigInt_2);


// 6. Modifique los valores de las variables por otros valores del mismo tipo

// Cambie el valor del String
texto = "Esta es una cadena de texto modificada"

// Cambie el valor del Number

numero = 123456789;


// 7. Modifique los valores de algunas variables por valores de distinto tipo

// Observe qué permite JavaScript y qué resultado se obtiene al ejecutar

texto = 99999999;
numero = "Uno, Dos, Tres, Cuatro";

console.log("Valores modificados");
console.log("La variable 'texto' ahora es un numero: ",texto, "y es de tipo: ", typeof texto);
console.log("La variable 'numero' ahora es un texto: ", numero, "y es de tipo: ", typeof numero);