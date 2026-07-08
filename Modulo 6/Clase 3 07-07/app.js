import express from "express";
import moment from "moment";

// Se crea la app express
const app = express();

// Configurar entorno
const PORT = 3000;

// Middlewares
// Middleware nativo para parsear json
app.use(express.json());

// Middleware personalizado (loggin basico)
app.use((req, res, next) => {
    const fecha = moment().format("DD-MM-YYYY HH:mm:ss");

    console.log(`[${fecha}] ${req.method} ${req.url}`);
    next();
});

// Middleware 2: medicion de tiempo de respuesta
app.use((req, res, next)=>{
    const inicio = Date.now();
    
    res.on("finish", ()=>{
        const duracion = Date.now() - inicio;
        console.log(`Tiempo de respuesta: ${duracion}ms`);
    });
    next();
});

// BDD en memoria
let tareas = [
  { 
    id: 1, 
    titulo: "Aprender Node", 
    estado: "pendiente"
  },
  { 
    id: 2, 
    titulo: "Instalar Express", 
    estado: "completada"
  },
  { 
    id: 3, 
    titulo: "Crear servidor", 
    estado: "completada"
  },
  { 
    id: 4, 
    titulo: "Entender middleware", 
    estado: "pendiente"
  },
  { 
    id: 5, 
    titulo: "Probar con Postman", 
    estado: "pendiente"
  },
  { 
    id: 6, 
    titulo: "Leer sobre asincronía", 
    estado: "pendiente"
  },
];

// Rutas
// Endpoint de prueba
app.get("/", (req, res) =>{
    res.send("API de tareas funcionando correctamente");
});

// CRUD de tareas
// GET obtener todas las tareas
app.get("/tareas", (req, res)=>{
    res.json(tareas);
});

// POST crear nueva tarea
app.post("/tareas", (req, res) =>{
    const { titulo } = req.body;

    // Validación basica
    if(!titulo){
        return res.status(400).json({error: "El titulo es obligatorio"});
    }

    // Generar ID autoincremental
    // Tomar el ultimo ID y sumarle 1
    const nuevoId = tareas.length > 0 
    ? tareas[tareas.length - 1].id + 1
    : 1;

    const nuevaTarea ={
        id: nuevoId,
        titulo: titulo,
        estado: "pendiente" // estado inicial
    };

    tareas.push(nuevaTarea);
    console.log("Tarea creada: ", nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// PUT
app.put("/tareas/:id", (req, res)=>{
    const id = parseInt(req.params.id);

    // buscar tarea por ID
    const tarea = tareas.find(t => t.id === id);

    // Validar si existe
    if(!tarea){
       return res.status(404).json({error: "Tarea no encontrada"});
    };

    // Actualizamos el estado
    tarea.estado = "completada";

    console.log("Tarea completada", tarea);
    res.json(tarea);
});

// DELETE
app.get("/eliminar-tarea/:id", (req, res) => {
  // req.params viene desde la URL
  const id = parseInt(req.params.id);
  const index = tareas.findIndex((t) => t.id === id); // si existe retorna -1

  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  //   eliminamos del array
  const tareaEliminada = tareas.splice(index, 1);
  console.log("Tarea eliminada", tareaEliminada[0]);
  res.json({
    mensaje: "Tarea eliminada correctamente",
    tarea: tareaEliminada[0],
  });
});

// Levantar el servidor
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});