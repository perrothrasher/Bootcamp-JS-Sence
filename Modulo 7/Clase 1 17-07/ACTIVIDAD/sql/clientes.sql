CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

INSERT INTO clientes (nombre, email, telefono) VALUES
('María González', 'maria.gonzalez@correo.cl', '+56911111111'),
('Juan Pérez', 'juan.perez@correo.cl', '+56922222222'),
('Camila Rojas', 'camila.rojas@correo.cl', '+56933333333'),
('Diego Fuentes', 'diego.fuentes@correo.cl', '+56944444444');