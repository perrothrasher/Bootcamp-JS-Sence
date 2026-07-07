import express from "express";

const PORT = 3000;

// Crear aplicacion
const app = express();


// Simular BD
let notas = [
    {
        id: 1,
        content: "Node.js permite ejecutar JavaScript en el backend",
        important: true
    }, 
    {
        id: 2,
        content: "El backend maneja request y response"
    },
];

// Rutas
// Ruta 1: se define una ruta GET en "/"
app.get("/", (request, response) =>{
    // Enviamos una respuesta HTML simple
    response.send("<h1>Hola mundo 2</h1>");
});

// Ruta 2: simular una API (datos)
// Definimos una ruta GET en "/api/notes"
// Esta ruta devuelve datos en formato JSON
app.get("/api/notes", (request, response) => {
    // Calculando el nuevo ID.
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    console.log(maxId);
    console.log("Contenido de Request Body", request.body);

    const note = request.body;
    note.id = maxId + 1;
    console.log("Notes antes de concat note", notes);

    notes = notes.concat(note);
    console.log("Notes despues de concat note", notes);

    response.json(notas);
});

app.get("/api/notes/:id", (request, response) => {
    // request.params.id = 2
    const id = Number(request.params.id)
    const note = notes.find((note) => note.id === id )

    if (note) {
        response.json(note)
    } else {
        response.status(404).json({error: `No se a encontrado la nota con el Id: ${id}`})
    }
})

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  
  notes = notes.filter((note) => note.id !== id);
  response.status(200).send(`<h1>se eliminó ID ${id}</h1>`);
});


// Levantar el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});