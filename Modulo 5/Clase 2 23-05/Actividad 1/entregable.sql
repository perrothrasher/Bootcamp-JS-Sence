SELECT * FROM finanzas_personales ;

-- Consulta 1: A quien(es) le debo mas dinero
SELECT nombre, le_debo
FROM finanzas_personales
ORDER BY le_debo DESC;
/*
En este caso es posible limitarlo a 1 para que muestre solo la persona que mas debe, se realiza con la siguiente consulta
SELECT nombre, le_debo
FROM finanzas_personales
ORDER BY le_debo DESC
LIMIT 1;
El limit 1 agrega un filtro para solo mostrar a una persona, en este caso a la persona que mas debe, la cual sería Vicios Varios
*/
-- ############################################################################################################################################

-- Consulta 2: Quien(es) me deben mas dinero y cuanto
SELECT nombre, me_debe
FROM finanzas_personales
WHERE me_debe > 0
ORDER BY me_debe DESC;
/*
En este caso se agregó el operador de comparacion para mostrar solo los que debian correctamente, sin el muestra a todos los 
deudores aunque su deuda sea 0
*/
-- ############################################################################################################################################

-- Consulta 3: Cuanto dinero debo en total
SELECT SUM(le_debo) AS deuda_total
FROM finanzas_personales;
-- ############################################################################################################################################

-- Consulta 4: Cuanto dinero debo en promedio
SELECT AVG(le_debo) AS promedio_deuda
FROM finanzas_personales;
-- ############################################################################################################################################

-- Consulta 5: Cuantos meses demoro en saldar la deuda
-- Estandar
SELECT SUM(cuotas_pagar) AS meses
FROM finanzas_personales;
-- Experta
SELECT (SUM(cuotas_pagar)/12) AS años,
(SUM(cuotas_pagar)%12) AS meses
FROM finanzas_personales;
-- ############################################################################################################################################

-- Consulta 6:
SELECT (SUM(le_debo) - SUM(me_debe)) / SUM(cuotas_pagar) AS valor_cuota
FROM finanzas_personales;
-- ############################################################################################################################################

-- Consulta 7: Insertar un nuevo registro en la tabla
INSERT INTO finanzas_personales(nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
VALUES ('pareja', 0, 0, 50000, 1);
-- ############################################################################################################################################

-- Consulta 8: de cuanto es la cuota para este mes
SELECT SUM(le_debo/cuotas_pagar) AS cuota_mes
FROM finanzas_personales
WHERE cuotas_pagar > 0;
-- ############################################################################################################################################

-- Consulta 9: modificar cuotas
UPDATE finanzas_personales
SET cuotas_pagar = 13
WHERE nombre = 'almacén esquina';

SELECT * FROM finanzas_personales;
-- ############################################################################################################################################

-- Consulta 10: de cuanto es la cuota para este mes (actualizado) 
SELECT SUM(le_debo/cuotas_pagar) AS cuota_mes
FROM finanzas_personales
WHERE cuotas_pagar > 0;