# API pedagógica de usuarios con JWT

Proyecto mínimo para comprender:

```text
Autenticación → ¿quién eres?
Validación    → ¿el token es auténtico y está vigente?
Autorización  → ¿tienes permiso para acceder?
```

## 1. Instalar dependencias

```bash
npm install
```

## 2. Crear la base de datos

```bash
psql -U postgres -d postgres -f database/create_database.sql
```

## 3. Crear tabla y usuarios de prueba

```bash
psql -U postgres -d jwt_usuarios_api -f database/init.sql
```

Credenciales:

```text
Usuario: ana@email.com / usuario123
Admin:   admin@email.com / admin123
```

## 4. Crear usuarios de prueba

```bash
npm run seed
```

## 5. Levantar el proyecto

```bash
npm run dev
```

## 6. Probar

Abra `requests/rutas.rest`, ejecute los login y copie cada token en las variables del inicio.

## Rutas

| Método | Endpoint | Acceso |
|---|---|---|
| POST | `/api/v1/auth/login` | Público |
| GET | `/api/v1/usuarios/perfil` | Token válido |
| GET | `/api/v1/usuarios` | Solo admin |
| GET | `/health` | Público |

## Códigos esperados

```text
Credenciales incorrectas   → 401
Ruta sin token              → 401
Token inválido o vencido    → 401
Rol insuficiente            → 403
Acceso autorizado           → 200
```
