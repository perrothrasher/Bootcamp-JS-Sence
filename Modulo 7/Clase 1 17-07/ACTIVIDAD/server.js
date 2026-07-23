import express from 'express';
import poolConfig from './db/config.js';
import { pool as poolConnStr } from './db/conexion.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

async function initDatabase() {
  try {
    await poolConfig.query(`
      CREATE TABLE IF NOT EXISTS finanzas_personales (
        id SERIAL PRIMARY KEY,
        concepto VARCHAR(100) NOT NULL,
        tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('ingreso', 'gasto')),
        monto NUMERIC(12,2) NOT NULL,
        fecha DATE NOT NULL DEFAULT CURRENT_DATE
      );
    `);
    const finanzasCount = await poolConfig.query('SELECT COUNT(*) FROM finanzas_personales');
    if (Number(finanzasCount.rows[0].count) === 0) {
      await poolConfig.query(`
        INSERT INTO finanzas_personales (concepto, tipo, monto, fecha) VALUES
        ('Sueldo', 'ingreso', 850000, '2026-07-01'),
        ('Arriendo', 'gasto', 300000, '2026-07-02'),
        ('Supermercado', 'gasto', 120000, '2026-07-05'),
        ('Freelance', 'ingreso', 150000, '2026-07-10'),
        ('Internet', 'gasto', 25000, '2026-07-08');
      `);
      console.log('Tabla finanzas_personales poblada.');
    }
    await poolConnStr.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        telefono VARCHAR(20)
      );
    `);
    const clientesCount = await poolConnStr.query('SELECT COUNT(*) FROM clientes');
    if (Number(clientesCount.rows[0].count) === 0) {
      await poolConnStr.query(`
        INSERT INTO clientes (nombre, email, telefono) VALUES
        ('María González', 'maria.gonzalez@correo.cl', '+56911111111'),
        ('Juan Pérez', 'juan.perez@correo.cl', '+56922222222'),
        ('Camila Rojas', 'camila.rojas@correo.cl', '+56933333333'),
        ('Diego Fuentes', 'diego.fuentes@correo.cl', '+56944444444');
      `);
      console.log('Tabla clientes poblada.');
    }
  } catch (err) {
    console.error('Error inicializando la base de datos:', err.message);
  }
}

// GET /finanzas
app.get('/finanzas', async (req, res) => {
  try {
    const { rows } = await poolConfig.query(
      'SELECT id, concepto, tipo, monto, fecha FROM finanzas_personales ORDER BY fecha DESC'
    );
    res.status(200).json({ ok: true, data: rows });
  } catch (err) {
    console.error('Error en GET /finanzas:', err.message);
    res.status(500).json({ ok: false, error: 'Error al consultar finanzas_personales' });
  }
});

// GET /clientes
app.get('/clientes', async (req, res) => {
  try {
    const { rows } = await poolConnStr.query(
      'SELECT id, nombre, email, telefono FROM clientes ORDER BY id'
    );
    res.status(200).json({ ok: true, data: rows });
  } catch (err) {
    console.error('Error en GET /clientes:', err.message);
    res.status(500).json({ ok: false, error: 'Error al consultar clientes' });
  }
});

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});