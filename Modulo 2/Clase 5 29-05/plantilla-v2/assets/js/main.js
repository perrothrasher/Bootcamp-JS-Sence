// Ayuda al programador
function mensajeExterno() {
    alert('Hola mundo desde el script externo');
    console.log('Hola mundo desde la consola');
}

// Codigo fuera de la función mensaje externo

// Ejemplos de let y const
// Ejemplo de let
console.log("---let---") 

let nombreAlumno = "Ana";
console.log("Valor inicial de nombre: ",nombreAlumno);

nombreAlumno = "Carlos";
console.log("Valor reasignado: ", nombreAlumno);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ejemplo de const
console.log("---const---");

const PI = 3.1416;
console.log("El valor de pi es: ", PI);

// PI = 1111;
// console.log("Valor de pi reasignado: ", PI);
// No es posible reasignar los valores de const, provocará un error dentro del codigo
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ejemplo de var
console.log("---var---");

var fruta= "manzana";
console.log("Nombre de fruta: ", fruta);



function cambiarTexto(){
    let titulo = document.getElementById("titulo");

    titulo.textContent = "Titulo cambiado con JS";
}