-- Creación de tablas
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(200)
);

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    precio_unitario NUMERIC(12,2) NOT NULL CHECK (precio_unitario > 0),
    stock INT NOT NULL CHECK (stock >= 0),
    id_categoria INT NOT NULL,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15)
);

CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Pagado', 'Despachado', 'Cancelado')),
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE detalle_pedido (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario_historico NUMERIC(12,2) NOT NULL CHECK (precio_unitario_historico > 0),
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE pago (
    id_pago SERIAL PRIMARY KEY,
    id_pedido INT UNIQUE NOT NULL,
    monto NUMERIC(12,2) NOT NULL CHECK (monto > 0),
    metodo_pago VARCHAR(30) NOT NULL CHECK (metodo_pago IN ('Efectivo', 'Tarjeta Crédito', 'Tarjeta Débito', 'Transferencia')),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pago_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE
);

-- DDL
CREATE INDEX idx_producto_sku ON producto(sku);
CREATE INDEX idx_pedido_cliente ON pedido(id_cliente);
CREATE INDEX idx_detalle_pedido ON detalle_pedido(id_pedido);


-- INSERT
INSERT INTO categoria (nombre, descripcion) VALUES 
('Tecnología', 'Televisores, computadores y accesorios'),
('Línea Blanca', 'Refrigeradores, lavadoras y cocinas');

INSERT INTO producto (sku, nombre, precio_unitario, stock, id_categoria) VALUES 
('P-NOTE-01', 'Notebook Gamer', 899990.00, 15, 1),
('P-MOUS-02', 'Mouse Inalámbrico', 19990.00, 50, 1),
('P-REFR-03', 'Refrigerador', 459990.00, 8, 2);

INSERT INTO cliente (rut, nombre, correo, telefono) VALUES 
('11111111-1', 'Constanza Silva', 'conny.s@correo.com', '+56911112222'),
('22222222-2', 'Pedro Aguilera', 'pedro.a@correo.com', '+56933334444');

INSERT INTO pedido (id_cliente, estado) VALUES 
(1, 'Pagado'),  -- pedido de Constanza
(2, 'Pendiente'); -- pedido de Pedro

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario_historico) VALUES 
(1, 1, 1, 899990.00), -- Constanza compra notebook
(1, 2, 2, 19990.00), -- Constanza compra 2 mouse
(2, 3, 1, 459990.00); -- Pedro quiere comprar refrigerador

INSERT INTO pago (id_pedido, monto, metodo_pago) VALUES 
(1, 939970.00, 'Tarjeta Crédito'); 
-- 899990 + 19990 * 2 = 939970

-- Consultas
-- Ver la Boleta
SELECT 
    p.id_pedido AS "N° Pedido",
    c.nombre AS "Cliente",
    prod.nombre AS "Producto",
    dp.cantidad AS "Cantidad",
    dp.precio_unitario_historico AS "Precio Unitario",
    (dp.cantidad * dp.precio_unitario_historico) AS "Subtotal"
FROM pedido p
INNER JOIN cliente c ON p.id_cliente = c.id_cliente
INNER JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
INNER JOIN producto prod ON dp.id_producto = prod.id_producto
WHERE p.id_pedido = 1;

-- Reporte de ventas totales
SELECT 
    pa.id_pago AS "Transacción",
    pa.id_pedido AS "N° Pedido",
    c.nombre AS "Comprador",
    pa.monto AS "Total Pagado",
    pa.metodo_pago AS "Medio",
    pa.fecha_pago AS "Fecha Transacción"
FROM pago pa
INNER JOIN pedido pe ON pa.id_pedido = pe.id_pedido
INNER JOIN cliente c ON pe.id_cliente = c.id_cliente;