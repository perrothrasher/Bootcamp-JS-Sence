// Se le solicita al usuario cuántas palabras desea ingresar (debe ser un número)
let cantidadPalabras = parseInt(prompt("¿Cuántas palabras deseas ingresar?"));
while(isNaN(cantidadPalabras) || cantidadPalabras <= 0){
    alert("Por favor, ingresa un número válido mayor a 0.");
    cantidadPalabras = parseInt(prompt("¿Cuántas palabras deseas ingresar?"));
}

// Array donde se almacenarán las palabras
let palabras = [];
// console.log(palabras);

// Se le solicita al usuario que ingrese las palabras
for(let i = 0; i < cantidadPalabras; i++){
    let palabra = prompt(`Ingresa la palabra #${i + 1}:`);
    // Validación para asegurarse de que el usuario ingrese una palabra (no un número)
    if(isNaN(palabra)){
        palabras.push(palabra);
    }
}

// Combina todas las palabras en un solo array
const unir = palabras.join("");

// Lista de vocales para contar
const vocales = ["a", "e", "i", "o", "u"];

const contarVocales = (palabra) =>{
    let contador = 0;
    // Se recorre cada letra de la palabra y se vuelve minuscula
    for(const ch of palabra.toLowerCase()){
        // Si la letra es una vocal, se incrementa el contador
        if(vocales.includes(ch)){
            contador++;
        }
    }
    return contador;
};

// Se aplica sobre el array
const contador = contarVocales(unir);

// Resultados
// Se muestra el resultado en la consola
console.log(`Total de vocales: ${contador}`);

// Se muestra el resultado en un window alert
window.alert(`Total de vocales: ${contador}`);

// Se muestran las palabras ingresadas en el HTML
document.getElementById('palabras').innerHTML = `Palabras ingresadas: ${palabras.join(", ")}`;

// Se muestra el resultado en el HTML
document.getElementById('resultado').innerHTML = `Vocales totales: ${contador}`;