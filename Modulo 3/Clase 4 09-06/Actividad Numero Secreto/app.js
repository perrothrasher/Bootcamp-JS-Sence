// Generar número secreto
const secreto = Math.floor(Math.random() * 10) + 1;
// console.log(secreto)

// Reglas
// El usuario tiene 3 intentos para adivinar el número secreto
// Se debe restringir la entrada a valores entre 1 y 10 (en caso de que el usuario ingrese un número fuera de ese rango, se le debe pedir que ingrese un número válido sin consumir un intento)
// No se deben permitir números repetidos (en caso de que el usuario ingrese un número que ya ha intentado, se le debe informar y no se debe consumir un intento)

let intentos = 3;
const numerosUsados = [];

// Función para detectar números repetidos
function esRepetido(numero, lista){
    return lista.includes(numero);
};

// Si quedan intentos
while(intentos > 0){
    // Se pide un número al usuario
    let numeroUsuario = prompt("Ingresa un número entre 1 y 10. Intentos restantes: " + intentos);
    
    // Primera validación: Rango entre 1 y 10 y NaN
    /*Si el número no se encuentra entre 1 y 10 muestra mensaje de número no válido y
    vuelve a pedir el número */
    if(isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10){
        alert("Número no válido. Intenta nuevamente con un número entre 1 y 10.");
        continue;
    }

    // Segunda validación: Si el número se repite
    /*Si el número ingresado por el usuario se repite, muestra el mensaje de número repetido
    y vuelve a pedir el número */
    if(esRepetido(numeroUsuario, numerosUsados)){
        alert("Número repetido. Intenta nuevamente con un número que no hayas ingresado antes.");
        continue;
    }

    // En caso de que los números sean válidos, se agregan a la lista
    numerosUsados.push(numeroUsuario);

    // Comparación con el número secreto
    if(numeroUsuario == secreto){
        alert("Adivinaste el número secreto. ¡Felicidades!");
        break;
    }else{
        // En caso de no acertar, se restan los intentos
        intentos--;
        if(intentos > 0){
            alert("Número incorrecto, intenta nuevamente. Te quedan " + intentos + " intentos.");
        }
    }
}

// Finalización del juego
if(intentos === 0){
    alert("Juego terminado. El número secreto era: " + secreto);
}

// Se muestra el historial de números ingresados por el usuario
document.getElementById("historial").innerHTML = `Números ingresados: ${numerosUsados.join(", ")}`;

// Se muestra el número secreto al finalizar el juego
document.getElementById("resultado").innerHTML = `El número secreto era: ${secreto}`;