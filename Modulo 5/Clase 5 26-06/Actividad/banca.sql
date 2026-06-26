CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100)
);

CREATE TABLE cuenta (
    id_cuenta SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    numero_cuenta VARCHAR(20) UNIQUE NOT NULL,
    saldo NUMERIC(12,2) DEFAULT 0,
    CONSTRAINT fk_cuenta_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE tipo_transaccion (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE transaccion (
    id_transaccion SERIAL PRIMARY KEY,
    id_cuenta INT NOT NULL,
    id_tipo INT NOT NULL,
    monto NUMERIC(12,2) NOT NULL,
    fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaccion_cuenta FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta),
    CONSTRAINT fk_transaccion_tipo FOREIGN KEY (id_tipo) REFERENCES tipo_transaccion(id_tipo)
);

CREATE INDEX idx_movimientos_cuenta ON transaccion(id_cuenta);


-- INSERT
INSERT INTO cliente (rut, nombre, correo) 
VALUES ('11111111-1', 'Ana Lopez', 'ana@correo.com');

INSERT INTO cuenta (id_cliente, numero_cuenta, saldo) 
VALUES (1, 'CTA-999888', 50000);

INSERT INTO tipo_transaccion (nombre) 
VALUES ('Depósito'), ('Retiro / Compra');

INSERT INTO transaccion (id_cuenta, id_tipo, monto) 
VALUES 
(1, 1, 20000), -- Ana ha depositado 20.000
(1, 2, 5000);  -- Ana realizó una transacción de 5.000

-- CONSULTAS
SELECT 
    t.fecha_transaccion AS "Fecha",
    tt.nombre AS "Tipo de Movimiento",
    t.monto AS "Monto"
FROM transaccion t
INNER JOIN tipo_transaccion tt ON t.id_tipo = tt.id_tipo
WHERE t.id_cuenta = 1
ORDER BY t.fecha_transaccion DESC;