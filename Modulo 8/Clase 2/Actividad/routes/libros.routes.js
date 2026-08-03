import { Router } from "express";

import {
  listarLibros,
  registrarLibro,
  actualizarLibro,
  borrarLibro,
} from "../controllers/libros.controller.js";

const router = Router();

router.get("/", listarLibros);

router.post("/", registrarLibro);

router.put("/:id", actualizarLibro);

router.delete("/:id", borrarLibro);

export default router;