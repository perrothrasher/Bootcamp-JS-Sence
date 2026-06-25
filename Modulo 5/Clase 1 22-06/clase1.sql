-- Comentario de una linea
/*Comentario de multiples lineas*/

-- DDL
-- Tabla clientes
CREATE TABLE clientes(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    ciudad VARCHAR(80),
    edad INTEGER CHECK(edad>=0)
);

-- Tabla productos
CREATE TABLE productos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0)
);

-- DML
/*
Comandos DML mas comunes:
INSERT: para agregar registros
SELECT: para consultar registros
UPDATE: para actualizar/editar registros
DELETE: para eliminar registros

DDL define la estructura
DML manipula la información
*/

-- INSERT INTO permite ingresar registros dentro de una tabla
INSERT INTO clientes (nombre, email, ciudad, edad)
VALUES
('Ana Pérez', 'ana@correo.com', 'Santiago', 28),
('Luis Soto', 'luis@correo.com', 'Valparaíso', 35),
('María López', 'maria@correo.com', 'Concepción', 22),
('Carlos Díaz', 'carlos@correo.com', 'Santiago', 41),
('Fernanda Rojas', 'fernanda@correo.com', 'La Serena', 30);

INSERT INTO productos (nombre, categoria, precio, stock)
VALUES
('Notebook Lenovo', 'Tecnología', 650000, 8),
('Mouse inalámbrico', 'Tecnología', 12000, 30),
('Silla ergonómica', 'Muebles', 89990, 12),
('Escritorio madera', 'Muebles', 129990, 5),
('Audífonos Bluetooth', 'Tecnología', 39990, 20),
('Lámpara LED', 'Hogar', 15990, 18);

SELECT *
FROM clientes
WHERE ciudad = "santiago";

-- La tienda quiere saber que productos valen mas de $40.000
SELECT *
FROM productos
WHERE precio >= 40000;

-- La tienda quiere saber que productos tienen bajo stock
SELECT  nombre, stock
FROM productos
WHERE stock <= 10;

SELECT *
FROM clientes
WHERE edad >= 30;