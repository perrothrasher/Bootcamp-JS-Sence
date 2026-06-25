-- CREACION DE TABLAS
-- Tabla clientes
-- Guarda los datos basicos de un cliente
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL
);

-- Tabla productos
-- Guardar los productos disponibles en una tienda
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL,
);

-- Tabla pedidos
-- Representar una compra realizada por un cliente
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha DATE NOT NULL,
    total INTEGER NOT NULL,
    CONSTRAINT fk_pedidos_clientes
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
);
 
-- Tabla detalle_pedidos
-- Representar que productos fueron compprados en cada pedido
CREATE TABLE detalle_pedidos (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    CONSTRAINT fk_detalle_pedidos
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido),
    CONSTRAINT fk_detalle_productos
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);