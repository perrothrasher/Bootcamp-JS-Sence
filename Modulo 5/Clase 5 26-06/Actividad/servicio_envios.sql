CREATE TABLE cliente(
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  rut VARCHAR(12) UNIQUE NOT NULL,
  correo VARCHAR(50) UNIQUE NOT NULL,
  telefono VARCHAR(20)
);

CREATE TABLE sucursal(
  id_sucursal SERIAL PRIMARY KEY,
  codigo_sucursal VARCHAR(20) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(200) NOT NULL
);

CREATE TABLE tarifa (
    id_tarifa SERIAL PRIMARY KEY,
    peso_maximo_kg NUMERIC(6,2) NOT NULL CHECK (peso_maximo_kg > 0),
    precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0)
);

CREATE TABLE estado (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE encomienda (
    id_encomienda SERIAL PRIMARY KEY,
    id_cliente_origen INT NOT NULL,
    id_cliente_destino INT NOT NULL,
    id_sucursal_origen INT NOT NULL,
    id_sucursal_destino INT NOT NULL,
    id_tarifa INT NOT NULL,
    peso_kg NUMERIC(6,2) NOT NULL CHECK (peso_kg > 0),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cliente_origen FOREIGN KEY (id_cliente_origen) REFERENCES cliente(id_cliente) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_cliente_destino FOREIGN KEY (id_cliente_destino) REFERENCES cliente(id_cliente) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_suc_origen FOREIGN KEY (id_sucursal_origen) REFERENCES sucursal(id_sucursal) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_suc_destino FOREIGN KEY (id_sucursal_destino) REFERENCES sucursal(id_sucursal) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_tarifa FOREIGN KEY (id_tarifa) REFERENCES tarifa(id_tarifa) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE historial_estado (
    id_historial SERIAL PRIMARY KEY,
    id_encomienda INT NOT NULL,
    id_estado INT NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacion VARCHAR(250),
    CONSTRAINT fk_historial_encomienda FOREIGN KEY (id_encomienda) REFERENCES encomienda(id_encomienda) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_historial_estado FOREIGN KEY (id_estado) REFERENCES estado(id_estado) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- DDL
CREATE INDEX idx_encomienda_origen ON encomienda(id_cliente_origen);
CREATE INDEX idx_encomienda_destino ON encomienda(id_cliente_destino);
CREATE INDEX idx_historial_encomienda ON historial_estado(id_encomienda);

-- INSERT
-- Insertar datos dentro de la tabla clientes
INSERT INTO cliente (rut, nombre, correo, telefono) VALUES 
('11111111-1', 'Juan Perez', 'juan.perez@correo.com', '+56912345678'),
('22222222-2', 'Maria Gomez', 'maria.gomez@correo.com', '+56987654321'),
('33333333-3', 'Carlos Silva', 'carlos.silva@correo.com', '+56955555555');

-- Insertar datos dentro de la tabla sucursal
INSERT INTO sucursal (codigo_sucursal, nombre, direccion) VALUES 
('S-CENTRO', 'Sucursal Santiago Centro', 'Ahumada 123, Santiago, Región Metropolitana'),
('S-NORTE', 'Sucursal Antofagasta', 'Prat 456, Antofagasta, Región de Antofagasta');

-- Insertar datos dentro de la tabla tarifas
INSERT INTO tarifa (peso_maximo_kg, precio) VALUES 
(1.00, 2500.00),  -- tarifa hasta 1Kg
(5.00, 4500.00),  -- tarifa hasta 5Kg
(15.00, 8500.00); -- tarifa hasta 15Kg

-- Insertar datos dentro de la tabla estado
INSERT INTO estado (nombre) VALUES 
('Recibido en Sucursal'),
('En Tránsito'),
('Entregado'),
('Extraviado');

-- Insertar datos dentro de la tabla encomiendas
INSERT INTO encomienda (id_cliente_origen, id_cliente_destino, id_sucursal_origen, id_sucursal_destino, id_tarifa, peso_kg) VALUES
/*Encomienda
id_cliente_origen: Juan Perez (1)
id_cliente_destino: Maria Gomez (2)
id_sucursal_origen: Santiago Centro (1)
id_sucursal_destino: Antofagasta (2)
id_tarifa: tarifa de 5Kg (2)
peso_kg: 3.50kg
*/
(1, 2, 1, 2, 2, 3.50),
(2, 3, 2, 1, 1, 0.50);

-- Insertar datos dentro de la tabla historial_estado
INSERT INTO historial_estado (id_encomienda, id_estado, observacion) VALUES
/*Estado
id_encomienda: 1 (envio realizado por juan perez)
id_estado: 1 (recibido en sucursal)
*/
(1, 1, 'Paquete recibido en sucursal origen con embalaje frágil. Todo en orden.'),
/*Estado
id_encomienda: 2 (envio realizado por maria gomez)
id_estado: 2 (en transito)
*/
(2, 2, 'Sobre pequeño de documentos.');

-- Consulta con detalle completo
SELECT 
    e.id_encomienda AS "N° de Seguimiento",
    remitente.nombre AS "Remitente",
    destinatario.nombre AS "Destinatario",
    suc_origen.nombre AS "Sucursal Origen",
    suc_destino.nombre AS "Sucursal Destino",
    e.peso_kg AS "Peso",
    t.precio AS "Costo Total",
    e.fecha_creacion AS "Fecha de Emisión"
FROM encomienda e
INNER JOIN cliente remitente ON e.id_cliente_origen = remitente.id_cliente
INNER JOIN cliente destinatario ON e.id_cliente_destino = destinatario.id_cliente
INNER JOIN sucursal suc_origen ON e.id_sucursal_origen = suc_origen.id_sucursal
INNER JOIN sucursal suc_destino ON e.id_sucursal_destino = suc_destino.id_sucursal
INNER JOIN tarifa t ON e.id_tarifa = t.id_tarifa
WHERE e.id_encomienda = 1;

-- Consulta para un seguimiento
SELECT 
    h.fecha_actualizacion AS "Fecha y Hora",
    es.nombre AS "Estado del Paquete",
    h.observacion AS "Observación"
FROM historial_estado h
INNER JOIN estado es ON h.id_estado = es.id_estado
WHERE h.id_encomienda = 1
ORDER BY h.fecha_actualizacion DESC;