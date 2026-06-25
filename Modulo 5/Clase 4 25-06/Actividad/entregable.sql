-- 1. Creación de las Tablas
DROP TABLE IF EXISTS existencias;
DROP TABLE IF EXISTS detalle_facturas;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS facturas;


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

-- 2. Insertar 10 productos
INSERT INTO productos (nombre, descripcion) VALUES
('Procesador AMD Ryzen 5 5600X', 'Procesador de 6 núcleos y 12 hilos, ideal para gaming y productividad'),
('Procesador Intel Core i7-13700K', 'Procesador de alto rendimiento con 16 núcleos para tareas exigentes'),
('Placa Madre ASUS ROG Strix B550-F', 'Placa base ATX con excelente disipación y soporte PCIe 4.0'),
('Memoria RAM Corsair Vengeance 16GB', '2 módulos de 8GB DDR4 a 3200MHz con iluminación RGB'),
('Tarjeta de Video NVIDIA RTX 4060', 'Gráfica de 8GB GDDR6 para jugar en 1080p en calidad ultra con DLSS 3'),
('Tarjeta de Video AMD Radeon RX 7600', 'Excelente gráfica calidad-precio para gaming competitivo'),
('Disco SSD Kingston NV2 1TB', 'Unidad de estado sólido formato M.2 NVMe con velocidades de hasta 3500MB/s'),
('Fuente de Poder EVGA 700W', 'Fuente de poder certificada 80 Plus Bronze con cables mallados'),
('Gabinete NZXT H510', 'Gabinete formato Mid-Tower con panel lateral de vidrio templado'),
('Refrigeración Líquida Cooler Master 240mm', 'Sistema AIO de enfriamiento líquido con doble ventilador y RGB');

SELECT * FROM productos;

-- 3. Insertar existencias para los productos
INSERT INTO existencias (id_producto, cantidad, precio, pesoKg) VALUES
(1, 15, 250000, 1),  -- ID 1: Procesador AMD
(2, 8, 450000, 1),   -- ID 2: Procesador Intel
(3, 12, 180000, 2),  -- ID 3: Placa Madre
(4, 30, 65000, 1),   -- ID 4: RAM 
(5, 10, 320000, 2),  -- ID 5: RTX 4060
(6, 14, 280000, 2),  -- ID 6: RX 7600
(7, 40, 55000, 1),   -- ID 7: SSD
(8, 20, 75000, 3),   -- ID 8: Fuente de Poder 
(9, 5, 85000, 8),    -- ID 9: Gabinete
(10, 18, 110000, 3); -- ID 10: Refrigeración Líquida

SELECT * FROM existencias;

-- 4. Insertar 5 facturas
/*Vendedores
A: 11222333-4
B: 99888777-6
*/
INSERT INTO facturas (rut_comprador, rut_vendedor) VALUES
('18222333-4', '11222333-4'),
('15666777-8', '11222333-4'), 
('19888999-1', '99888777-6'), 
('20111222-K', '99888777-6'), 
('17444555-6', '11222333-4'); 

SELECT * FROM facturas;

-- 5. Insertar detalles a las facturas
INSERT INTO detalle_facturas(id_factura, id_producto) VALUES 
-- factura 1: compra de 3 productos
(1, 1),
(1, 4),
(1, 7),
-- factura 2: compra de 4 productos
(2, 2),
(2, 3),
(2, 8),
(2, 9),
-- factura 3: compra de 5 productos
(3, 1),
(3, 5),
(3, 6),
(3, 7),
(3, 10),
-- factura 4: compra de 3 productos
(4, 3),
(4, 5),
(4, 8),
-- factira 5: compra de 4 productos
(5, 2),
(5, 4),
(5, 6),
(5, 10);

SELECT * FROM detalle_facturas;

-- 6. Actualizar todas las existencias a 10
UPDATE existencias
SET cantidad = 10;

SELECT * FROM existencias;

-- 7. Agregar la columna fecha a facturas
ALTER TABLE facturas
ADD COLUMN fecha DATE;

SELECt * FROM facturas;

-- 8. Actualizar la nueva columna fecha
UPDATE facturas SET fecha = '2026-06-01' WHERE id = 1;
UPDATE facturas SET fecha = '2026-05-05' WHERE id = 2;
UPDATE facturas SET fecha = '2026-03-10' WHERE id = 3;
UPDATE facturas SET fecha = '2026-01-15' WHERE id = 4;
UPDATE facturas SET fecha = '2025-12-25' WHERE id = 5;

SELECT * FROM facturas;

-- 9. Eliminar la columna pesoKg
ALTER TABLE existencias
DROP COLUMN pesoKg;

SELECT * FROM existencias;

-- 10. Consultar una factura en particular junto al detalle, nombre de cada producto y precio
SELECT
  f.id AS numero_factura,
  f.fecha,
  f.rut_comprador,
  p.nombre,
  e.precio
FROM facturas f
INNER JOIN detalle_facturas df ON f.id = df.id_factura
INNER JOIN productos p ON df.id_producto = p.id
INNER JOIN existencias e ON p.id = e.id_producto
WHERE f.id = 3;

-- 11. Consultar el valor final de una factura
SELECT
  f.id AS numero_factura,
  SUM(e.precio) AS valor_total
FROM facturas f
INNER JOIN detalle_facturas df ON f.id = df.id_factura
INNER JOIN productos p ON df.id_producto = p.id
INNER JOIN existencias e ON p.id = e.id_producto
WHERE f.id = 1
GROUP BY f.id;

-- 12. Eliminar todos los productos
DELETE FROM detalle_facturas;
DELETE FROM existencias;
DELETE FROM productos; 

SELECT * FROM detalle_facturas;
SELECT * FROM existencias;
SELECT * FROM productos;