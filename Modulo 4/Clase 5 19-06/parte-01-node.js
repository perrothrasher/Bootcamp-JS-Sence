// Consumo de API desde node
// node puede ejecutar js pero no tiene document, ya que pertenece al navegador

// 1. URL de la API
const url = "https://randomuser.me/api/?results=5";

// 2. Consumir API con Fetch
// Realiza una solicitud HTTP (Pide datos a una URL)
fetch(url).then((respuesta) => {
    // Esta respuesta todavia no es el Json final
    console.log("Respuesta recibida desde el servidor")
    return respuesta.json()
})
    .then((data) => {
        // Aquí ya tenemos los datos convertidos a JS
        console.log("Datos convertidos a JSON:");
        console.log(data);

        // La API entrega los resultados dentro de la propiedad results
        const usuarios = data.results;
        console.log("Listado simple de usuarios");
        console.log(usuarios);

        usuarios.forEach((usuarios) => {
            console.log(`${usuarios.name.first} ${usuarios.name.last}`);
        })
    })
    .catch((error) => {
        // Catch captura errores de la petición
        console.log("Ocurrio un mensaje");
        console.log(error);
    });