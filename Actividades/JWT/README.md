# Autenticación y Autorización con JWT en Express

Este proyecto implementa un servicio REST seguro utilizando **Node.js** y **Express**, integrando autenticación y autorización basada en **JSON Web Tokens (JWT)**. 

El sistema incluye endpoints para registrar usuarios, iniciar sesión (emitiendo un JWT) y acceder a rutas protegidas mediante un middleware de autorización. 
Los datos se persisten de manera local en un archivo `usuarios.json`.

---

## Estructura del Proyecto

```text
JWT
├── index.js
├── usuarios.json
├── .env
├── package.json
└── middlewares
    └── auth.js
```

## Instalación y Configuración

1. **Instalar dependencias:**
   ```bash
   npm install
   # o
   pnpm install
   ```

2. **Configurar variables de entorno:**
   ```env
   PORT=3000
   JWT_SECRET=super_clave_ultra_secreta_123
   JWT_EXPIRES=15m
   ```

## Ejecución

Para levantar el servidor en modo desarrollo
```bash
npm run dev
# o 
pnpm run dev
```
> La API estará disponible en: `http://localhost:3000`

---

## Endpoints y Ejemplos de Uso

### 1. Registro de Usuario (Opcional)
Crea un nuevo usuario en el sistema. La contraseña se guardará hasheada (encriptada) de forma segura.
- **Ruta:** `POST /auth/register`
- **Ejemplo cURL:**
  ```bash
  curl -s -X POST http://localhost:3000/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"demo@mail.com","password":"123456"}'
  ```

### 2. Login (Emisión de Token)
Valida las credenciales y, si son correctas, devuelve un JSON Web Token firmado.
- **Ruta:** `POST /auth/login`
- **Ejemplo cURL:**
  ```bash
  curl -s -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"demo@mail.com","password":"123456"}'
  ```
- **Respuesta Exitosa Esperada (200 OK):**
  ```json
  {
    "ok": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
  ```
> **Paso clave:** Copia el valor del `token` devuelto en la respuesta para utilizarlo en las rutas que requieren autorización.

### 3. Perfil (Ruta Protegida)
Esta ruta es accesible **solo** si se envía un token válido en las cabeceras HTTP.
- **Ruta:** `GET /api/perfil`
- **Cabecera requerida:** `Authorization: Bearer <TU_TOKEN>`
- **Ejemplo cURL:**
  ```bash
  curl -s -X GET http://localhost:3000/api/perfil \
    -H "Authorization: Bearer <TU_TOKEN>"
  ```
- **Respuesta Exitosa Esperada (200 OK):**
  ```json
  {
    "ok": true,
    "data": {
      "email": "demo@mail.com",
      "role": "user"
    }
  }
  ```

### 4. Acceso Denegado (Prueba de Seguridad)
Si intentas acceder a la ruta `/api/perfil` sin enviar un token, enviando un formato incorrecto o un token expirado (después de 15 minutos), el middleware bloqueará la solicitud.
- **Ejemplo cURL:**
  ```bash
  curl -s -X GET http://localhost:3000/api/perfil \
    -H "Authorization: Bearer token_falso_o_vacio"
  ```
- **Respuesta Esperada (401 Unauthorized):**
  ```json
  {
    "ok": false,
    "mensaje": "401 - Token inválido o expirado. Inicia sesión nuevamente."
  }
  ```

---

## Notas para pruebas con Postman
1. Para las peticiones **POST** (`/auth/login` y `/auth/register`): Ve a la pestaña **Body**, selecciona la opción **raw**, cambia el formato a **JSON**, y pega el cuerpo (`{"email": "...", "password": "..."}`).

2. Para la petición **GET** (`/api/perfil`): Ve a la pestaña **Authorization**, selecciona **Bearer Token** en la lista desplegable de "Type", y pega el token obtenido en el login en el campo de la derecha.