import fs from "fs/promises";
import path from "path";

// Ruta absoluta al archivo que hace de "base de datos"
const RUTA_CATALOGO = path.resolve("data/catalogo.json");

const calcularSiguienteId = (libros) =>
  libros.reduce((maxActual, libro) => Math.max(maxActual, libro.id), 0) + 1;

export const obtenerLibros = async () => {
  try {
    const contenido = await fs.readFile(RUTA_CATALOGO, "utf-8");
    return JSON.parse(contenido);
  } catch (error) {
    // Si el archivo aún no existe, lo creamos vacío en vez de fallar
    if (error.code === "ENOENT") {
      await fs.writeFile(RUTA_CATALOGO, "[]");
      return [];
    }

    throw error;
  }
};

export const guardarLibros = async (libros) => {
  await fs.writeFile(RUTA_CATALOGO, JSON.stringify(libros, null, 2));
};

export const crearLibro = async ({ titulo, autor, anio }) => {
  const libros = await obtenerLibros();

  const libroNuevo = {
    id: calcularSiguienteId(libros),
    titulo,
    autor,
    anio,
  };

  libros.push(libroNuevo);
  await guardarLibros(libros);

  return libroNuevo;
};

export const actualizarLibroPorId = async (id, cambios) => {
  const libros = await obtenerLibros();
  const posicion = libros.findIndex((libro) => libro.id === id);

  if (posicion === -1) {
    return null;
  }

  const libroActualizado = { id, ...cambios };
  libros[posicion] = libroActualizado;

  await guardarLibros(libros);

  return libroActualizado;
};

export const eliminarLibroPorId = async (id) => {
  const libros = await obtenerLibros();
  const posicion = libros.findIndex((libro) => libro.id === id);

  if (posicion === -1) {
    return null;
  }

  const [libroEliminado] = libros.splice(posicion, 1);
  await guardarLibros(libros);

  return libroEliminado;
};
