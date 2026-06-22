window.alert("Ingrese 3 números.");

// array donde se almacenarán los números ingresados
let lista = [];

// Captura de datos con un for
for (let i = 0; i < 3; i++) {
    // Contador para minimizar los strings escritos
    let contador = i + 1;
    // convierte los numeros a flotantes a la vez que se ingresan
    let num = parseFloat(prompt("Ingrese número " + contador + ":"));
    // Se verifica que sea un número real
    if (isNaN(num)) {
        alert("Entrada no válida. Por favor, ingresa un número real.");
        i--; 
    } else {
        lista.push(num);
    }
}

// Copia de la lista ingresada anteriormente
// Se debe realizar para almacenar el arreglo original y no alterarlo al momento de ordenar
let arregloIngresado = [...lista];

// bubble sort
let n;
do {
    n = 0;
    for (let i = 1; i < lista.length; i++) {
        // Comparación
        /*Compara los números en parejas
        EJ: 5, 4, 1 -> [0, 1, 2]
        i = 1, entonces:
        5 > 4? -> no, entonces procede a ordenar*/
        if (lista[i - 1] > lista[i]) {
            // Se almacena el número a ordenar de forma temporal
            // En este ejemplo se almacena el 5
            let temp = lista[i - 1];
            // Se reemplaza el valor de lista [i - 1] y es reemplazado con el valor de la derecha
            // En este ejemplo se almacena con 4, quedando en este punto una lista de [4, 4, 1]
            lista[i - 1] = lista[i];
            // Se reemplaza el valor de lista[i] con el número temporal
            // En este ejemplo se almacena con 5, quedando en este punto una lista de [4, 5, 1]
            lista[i] = temp;
            n = i;
        }
    }
} while (n != 0);

// Resultados
document.write("Arreglo ingresado: [" + arregloIngresado.join(", ") + "]<br/>");
document.write("Arreglo ordenado (burbuja): [" + lista.join(", ") + "]<br/>");

if (lista[0] == lista[lista.length - 1]) {
    document.write("Los tres números ingresados son iguales.");
} else {
    document.write("Menor: " + lista[0] + " | Mayor: " + lista[lista.length - 1]);
}