// try catch
// Manejo de errore
// Bloque Try - Catch
// try: "intenta ejecuitar este codigo"
// catch significa: "Si ocurre un error, capturalo"
// console.log(persona.nombre);

try {
  console.log(persona.nombre);
} catch (error) {
  console.log("Ocurrio un error, pero controlado");
  console.log(error);
}
console.log("codigo despues de intentar consologear: persona.nombre");

// capturar informacion del error

try {
  let resultado = 10 / 2;
  console.log(resultado);
  // forzamos un error
  console.log(datoInexistente);
} catch (error) {
  console.log("Nombre del error");
  console.log(error.name);
  console.log("Mensaje del error");
  console.log(error.message);
}

// El objeto error trae informacion util para poder depurar