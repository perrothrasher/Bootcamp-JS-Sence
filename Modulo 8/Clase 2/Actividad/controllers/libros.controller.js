import {
  obtenerLibros,
  crearLibro,
  actualizarLibroPorId,
  eliminarLibroPorId,
} from "../services/libros.service.js";

const ANIO_MINIMO = 1450;
const ANIO_MAXIMO = new Date().getFullYear();

const datosDelLibroSonValidos = ({ titulo, autor, anio }) => {
  const tituloOk = typeof titulo === "string" && titulo.trim().length > 0;
  const autorOk = typeof autor === "string" && autor.trim().length > 0;
  const anioOk =
    Number.isInteger(anio) && anio >= ANIO_MINIMO && anio <= ANIO_MAXIMO;

  return tituloOk && autorOk && anioOk;
};

export const listarLibros = async (req, res) => {
  try {
    const libros = await obtenerLibros();

    res.status(200).json({
      ok: true,
      data: libros,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "No se pudo leer el catálogo de libros",
    });
  }
};

export const registrarLibro = async (req, res) => {
  try {
    const { titulo, autor, anio } = req.body || {};

    if (!datosDelLibroSonValidos({ titulo, autor, anio })) {
      return res.status(400).json({
        ok: false,
        mensaje: `Debes enviar titulo, autor y un anio entre ${ANIO_MINIMO} y ${ANIO_MAXIMO}`,
      });
    }

    const libroCreado = await crearLibro({
      titulo: titulo.trim(),
      autor: autor.trim(),
      anio,
    });

    res.status(201).json({
      ok: true,
      data: libroCreado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "No se pudo registrar el libro",
    });
  }
};

export const actualizarLibro = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, autor, anio } = req.body || {};

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        ok: false,
        mensaje: "El id debe ser un número entero",
      });
    }

    if (!datosDelLibroSonValidos({ titulo, autor, anio })) {
      return res.status(400).json({
        ok: false,
        mensaje: `Debes enviar titulo, autor y un anio entre ${ANIO_MINIMO} y ${ANIO_MAXIMO}`,
      });
    }

    const libroActualizado = await actualizarLibroPorId(id, {
      titulo: titulo.trim(),
      autor: autor.trim(),
      anio,
    });

    if (!libroActualizado) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un libro con id ${id}`,
      });
    }

    res.status(200).json({
      ok: true,
      data: libroActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "No se pudo actualizar el libro",
    });
  }
};

export const borrarLibro = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        ok: false,
        mensaje: "El id debe ser un número entero",
      });
    }

    const libroEliminado = await eliminarLibroPorId(id);

    if (!libroEliminado) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un libro con id ${id}`,
      });
    }

    res.status(200).json({
      ok: true,
      data: libroEliminado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "No se pudo eliminar el libro",
    });
  }
};
