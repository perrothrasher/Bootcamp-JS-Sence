// Logica para repetir la palabra
document.getElementById('btn-repetir').addEventListener('click', () => {
    const palabra = document.getElementById('palabra-input').value;
    const cantidad = parseInt(document.getElementById('cantidad-input').value);
    const parrafoResultado = document.getElementById('resultado-repetir');

    // Verificación de que se ingresa un número
    if (isNaN(cantidad) || cantidad <= 0) {
        parrafoResultado.textContent = "Por favor, ingresa un número válido mayor a 0.";
        return;
    }

    parrafoResultado.textContent = (palabra + " ").repeat(cantidad);
});

// Logica para cambiar el fondo del texto
document.getElementById('btn-color').addEventListener('click', () => {
    const colorSeleccionado = document.getElementById('color-input').value;
    const textoLorem = document.getElementById('texto-lorem');
    
    textoLorem.style.backgroundColor = colorSeleccionado;
});

// Logica para realizar los calculos
document.getElementById('btn-calcular').addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('num1-input').value);
    const num2 = parseFloat(document.getElementById('num2-input').value);

    const resultadoSuma = document.getElementById('resultado-suma');
    const resultadoResta = document.getElementById('resultado-resta');
    const resultadoMultiplicacion = document.getElementById('resultado-multiplicacion');
    const resultadoDivision = document.getElementById('resultado-division');
    const resultadoTotal = document.getElementById('resultado-total');


    if (isNaN(num1) || isNaN(num2)) {
        resultadoSuma.textContent = "Por favor, ingresa ambos números.";
        return;
    }

    const total1 = num1 + num2;
    const total2 = num1 - num2;
    const total3 = num1 * num2;
    const total4 = num1 / num2;

    resultadoSuma.textContent = `${num1} + ${num2} = ${total1}`;
    resultadoResta.textContent = `${num1} - ${num2} = ${total2}`;
    resultadoMultiplicacion.textContent = `${num1} * ${num2} = ${total3}`;
    resultadoDivision.textContent = `${num1} / ${num2} = ${total4}`;

    const total = total1 + total2 + total3 + total4;
    resultadoTotal.textContent = `El total de los calculos es = ${total}`;
});

// Logica para invertir el texto
document.getElementById('btn-invertir').addEventListener('click', () => {
    const texto = document.getElementById('texto-invertir-input').value;
    const resultadoInvertir = document.getElementById('resultado-invertir');

    // 1. Separa el texto en letras
    // 2. Invierte el array
    // 3. Une las letras
    const textoInvertido = texto.split('').reverse().join('');
    
    resultadoInvertir.textContent = textoInvertido;
});