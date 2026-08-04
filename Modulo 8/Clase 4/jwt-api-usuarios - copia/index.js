import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./src/models/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import testRoutes from "./src/routes/test.routes.js";
import healthRoutes from "./src/routes/health.routes.js";
import logger from "./src/middlewares/logger.js";
import timer from "./src/middlewares/timer.js";
import unknownEndpoint from "./src/middlewares/unknownEndpoint.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(logger);
app.use(timer);
app.use(express.json());
app.get("/", (req, res) =>
  res
    .status(200)
    .json({
      ok: true,
      message: "API pedagógica de autenticación JWT",
      endpoints: {
        health: "/health",
        test: "/test",
        login: "/api/v1/auth/login",
        perfil: "/api/v1/usuarios/perfil",
        usuariosAdmin: "/api/v1/usuarios",
      },
    }),
);
app.use("/test", testRoutes);
app.use("/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/usuarios", usuarioRoutes);
app.use(unknownEndpoint);
app.use(errorHandler);
const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET no está definido en .env");
    console.log("Conexión con PostgreSQL establecida correctamente");
    app.listen(PORT, () =>
      console.log(`Servidor disponible en http://localhost:${PORT}`),
    );
  } catch (e) {
    console.error("No fue posible iniciar la aplicación:");
    console.error(e.message);
    process.exit(1);
  }
};
iniciarServidor();
