// Js Asincrono
// JS Codigo sincrono
// codigo que se ejecuta liena por linea
// cada intruccion va a esperar a que termine la anterior
console.log("1. inicio del programa");
console.log("2. Ejecuntando una tarea simple");
console.log("3. Fin de el programa");

// Primer contacto con la asincronia
console.log("A. Antes del setTimeout");

setTimeout(() => {
  console.log("B. Esto aparece despues de 2 segundos");
}, 2000);

console.log("C. Despues del setTimeout");
console.log("D. Sigue ejecutandose codigo");

//  que son los callbacks ?
// 1 creamos una funcion normal
// function mostrarMensajeDespues() {
//   console.log("Mensaje ejecutado desde un callaback");
// }
// 2 Pasamos la funcion como parametro a setTimeOut
// setTimeout(mostrarMensajeDespues, 5000);
// No escribimos mostrarMensajeDespues()
// CallBacks con parametros

function buscarUsuario(nombre, callback) {
  console.log(`Buscando usuario ${nombre}`);
  setTimeout(() => {
    // Despues de 2 segundos simulamos si encontramos al usuario
    const usuario = {
      nombre: nombre,
      rol: "Estudiante",
      activo: true,
    };
    callback(usuario);
  }, 2000);

}
let nombreUsuario = "Ana";

// Esta funcion sera usada como callback

function mostrarUsuario(usuario) {
  console.log("Usuario encontrado:");
  console.log(`Nombre: ${usuario.nombre}`);
  console.log(`Rol: ${usuario.rol}`);
  console.log(`Activo: ${usuario.activo}`);
}

buscarUsuario(nombreUsuario, mostrarUsuario);

// Problemas con los callbacks
// Los callbacks son útiles,
// pero cuando tenemos muchas tareas encadenadas,
// el código puede volverse difícil de leer.
// Ejemplo conceptual:
//

// buscarUsuario(function () {
//     buscarCursos(function () {
//         buscarNotas(function () {
//             mostrarResultado();
//         });
//     });
// });


// Esto se conoce como "callback hell"
// o pirámide de callbacks.
// Para mejorar esto aparecen las Promesas.
// Que es una promesa?
// Representa una oprecaion que todavioa no termina
// pero que en el futuro puede tener 2 resultados
// Se resuelve
// falla y se rechaza
// Estados de una promesa
// -pending
// -fullfilled
// -rejected

const promesaSimple = new Promise((resolve, reject) => {
  const tareaExitosa = true;
  setTimeout(() => {
    if (tareaExitosa) {
      resolve("La tarea termino correctamente");
    } else {
      reject("La tarea fallo");
    }
  }, 2000);

});

promesaSimple.then((respuesta) => {
  console.log(respuesta);
});

promesaSimple.catch((error) => {
  console.log(error);
});

// Idea clave
// resolve representa exito
// reject representa error
// Then y catch encadenados

const consultarServidor = new Promise(() => {
  const servidorDisponible = true;
  setTimeout(() => {
    if (servidorDisponible) {
      resolve("Datos recibidos desde el servidor");
    } else {
      reject("No se pudo conectar con el servidor");
    }
  }, 2000);
});

consultarServidor
    .then((res) => {
        console.log('Exito: ');
        console.log(res);
    })

    .catch((error) => {
        console.log('Error: ');
        console.log(error);
    })

    // Las promesa ordenan mejor el flujo
    // primero intento obtener datos
    // luego proceso la respuesta
    // y sio la estapuest falla ...capturo el error