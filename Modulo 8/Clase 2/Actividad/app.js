import express from "express";

// importar middlewares
import logger from "./middlewares/logger.js";
import timer from "./middlewares/timer.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";

// rutas
import librosRoutes from "./routes/libros.routes.js";

// Creamos la aplicación Express
const app = express();

// ==========================================
// MIDDLEWARES
// ==========================================

// Middleware nativo para parsear JSON
app.use(express.json());

// Servir frontend desde carpeta public
app.use(express.static("public"));

// ==========================================
// MIDDLEWARE 1: Logging básico
// ==========================================
app.use(logger);

// ==========================================
// MIDDLEWARE 2: Medición de tiempo
// ==========================================
app.use(timer);

// ==========================================
// RUTAS
// ==========================================

// Endpoint inicial de prueba API
app.get("/api", (req, res) => {
  res.send("API Biblioteca El Saber funcionando correctamente");
});

// CRUD libros
app.use("/libros", librosRoutes);

// ==========================================
// MIDDLEWARE 404
// ==========================================
app.use(unknownEndpoint);

export default app;