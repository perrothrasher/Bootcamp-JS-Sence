import express from 'express';
import pg from 'pg';
import Cursor from 'pg-cursor';
import cors from 'cors';

const { Pool } = pg;

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Final7', 
    password: '12345',
    port: 5432,
});

let clientCursor = null;
let cursor = null;

// GET: Obtener lista con cursor
app.get('/api/paises', async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const reset = req.query.reset === 'true';

    try {
        if (reset || !clientCursor) {
            if (clientCursor) {
                clientCursor.release(true); 
                clientCursor = null;
            }
            
            clientCursor = await pool.connect();
            
            const query = `
                SELECT p.nombre, p.continente, p.poblacion, pb.pib_2019, pb.pib_2020 
                FROM paises p 
                INNER JOIN paises_pib pb ON p.nombre = pb.nombre
            `;
            cursor = clientCursor.query(new Cursor(query));
        }
        cursor.read(limit, (err, rows) => {
            if (err) {
                if (clientCursor) clientCursor.release(true);
                clientCursor = null;
                return res.status(500).json({ error: `Error al leer cursor: ${err.message}` });
            }
            if (rows.length === 0) {
                clientCursor.release();
                clientCursor = null;
            }
            
            res.json(rows);
        });
    } catch (error) {
        res.status(500).json({ error: `Error del servidor: ${error.message}` });
    }
});

// POST: Agregar nuevo país
app.post('/api/paises', async (req, res) => {
    const { nombre, continente, poblacion, pib_2019, pib_2020 } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); 

        await client.query(
            'INSERT INTO paises (nombre, continente, poblacion) VALUES ($1, $2, $3)', 
            [nombre, continente, poblacion]
        );
        await client.query(
            'INSERT INTO paises_pib (nombre, pib_2019, pib_2020) VALUES ($1, $2, $3)', 
            [nombre, pib_2019, pib_2020]
        );

        await client.query(
            'INSERT INTO paises_data_web (nombre_pais, accion) VALUES ($1, 1)', 
            [nombre]
        );

        await client.query('COMMIT');
        res.status(201).json({ message: 'País agregado con éxito y registrado en data_web.' });

    } catch (error) {
        await client.query('ROLLBACK'); 
        res.status(400).json({ error: `Error al agregar país: ${error.message}. Se ejecutó ROLLBACK.` });
    } finally {
        client.release();
    }
});

// DELETE: Eliminar un país 
app.delete('/api/paises/:nombre', async (req, res) => {
    const { nombre } = req.params;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM paises_pib WHERE nombre = $1', [nombre]);

        const deleteResult = await client.query('DELETE FROM paises WHERE nombre = $1', [nombre]);
        
        if (deleteResult.rowCount === 0) {
            throw new Error('El país indicado no existe.');
        }

        await client.query(
            'INSERT INTO paises_data_web (nombre_pais, accion) VALUES ($1, 0)', 
            [nombre]
        );

        await client.query('COMMIT'); 
        res.status(200).json({ message: 'País eliminado con éxito y registrado en data_web.' });

    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ error: `Error al eliminar país: ${error.message}. Se ejecutó ROLLBACK.` });
    } finally {
        client.release();
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));