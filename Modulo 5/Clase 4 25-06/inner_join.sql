-- 10. Consultar una factura en particular junto al detalle, nombre de cada producto y precio
CREATE TABLE facturas(
  id SERIAL PRIMARY KEY,
  rut_comprador VARCHAR(12) NOT NULL,
  rut_vendedor VARCHAR(12) NOT NULL
);

CREATE TABLE productos(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255)
);

CREATE TABLE detalle_facturas(
  id SERIAL PRIMARY KEY,
  id_producto INTEGER REFERENCES productos(id),
  id_factura INTEGER REFERENCES facturas(id)
);

CREATE TABLE existencias(
  id SERIAL PRIMARY KEY,
  id_producto INTEGER REFERENCES productos(id),
  cantidad INTEGER,
  precio INTEGER,
  pesoKg INTEGER
);

SELECT
-- SELECT: que seleccione lo siguiente:
  f.id AS numero_factura, -- El ID de las facturas (o numero de la factura)
  f.fecha, -- La fecha de las facturas
  f.rut_comprador, -- El rut del comprador dentro de las facturas
  p.nombre, -- El nombre del producto
  e.precio -- El valor del producto (en este caso se encuentra dentro de la tabla existencias)
FROM facturas f -- Comienza a buscar desde la tabla facturas, referenciandola a llamarla f
INNER JOIN detalle_facturas df ON f.id = df.id_factura
-- Busca registros que tengan coincidencias exactas en ambas tablas
-- "Pega la tabla facturas (f) con la del detalle (df), pero unicamente donde el número de la factura coincida con el id_factura que se encuentra en el detalle"
INNER JOIN productos p ON df.id_producto = p.id
-- "Pega la tabla productos (p), pero solo donde el codigo del producto coincida con el ID del catalogo"
INNER JOIN existencias e ON p.id = e.id_producto
-- Pega la tabla existencias (e) cruzando el ID del producto
WHERE f.id = 3;

-- Tabla facturas f
-- id | rut_comprador
-- 1 | 18222333-4

-- Tabla detalle_facturas df
-- id | id_producto | id_factura
-- 10 | 5           | 1
-- 11 | 3           | 1
FROM facturas f
INNER JOIN detalle_facturas df ON f.id = df.id_factura WHERE id = 1;
-- Busca en la tabla facturas donde el ID sea 1 y luego en detalle_facturas todas las filas cuyos ID sean 1
-- Tabla resultado
-- f.id | f.rut_comprador | df.id | df.id_producto | df.id_factura
-- 1    | 18222333-4      | 10    | 5              | 1
-- 1    | 18222333-4      | 11    | 3              | 1