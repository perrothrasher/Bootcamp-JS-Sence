import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// MIME permitidos
const TIPOS_PERMITIDOS = /jpeg|jpg|png|gif/;

// asegurar carpeta uploads
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// almacenamiento con nombre único
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}${ext}`);
  }
});

// filtros: valida extensión Y mimetype
const fileFilter = (_req, file, cb) => {
  const extOk = TIPOS_PERMITIDOS.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = /image\/(jpeg|png|gif)/.test(file.mimetype);

  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    const error = new Error('Tipo de archivo no permitido. Solo jpg, jpeg, png o gif.');
    error.codigoHttp = 415;
    cb(error);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// estáticos: la página (public) y las imágenes ya subidas (uploads)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(UPLOAD_DIR));

app.use(express.json());

// endpoint de subida
app.post('/upload', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, mensaje: 'No se recibió una imagen válida' });
  }
  res.status(201).json({
    ok: true,
    mensaje: 'Imagen subida correctamente',
    archivo: req.file.filename,
    ruta: `/uploads/${req.file.filename}`
  });
});

// endpoint para listar imágenes subidas
app.get('/api/imagenes', (_req, res) => {
  fs.readdir(UPLOAD_DIR, (err, archivos) => {
    if (err) {
      return res.status(500).json({ ok: false, mensaje: 'No se pudo leer la carpeta de imágenes' });
    }

    const imagenes = archivos
      .filter((nombre) => TIPOS_PERMITIDOS.test(path.extname(nombre).toLowerCase()))
      .map((nombre) => ({
        nombre,
        ruta: `/uploads/${nombre}`
      }))
      // más recientes primero
      .sort((a, b) => b.nombre.localeCompare(a.nombre));

    res.status(200).json({ ok: true, total: imagenes.length, imagenes });
  });
});

// manejo básico de errores de Multer y de fileFilter
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ ok: false, mensaje: 'Archivo demasiado grande. Máximo 5MB.' });
  }
  if (err) {
    const codigo = err.codigoHttp || 415;
    return res.status(codigo).json({ ok: false, mensaje: err.message });
  }
  res.status(500).json({ ok: false, mensaje: 'Error interno' });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));