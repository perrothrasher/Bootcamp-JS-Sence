CREATE TABLE IF NOT EXISTS finanzas_personales (
    id SERIAL PRIMARY KEY,
    concepto VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('ingreso', 'gasto')),
    monto NUMERIC(12,2) NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO finanzas_personales (concepto, tipo, monto, fecha) VALUES
('Sueldo', 'ingreso', 850000, '2026-07-01'),
('Arriendo', 'gasto', 300000, '2026-07-02'),
('Supermercado', 'gasto', 120000, '2026-07-05'),
('Freelance', 'ingreso', 150000, '2026-07-10'),
('Internet', 'gasto', 25000, '2026-07-08');