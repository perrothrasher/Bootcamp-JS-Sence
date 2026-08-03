# Biblioteca Comunitaria "El Saber" — API REST

API REST construida con Express para administrar el inventario de libros de la
Biblioteca Comunitaria "El Saber", persistiendo los datos en un archivo
`data/catalogo.json` mediante lectura/escritura asíncrona (`fs/promises`).

## Estructura del proyecto

```
├─ index.js                     # Punto de entrada, arranca el servidor
├─ app.js                       # Configuración de Express y middlewares
├─ routes/libros.routes.js      # Definición de endpoints /libros
├─ controllers/libros.controller.js  # Validación y manejo de req/res
├─ services/libros.service.js   # Acceso al archivo catalogo.json
├─ middlewares/                 # logger, timer y manejo de rutas 404
├─ public/                      # Frontend simple (HTML + JS) para probar la API
└─ data/catalogo.json           # "Base de datos" en formato JSON
```

## Instalación

```bash
npm install
pnpm install
```

## Ejecución

```bash
npm run dev
pnpm run dev

# Modo producción
npm start
pnpm start
```

Por defecto el servidor corre en `http://localhost:3001`.

```bash
node index.js --port 3000
```

El frontend queda disponible en `http://localhost:3001` y la API 
en `http://localhost:3001/libros`.

## Endpoints

Todas las respuestas exitosas tienen la forma `{ "ok": true, "data": ... }`
y los errores `{ "ok": false, "mensaje": "..." }`.

### GET /libros
Devuelve todos los libros del catálogo.

```bash
curl http://localhost:3001/libros
```

### POST /libros
Crea un libro nuevo. Requiere `titulo`, `autor` y `anio` (entero entre 1450
y el año actual). El `id` se asigna automáticamente.

```bash
curl -X POST http://localhost:3001/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Rayuela","autor":"Julio Cortázar","anio":1963}'
```

- `201 Created` si se creó correctamente.
- `400 Bad Request` si faltan campos o los datos no son válidos.

### PUT /libros/:id
Actualiza el libro con el `id` indicado.

```bash
curl -X PUT http://localhost:3001/libros/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Cien años de soledad","autor":"G. García Márquez","anio":1967}'
```

- `200 OK` si se actualizó.
- `404 Not Found` si el `id` no existe.
- `400 Bad Request` si los datos no son válidos.

### DELETE /libros/:id
Elimina el libro con el `id` indicado.

```bash
curl -X DELETE http://localhost:3001/libros/2
```

- `200 OK` si se eliminó.
- `404 Not Found` si el `id` no existe.

## Notas técnicas

- Toda la lectura/escritura del archivo `catalogo.json` es asíncrona
  (`fs/promises`), evitando bloquear el Event Loop.
- Se valida que `titulo` y `autor` no estén vacíos (ni compuestos solo por
  espacios en blanco) y que `anio` sea un entero dentro de un rango razonable.
- Incluye middlewares propios de logging (`logger.js`) y medición de tiempo
  de respuesta (`timer.js`), además de un manejador de rutas no encontradas.