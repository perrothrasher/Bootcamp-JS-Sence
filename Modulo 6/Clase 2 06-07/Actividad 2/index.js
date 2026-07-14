import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const ARCHIVO_PRODUCTOS = path.join(__dirname, 'productos.txt');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

function parsearProductos(contenido) {
  return contenido
    .split('\n')
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 0)
    .map((linea) => {
      const [nombre, precio] = linea.split(',').map((parte) => parte.trim());
      return {
        nombre,
        precio: Number(precio),
      };
    });
}

// GET /api/productos
app.get('/api/productos', async (req, res) => {
  try {
    const contenido = await fs.readFile(ARCHIVO_PRODUCTOS, 'utf-8');
    const productos = parsearProductos(contenido);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo leer el archivo de productos' });
  }
});

// POST /api/productos
app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body || {};

  if (
    typeof nombre !== 'string' ||
    nombre.trim() === '' ||
    (typeof precio !== 'number' && isNaN(Number(precio)))
  ) {
    res.status(400).json({
      error: 'El body debe incluir "nombre" (string) y "precio" (número)',
    });
    return;
  }

  const precioNumerico = Number(precio);

  try {
    // se verifica si el ultimo producto termina en un salto de linea
    let contenidoActual = '';
    try {
      contenidoActual = await fs.readFile(ARCHIVO_PRODUCTOS, 'utf-8');
    } catch (error) {
    }

    const necesitaSaltoDeLinea = contenidoActual.length > 0 && !contenidoActual.endsWith('\n');
    const linea = `${necesitaSaltoDeLinea ? '\n' : ''}${nombre.trim()}, ${precioNumerico}\n`;

    await fs.appendFile(ARCHIVO_PRODUCTOS, linea, 'utf-8');
    res.status(201).json({ nombre: nombre.trim(), precio: precioNumerico });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar el producto' });
  }
});


app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    res.status(400).json({ error: 'JSON inválido en el body de la petición' });
    return;
  }
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Conexión con el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});