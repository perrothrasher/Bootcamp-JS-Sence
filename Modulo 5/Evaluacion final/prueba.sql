--------------------------------------------------------------------------------------------------------------
-- PARTE 1
--------------------------------------------------------------------------------------------------------------
-- 1.
-- Crear una consulta para obtener todos los actores que participaron en ambas teleseries, el
-- sueldo que obtuvieron en cada una y la suma de ambos sueldos, todo esto ordenado por el
-- nombre del actor.
SELECT 
    s.nombre,
    s.sueldo AS sueldo_soltera,
    p.sueldo AS sueldo_papi,
    s.sueldo + p.sueldo AS sueldo_sumado
FROM reparto_soltera_otra_vez s
JOIN reparto_papi_ricky p ON s.nombre = p.nombre
ORDER BY s.nombre;

-- 2.
-- Crear una consulta para obtener todos los actores que participaron exclusivamente en
-- soltera otra vez, con un sueldo mayor a 90.
SELECT s.*
FROM reparto_soltera_otra_vez s
LEFT JOIN reparto_papi_ricky p ON s.nombre = p.nombre
WHERE p.nombre IS NULL
  AND s.sueldo > 90;

-- 3.
-- Crear una consulta para obtener solo los actores con sueldo inferior a 85 que actuaron en
-- cualquiera de las dos teleseries, pero no en las dos.
SELECT nombre, sueldo, 'soltera_otra_vez' AS telenovela
FROM reparto_soltera_otra_vez s
WHERE s.sueldo < 85
  AND NOT EXISTS (
      SELECT 1 FROM reparto_papi_ricky p WHERE p.nombre = s.nombre
  )
UNION ALL
SELECT nombre, sueldo, 'papi_ricky' AS telenovela
FROM reparto_papi_ricky p
WHERE p.sueldo < 85
  AND NOT EXISTS (
      SELECT 1 FROM reparto_soltera_otra_vez s WHERE s.nombre = p.nombre
  );

--------------------------------------------------------------------------------------------------------------
-- PARTE 2
--------------------------------------------------------------------------------------------------------------
-- Diagrama sin terminar
-- Tabla 1: actores
-- Tabla 2: reparto_actores
-- Tabla 3: teleseries

-- 1. Terminar el diagrama propuesto.
-- actores (id PK, nombre)
-- teleseries (id PK, nombre, unidad)
-- reparto_actores (actores_id PK, teleseries_id PK, protagonista, sueldo, cantidad)
  -- PK referencia: actor_id, teleserie_id
CREATE TABLE actores (
    id serial PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE teleseries (
    id serial PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    unidad VARCHAR(20) NOT NULL
);

CREATE TABLE reparto_actores (
    actor_id INTEGER NOT NULL REFERENCES actores(id),
    teleserie_id INTEGER NOT NULL REFERENCES teleseries(id),
    protagonista BOOLEAN NOT NULL,
    sueldo INTEGER NOT NULL,
    cantidad INTEGER,
    PRIMARY KEY (actor_id, teleserie_id)
);

-- 2.
-- Crear los scripts de creación de tablas, campos y llaves necesarias. Para poblar las tablas,
-- incluya inserts de los mismos datos del ejercicio anterior adaptados a este nuevo sistema
-- mejorado.

-- Teleseries
INSERT INTO teleseries (nombre, unidad) VALUES
('soltera_otra_vez', 'temporadas'),
('papi_ricky', 'capitulos');

-- Actores
INSERT INTO actores (nombre) VALUES
('Paz Bascuñán'), ('Pablo Macaya'), ('Cristián Arriagada'), ('Josefina Montané'),
('Loreto Aravena'), ('Lorena Bosch'), ('Nicolás Poblete'), ('Héctor Morales'),
('Aranzazú Yankovic'), ('Luis Gnecco'), ('Catalina Guerra'), ('Solange Lackington'),
('Ignacio Garmendia'), ('Julio González'), ('Antonella Orsini'), ('Tamara Acosta'),
('Silvia Santelices'), ('Alejandro Trejo'), ('Grimanesa Jiménez'), ('Jorge Zabaleta'),
('Belén Soto'), ('María Elena Swett'), ('Juan Falcón'), ('Leonardo Perucci'),
('Teresita Reyes'), ('Remigio Remedy'), ('María Paz Grandjean'), ('César Caillet'),
('José Tomás Guzmán'), ('Manuel Aguirre');

-- Reparto soltera_otra_vez
INSERT INTO reparto_actores (actor_id, teleserie_id, protagonista, sueldo, cantidad)
SELECT a.id, t.id, v.protagonista, v.sueldo, v.cantidad
FROM (VALUES
    ('Paz Bascuñán', true, 100, 3),
    ('Pablo Macaya', true, 100, 3),
    ('Cristián Arriagada', true, 95, 3),
    ('Josefina Montané', true, 90, 2),
    ('Loreto Aravena', true, 95, 3),
    ('Lorena Bosch', true, 90, 2),
    ('Nicolás Poblete', true, 85, 2),
    ('Héctor Morales', true, 80, 3),
    ('Aranzazú Yankovic', true, 80, 2),
    ('Luis Gnecco', true, 95, 3),
    ('Catalina Guerra', true, 90, 3),
    ('Solange Lackington', true, 70, 2),
    ('Ignacio Garmendia', true, 70, 2),
    ('Julio González', true, 75, 3),
    ('Antonella Orsini', true, 70, 3),
    ('Tamara Acosta', false, 60, 1),
    ('Silvia Santelices', false, 55, 1),
    ('Alejandro Trejo', false, 55, 1),
    ('Grimanesa Jiménez', false, 60, 1)
) AS v(nombre, protagonista, sueldo, cantidad)
JOIN actores a ON a.nombre = v.nombre
JOIN teleseries t ON t.nombre = 'soltera_otra_vez';

-- Reparto papi_ricky
INSERT INTO reparto_actores (actor_id, teleserie_id, protagonista, sueldo, cantidad)
SELECT a.id, t.id, v.protagonista, v.sueldo, v.cantidad
FROM (VALUES
    ('Jorge Zabaleta', true, 100, 135),
    ('Belén Soto', true, 100, 135),
    ('Tamara Acosta', true, 100, 135),
    ('María Elena Swett', true, 100, 135),
    ('Juan Falcón', true, 95, 135),
    ('Silvia Santelices', true, 85, 135),
    ('Leonardo Perucci', true, 85, 135),
    ('Teresita Reyes', true, 80, 135),
    ('Luis Gnecco', true, 75, 135),
    ('Alejandro Trejo', true, 65, 135),
    ('Grimanesa Jiménez', true, 60, 135),
    ('Remigio Remedy', true, 60, 135),
    ('María Paz Grandjean', true, 55, 135),
    ('Héctor Morales', true, 50, 135),
    ('César Caillet', true, 40, 135),
    ('José Tomás Guzmán', true, 25, 135),
    ('Manuel Aguirre', true, 30, 135)
) AS v(nombre, protagonista, sueldo, cantidad)
JOIN actores a ON a.nombre = v.nombre
JOIN teleseries t ON t.nombre = 'papi_ricky';

-- 3.
-- Crear una consulta que muestre todas las teleseries y todos los actores de reparto
-- asociados. No incluya los actores de rol secundario.
SELECT 
    t.nombre AS teleserie,
    a.nombre AS actor,
    r.sueldo,
    r.cantidad
FROM teleseries t
JOIN reparto_actores r ON r.teleserie_id = t.id
JOIN actores a ON a.id = r.actor_id
WHERE r.protagonista = true
ORDER BY t.nombre, a.nombre;