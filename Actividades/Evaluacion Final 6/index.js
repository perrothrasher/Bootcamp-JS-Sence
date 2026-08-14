import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'mascotas.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function leerDatos() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, JSON.stringify([]));
            return [];
        }
        throw error;
    }
}

async function guardarDatos(datos) {
    await fs.writeFile(filePath, JSON.stringify(datos, null, 2));
}

app.get('/api/mascotas', async (req, res) => {
    try {
        const { nombre, rut } = req.query;
        const mascotas = await leerDatos();

        if (nombre) {
            const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (!mascota) {
                return res.status(404).json({ error: 'Mascota no encontrada' });
            }
            return res.json(mascota);
        }

        if (rut) {
            const mascotasPorRut = mascotas.filter(m => m.rut === rut);
            return res.json(mascotasPorRut);
        }

        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al leer los datos' });
    }
});

app.post('/api/mascotas', async (req, res) => {
    try {
        const { nombre, rut } = req.body;
        
        if (!nombre || !rut) {
            return res.status(400).json({ error: 'Debe proveer nombre y rut' });
        }

        const mascotas = await leerDatos();
        const nuevaMascota = { nombre, rut };
        
        mascotas.push(nuevaMascota);
        await guardarDatos(mascotas);
        
        res.status(201).json({ mensaje: 'Mascota registrada exitosamente', mascota: nuevaMascota });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al guardar los datos' });
    }
});

app.delete('/api/mascotas', async (req, res) => {
    try {
        const { nombre, rut } = req.query;
        const mascotas = await leerDatos();
        let mascotasRestantes = [];
        let modificacion = false;

        if (nombre) {
            mascotasRestantes = mascotas.filter(m => m.nombre.toLowerCase() !== nombre.toLowerCase());
            modificacion = mascotasRestantes.length !== mascotas.length;
        } else if (rut) {
            mascotasRestantes = mascotas.filter(m => m.rut !== rut);
            modificacion = mascotasRestantes.length !== mascotas.length;
        } else {
            return res.status(400).json({ error: 'Debe proveer nombre o rut para eliminar' });
        }

        if (!modificacion) {
            return res.status(404).json({ error: 'No se encontraron registros que coincidan con la búsqueda' });
        }

        await guardarDatos(mascotasRestantes);
        res.json({ mensaje: 'Registros eliminados correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la eliminación' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});