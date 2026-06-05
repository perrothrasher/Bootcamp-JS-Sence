// Tipos de datos en JS

// Tipos de datos primitivos
// 1. Strings (cadenas de texto)
let nombre = "Francisco";
let alias = "Pancho";
let email = "hola@hola.com";

console.log("######### Strings #########");
console.log(nombre);
console.log(alias);
console.log(email);
console.log("###########################");

// 2. Numeros
let edad = 25;
let altura = 1.74

console.log("######### Numeros #########");
console.log(edad);
console.log(altura);
console.log("###########################");

// 3. Booleano
let es_Estudiante = true;
let es_Profesor = false;

console.log("######### Booleano #########");
if (es_Estudiante == 1){
    console.log("Es estudiante");
} else{
    console.log("Es profesor");
}
console.log("###########################");

// 4. Undefined
let undefinedValue

console.log("######### Undefined #########");
console.log(undefinedValue);
console.log("###########################");

// 5. Null
let nullValue = null;

console.log("######### Null #########");
console.log(nullValue);
console.log("###########################");

// 6. Symbol
let mySymbol = Symbol("unique");

console.log("######### Symbol #########");
console.log(mySymbol);
console.log("###########################");

// 7. Big Int
let myBig = BigInt(12364971236497213649712364912364912364912364978123649812384);
let myBig2 = 12364971236497213649712364912364912364912364978123649812384n;

console.log("######### Big Int #########");
console.log("BigInt 1: ", myBig);
console.log("BigInt 2: ", myBig2);