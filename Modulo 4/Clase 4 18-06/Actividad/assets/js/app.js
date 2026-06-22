// Validar el número
/*
1. Se debe mostrar un prompt donde se le solicita al usuario un número
2. Se verifica si es un número
3. Se llama al callback
    -> Correcto si es un dato valido
    -> Error si no se ingresa un número
*/

function validar_numero(callback){
    let dato = prompt("Ingrese un número");

    // Verificación de que es un número
    if (dato != null && dato.trim() !== "" && !isNaN(dato)){
        callback("Correcto");
        console.log("Correcto")
    }else{
        callback("No ingresó un número");
        console.log("No ingresó un número")
    }
};

document.getElementById("btn-validar_numero").addEventListener("click", ()=>{
    let respuesta = document.getElementById("respuesta-validar_numero");
    respuesta.innerHTML = `<span class= "text-warning small">Evaluando...</span>`;

    validar_numero((mensaje) =>{
        if(mensaje === "Correcto"){
            respuesta.innerHTML = `<span class= "text-success fw-bold">${mensaje}</span>`;
        }else{
            respuesta.innerHTML = `<span class= "text-danger fw-bold">${mensaje}</span>`;
        }
    });
});

// Sumatoria de impares
/*
1. Se calcula la sumatoria de numeros impares entre 1 y el numero
2. Se esperan 5 segundos
3. Se ejecuta el callback
*/

function sumatoria_impares(numero, callback){
    let sumatoria = 0;

    for(let i = 1; i <= numero; i++){
        if(i % 2 !== 0){
            sumatoria += i;
        }
    }

    // Temporizador
    setTimeout(()=>{
        callback(sumatoria);
    }, 5000);
};

document.getElementById("btn-sumatoria_impares").addEventListener("click", ()=>{
    let num = prompt("Ingresa un número para sumar sus impares");
    let respuesta = document.getElementById("respuesta-sumatoria_impares");

    if(num !== null && num.trim() !== "" && !isNaN(num)){
        respuesta.innerHTML = `<span class="spinner-border spinner-border-sm text-dark" role="status"></span> <span class="text-muted small">Esperando 5 segundos...</span>`;
        sumatoria_impares(Number(num), (resultado) =>{
            respuesta.innerHTML = `<span class="text-success fw-bold small">El valor de la sumatoria es ${resultado}. El resultado se obtuvo hace 5 segundos.</span>`;
            console.log(`El resultado de la sumatoria es: ${resultado}`);
        });
    }else{
        respuesta.innerHTML = `<span class="text-danger small">No ingresaste un número.</span>`;
        console.log("No ingresaste un número");
    }
})

// Sumatorias Sucesivas
/*
1. Se debe calcular sumatorias desde el 1 hasta el número ingresado (N!)
2. Si el resultado es menor a 1000 debe mostrar "Las sumatorias sucesivas del número es x"
3. Si el resultado es mayor a 1000, se debe llamar a un error pero debe mostrar el resultado*/

function sumatoria_sucesiva(numero, callback, callback_error){
    let suma = 0;
    let resultadoFinal = 0;
    for(let i = 0; i<= numero; i++){
        suma += i;
        resultadoFinal += suma;
    }

    if(resultadoFinal < 1000){
        callback(numero, resultadoFinal);
        console.log(`El resultado de la sumatoria de ${numero} es ${resultadoFinal}`);
    }else{
        callback_error(numero, resultadoFinal);
        console.log(`Resultado superior a 1000. El resultado es ${resultadoFinal}`);
    }
}

document.getElementById("btn-sumatorias_sucesivas").addEventListener("click", ()=>{
    let num = prompt("Ingresa un número");
    let respuesta = document.getElementById("respuesta-sumatorias_sucesivas");

    if(num !== null && num.trim() !== "" && !isNaN(num)){
        sumatoria_sucesiva(Number(num),
            (n, total) =>{
                respuesta.innerHTML = `<span class="text-success fw-bold">Las sumatorias sucesivas de ${n} es ${total}</span>`;
            },
            (n, total)=>{
                respuesta.innerHTML = `<span class="text-danger small fw-bold">El número ${n} sobrepasa el objetivo de la función<br>Resultado obtenido de todas formas: ${total}</span>`;
            }
        );
    }else{
        respuesta.innerHTML = `<span class="text-muted small">Entrada inválida.</span>`;
    }
});