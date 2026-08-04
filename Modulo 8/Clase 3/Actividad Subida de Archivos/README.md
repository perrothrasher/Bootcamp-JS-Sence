# Subida de imágenes con Express + Multer

## Estructura

```
mi-app-subida/
├─ uploads/            # imágenes subidas (se crea sola si no existe)
├─ public/
│  ├─ index.html        # portada con descripción y botón "Ir a subir"
│  ├─ upload.html        # formulario de subida + vista previa
│  └─ gallery.html       # galería con todas las imágenes subidas
├─ server.js
├─ package.json
└─ README.md
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev     # con nodemon, recarga automática
# o
npm start        # sin recarga automática
```

Luego abrir `http://localhost:3000` en el navegador.

## Flujo de la app

1. **index.html** — portada con la descripción de la actividad y un botón
   "Ir a subir".
2. **upload.html** — formulario para seleccionar una imagen. Al elegir el
   archivo se muestra una vista previa local (antes de subirla) usando
   `URL.createObjectURL`. Al enviar, se hace un `fetch` a `POST /upload` y
   se muestra un mensaje de éxito o error.
3. **gallery.html** — al cargar, consulta `GET /api/imagenes` y renderiza
   todas las imágenes guardadas en `uploads/` como tarjetas de Bootstrap.

## Endpoints

- `POST /upload` — recibe el campo `foto` (multipart/form-data).
  - `201` si la imagen se guardó correctamente.
  - `400` si no se envió imagen o si excede 5MB.
  - `415` si el tipo de archivo no está permitido.
- `GET /api/imagenes` — devuelve la lista de imágenes en `uploads/` en
  formato JSON, usada por `gallery.html`.

## Validaciones

- Extensiones y MIME permitidos: `jpg`, `jpeg`, `png`, `gif`.
- Tamaño máximo: 5MB por archivo.
- La validación real ocurre en el backend (Multer `fileFilter` + `limits`),
  no se confía únicamente en el atributo `accept="image/*"` del input.
- Cada imagen se guarda con nombre único (`Date.now() + extensión`) para
  evitar sobreescrituras.

## Pruebas rápidas con curl

```bash
curl -F "foto=@./imagen.jpg" http://localhost:3000/upload
curl http://localhost:3000/api/imagenes
```