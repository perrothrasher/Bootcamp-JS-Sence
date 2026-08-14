# Registro Civil de Mascotas

Sistema de registro de mascotas para el Ministerio de las Mascotas, compuesto por un servidor backend en Node.js y un cliente frontend que consume la API mediante Axios.

## Estructura del Proyecto

*   `index.js`: Archivo principal del servidor backend construido con Express.
*   `public/index.html`: Interfaz de usuario que implementa el consumo de la API web con Axios y manejo de errores.
*   `mascotas.json`: Archivo de texto utilizado como almacenamiento de datos persistente (se crea automáticamente en la primera ejecución si no existe).

## Requisitos Previos

*   Node.js instalado en el entorno de desarrollo.

## Configuración e Instalación

El proyecto utiliza ES Modules. Es estricto que el archivo `package.json` defina el tipo de módulo. 

1. Instale las dependencias requeridas:
```bash
npm install express cors axios
#o
pnpm install express cors axios
```

# Ejecución
Levantar el servidor ejecutando lo siguiente:
```bash
node index.js
```

# API
La ruta base para todas las peticiones es: http://localhost:3000/api/mascotas

## GET
- `/api/mascotas`: Retorna el listado completo de todas las mascotas con su correspondiente dueño.

- `/api/mascotas?nombre={nombre_mascota}`: Retorna la mascota que coincida exactamente con el nombre ingresado.

- `/api/mascotas?rut={rut_dueño}`: Retorna un arreglo con todas las mascotas asociadas al rut provisto.

## POST
- `/api/mascotas`: Inserta un nuevo registro.
- Body (JSON):
```bash
{
  "nombre": "Fido",
  "rut": "11222333-4"
}
```

## DELETE
- `/api/mascotas?nombre={nombre_mascota`: Elimina del archivo la mascota que coincida con el nombre indicado.

- `/api/mascotas?rut={rut_dueño}`: Elimina del archivo todas las mascotas que estén asociadas al rut indicado.