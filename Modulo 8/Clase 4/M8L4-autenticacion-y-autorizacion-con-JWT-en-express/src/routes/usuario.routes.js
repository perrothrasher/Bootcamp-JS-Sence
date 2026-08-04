import { Router } from "express";
import { listarUsuarios, obtenerMiPerfil } from "../controllers/usuario.controller.js";
import autenticarToken from "../middlewares/auth.middleware.js";
import autorizarRoles from "../middlewares/role.middleware.js";
const router=Router();
router.get("/perfil",autenticarToken,obtenerMiPerfil);
router.get("/",autenticarToken,autorizarRoles("admin"),listarUsuarios);
export default router;
