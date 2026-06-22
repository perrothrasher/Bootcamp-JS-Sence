// modulo 4 - Programacion avanzada JS
// async / await
// Usamos programacion asincrona
// Ejemplo base promesa
// Simularemos una tarea que demora 2 seg
function obtenerMensaje() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Datos recibidos correctamente");
    }, 2000);
  });
}

// Esta funcion NO entrega el resultado inmediatamente
// entrega una promesa
console.log("Antes de llamar a la promesa");
obtenerMensaje().then((respuesta) => {
  console.log(respuesta);
});

console.log("Despues de llamar a la promesa");

// ASYNC
// Una funcion async siempre devuelve una promesa
async function saludarAsync() {
  return "Hola desde una funcion async";
}
saludarAsync().then((mensaje) => {
  console.log(mensaje);
});

// Async prermite preparar una funcion para usar await
//  AWAIT
// await signinica: "Espera el resultado de esta promesa"
async function mostrarMensaje() {
  console.log("Buscando mensaje...");
  // await espera a que obtenerMensaje() se resuelva
  const respuesta = await obtenerMensaje();
  // Esta linea se ejecutar despues de recibir la respuesa
  console.log(respuesta);
}

mostrarMensaje();

// Comparacion then vs async/await
function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = {
        nombre: "Ana",
        curso: "JS Avanzado",
        activo: true,
      };
      resolve(usuario);
    }, 2000);
  });
}

// Forma 1 then()
obtenerUsuario().then((usuario) => {
  console.log("Usuario usando then:");
  console.log(usuario);
});

// forma 2: usando async / await
async function mostrarUsuario() {
  const usuario = await obtenerUsuario();
  console.log("Usuario usando async/await");
  console.log(usuario);
}

mostrarUsuario();

//  ASYNC / AWAIT con TRY CATCH
function obtenerProducto(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        const producto = {
          id: id,
          nombre: "Cafe",
          precio: 4500,
        };
        resolve(producto);
      } else {
        reject("El id del producto no es valido");
      }
    }, 2000);
  });
}

async function mostrarProducto() {
  try {
    console.log("Buscando producto...");
    // const producto = await obtenerProducto(1);
    const producto = await obtenerProducto(0);
    console.log("Producto encontrado");
    console.log(producto);
  } catch (error) {
    // Si ocurre un error, se captura aca:
    console.log("Ocurrio un error:");
    console.log(error);
  }
}

mostrarProducto()