// Operadores aritmeticos
console.log(5+5);

let a = 5;
let b = 10;
console.log("Valor de a: ", a);
console.log("Valor de b: ", b);
console.log(a + b); // suma
console.log(a - b); // resta
console.log(a * b); // multiplicación
console.log(a / b); // divisin
console.log(a % b); // resto de una división
console.log(a ** b); // exponente a^b´

// Incrementar o decrementar el valor de una variable
a++;
console.log("Incrementando el valor de a: ", a);
b--;
console.log("Decrementando el valor de b: ", b);
console.log("##################################################");
// Operador de asignación
let miVariable = 2;
console.log("Mi variable es: ", miVariable);

// Combinación de un operador aritmetico con una asignación
miVariable += 2; // se suma 2
console.log(miVariable);
miVariable -= 1; // se resta 1
console.log(miVariable);
console.log("##################################################");

// Operadores de comparación
console.log(a);
console.log(b);
console.log("a > b: ", a > b);
console.log("a < b: ", a < b);
console.log("10 >= 10: ", 10>=10);
console.log("10 == 10: ", 10==10);
console.log("##################################################");

// Diferencias entre == y ===
console.log(a == 6); // true => solo el valor
console.log(a == "6"); // true
console.log(a === "6"); // false
console.log("##################################################");

// Desigualdad
console.log(a != 6); // false
console.log(a !== "6"); // true
console.log(0 == false);
console.log(1 == true);
console.log(undefined == null);
console.log(undefined === null);
console.log("##################################################");

// Valores Falsy
// false, 0, undefined, null, NaN
// Valores Truthy
// todo lo demas

// Operadores logicos
// And (y)
console.log(true && true);
// Or (o)
console.log(true || false);

// Operador ternario
const esta_Lloviendo = false;

esta_Lloviendo ? console.log("Está lloviendo") : console.log("No está lloviendo");
// Condición ? Lo que se hace si es verdadero : Lo que se hace si es falso