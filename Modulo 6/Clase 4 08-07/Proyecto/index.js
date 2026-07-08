import express from "express";
import {engine} from "express-handlebars";
import webRoutes from "./routes/web.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Servir contenido estatico
// Todo lo que este dentro de la carpeta public podrá ser usado por el navegador
app.use(express.static("public"));

// Configuración de Handlebars
// Aqui le decimos a express que motor de plantillas usaremos
app.engine(
  "handlebars", // Registramos a handlebars dentro de express
  engine({
    defaultLayout: "main", 
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    helpers: {
      mayuscula: (texto) => texto.toUpperCase(),
      esImportante: (valor) => {
        return valor ? "Sí" : "No";
      },
    },
  })
);

// Definimos la carpetas donde estan las views
app.set("views", "views");

// Definimos handlebas como motor de plantillas
app.set("view engine", "handlebars");

app.use("/", webRoutes);

// Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).send("<h1>404 - Página no encontrada</h1>");
});






// Levantar el servidor
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})