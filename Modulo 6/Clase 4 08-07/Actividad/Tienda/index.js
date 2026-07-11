import express from "express";
import { engine } from "express-handlebars";
import webRoutes from "./routes/web.routes.js";

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: "views/layouts",
        partialsDir: "views/partials",
        helpers: {
            mayusculas: function (texto) {
                return texto.toUpperCase();
            }
        }
    })
);

app.set("view engine", "handlebars");
app.set("views", "./views");

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Middleware para procesar datos enviados
app.use(express.urlencoded({ extended: true }));

// Uso de las rutas web
app.use("/", webRoutes);

app.use((req, res) => {
    res.status(404).send("Página no encontrada");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Tienda corriendo en http://localhost:${PORT}`);
});
