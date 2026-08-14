# Administración de Países (Backend & Frontend)

## Descripción

Objetivo del Backend:
-   **Uso avanzado de PostgreSQL en Node.js:** Implementación de las librerías `pg` y `pg-cursor`.
-   **Manejo de Transacciones:** Uso de sentencias `BEGIN`, `COMMIT` y `ROLLBACK` para asegurar la integridad de los datos, previniendo corrupciones en la base de datos ante errores o restricciones (como llaves primarias duplicadas).
-   **Paginación Eficiente:** Lectura de datos en bloques mediante cursores, optimizando el uso de memoria en el servidor.
-   **Creación de API RESTful:** Exposición de endpoints `GET`, `POST` y `DELETE` para la comunicación fluida con el frontend.

Objetivo del frontend:
-   Listar países mediante paginación configurada por el usuario
-   Agregar nuevos países a la base de datos a través de un formulario.
-   Eliminar países existentes.
-   Visualizar de forma clara y ordenada los mensajes de éxito o error enviados desde el servidor, especialmente los generados por las transacciones y los `ROLLBACK`.

## Requisitos Previos

Antes de levantar la aplicación:
1.  Tener instalado **Node.js**
2.  **PostgreSQL** ejecutándose

## Instalación y Ejecución

1.  Instala las dependencias necesarias:
    ```bash
    npm install express pg pg-cursor cors
    #o
    pnpm install express pg pg-cursor cors
    ```
2.  Configura tus credenciales de la base de datos dentro de la constante `pool` en el archivo `server.js`
3.  Inicia el servidor backend:
    ```bash
    npm run dev
    #o
    pnpm run dev
    ```
6.  Abre el archivo `index.html` en tu navegador para interactuar con la aplicación.

## Autor/a

-   **perrothrasher**

## Repositorio

-   **GitHub:** [https://github.com/perrothrasher/Bootcamp-JS-Sence/tree/fa374c9e0e1b5add0f4813dc9e69f2a00ae0beb6/Actividades/Evaluacion%20Final%207]