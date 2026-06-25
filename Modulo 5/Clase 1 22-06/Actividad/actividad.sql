-- Creación de la tabla
CREATE TABLE personas(
	rut VARCHAR(10) PRIMARY KEY,
	nombre VARCHAR(20),
	edad INTEGER
);

-- Insertado de datos
INSERT INTO personas (rut, nombre, edad) VALUES
('12122122-2', 'Pepa', 33),
('13133133-3', 'Diego', 21),
('13675924-7', 'Mario', 85),
('14144251-1', 'Paula', 35),
('16555444-1', 'Muriela', 22),
('18188188-8', 'Pato', 44);

SELECT * FROM personas;

/*
Consulta 1
Todos los clientes que tienen rut 13133133-3
*/
SELECT * FROM personas
WHERE rut = '13133133-3';

/*
Consulta 2
Todos los clientes mayores de 25 años
*/
SELECT * FROM personas
WHERE edad > 25;

/*
Consulta 3
Todos los clientes que no se llamen mario
*/
SELECT * FROM personas
WHERE nombre NOT ILIKE 'mario';

/*
Consulta 4
Todos los clientes que su rut empiecen con 13
*/
SELECT * FROM personas
WHERE rut ILIKE '13%';

/*
Consulta 5
Todos los clientes con nombre finalizado en a
*/
SELECT * FROM personas
WHERE nombre ILIKe '%a';

/*
Consulta 6
Todos los clientes con nombre empezado en P y edad mayor a 34
*/
SELECT * FROM personas
WHERE nombre ILIKE 'p%' 
	AND edad > 34;

/*
Consulta 7
Todos los clientes con rut empezado en 1, nombre no empezado con M y edad menor a 40
*/
SELECT * FROM personas
WHERE rut ILIKE '1%' 
	AND nombre NOT ILIKE 'm%' 
	AND edad < 40;

/*
Consulta 8
Todos los clientes con rut empezado en 13 o terminado en 1, con nombres Diego, Mario, Pato, Pepa y edad entre 20 y 80
*/
SELECT * FROM personas
WHERE (rut ILIKe '13%' OR rut ILIKE '%1') 
	AND nombre IN ('Diego', 'Mario', 'Pato', 'Pepa')
	AND edad BETWEEN 20 AND 80;