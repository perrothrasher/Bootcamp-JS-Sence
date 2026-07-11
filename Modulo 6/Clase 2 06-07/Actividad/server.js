import express from "express";

const app = express();
const PORT = 3001;

// Base de Datos local
const conductores = [
    { nombre: 'Don Pepe', edad: 55 },
    { nombre: 'Pedro', edad: 25 },
    { nombre: 'Maria', edad: 33 },
    { nombre: 'Francisco', edad: 19 },
    { nombre: 'Camilo', edad: 29 },
    { nombre: 'Andres', edad: 35 },
    { nombre: 'Mario', edad: 48 },
    { nombre: 'Felipe', edad: 33 }
];

const automoviles = [
    { marca: 'Ford', patente: 'HXJH55', nombre_conductor: 'Felipe' },
    { marca: 'Toyota', patente: 'HLSA26', nombre_conductor: 'Pedro' },
    { marca: 'Mercedes', patente: 'JFTS47', nombre_conductor: 'Maria' },
    { marca: 'Chevrolet', patente: 'RTPP97', nombre_conductor: 'Francisco' },
    { marca: 'Nissan', patente: 'SDTR51', nombre_conductor: 'Don Pepe' },
    { marca: 'Mazda', patente: 'RDCS19', nombre_conductor: 'Francisco' },
    { marca: 'Kia', patente: 'KDTZ28', nombre_conductor: 'Don Pepe' }
];

app.get('/', (req, res) => {
    res.send(`
            <ul>
                <li>
                    <a href="/conductores">1. GET /conductores</a>
                    <br><small>Muestra la lista completa de todos los conductores registrados.</small>
                </li>
                <li>
                    <a href="/automoviles">2. GET /automoviles</a>
                    <br><small>Muestra la lista completa de todos los automóviles registrados.</small>
                </li>
                <li>
                    <a href="/conductoressinauto?edad=35">3. GET /conductoressinauto?edad=35</a>
                    <br><small>Conductores menores a la edad ingresada que no poseen vehículo (puedes editar el número en tu navegador).</small>
                </li>
                <li>
                    <a href="/solitos">4. GET /solitos</a>
                    <br><small>Lista combinada de quiénes no tienen auto y qué autos no tienen conductor registrado.</small>
                </li>
                <li>
                    <a href="/auto?patente=HXJH55">5. GET /auto?patente=HXJH55</a>
                    <br><small>Busca un automóvil por su patente exacta y te muestra los datos de su dueño.</small>
                </li>
                <li>
                    <a href="/auto?iniciopatente=H">6. GET /auto?iniciopatente=H</a>
                    <br><small>Filtra todos los automóviles cuya patente comience con la letra especificada.</small>
                </li>
            </ul>
        </div>
    `);
});

// consulta 1
app.get('/conductores', (req, res) => {
    let html = '<div>';
    html += '<h2>Lista General de Conductores</h2><ul>';
    
    conductores.forEach(c => {
        html += `<li>Conductor: <b>${c.nombre}</b> — Edad: ${c.edad} años</li>`;
    });
    
    html += '</ul><br><a href="/">Volver al menú</a></div>';
    res.send(html);
});

// consulta 2
const rutaAutos = (req, res) => {
    let html = '<div>';
    html += '<h2>Lista General de Automóviles</h2><ul>';
    
    automoviles.forEach(a => {
        html += `<li>Vehículo: <b>${a.marca}</b> | Patente: <b>${a.patente}</b> (Conductor: ${a.nombre_conductor})</li>`;
    });
    
    html += '</ul><br><a href="/">Volver al menú</a></div>';
    res.send(html);
};
app.get('/automoviles', rutaAutos);
app.get('/autom%C3%B3viles', rutaAutos);

// consulta 3
app.get('/conductoressinauto', (req, res) => {
    const edadLimite = Number(req.query.edad);

    if (!edadLimite || isNaN(edadLimite)) {
        return res.send('<div>Error: Debes ingresar un número válido en la URL</div>');
    }

    const filtrados = conductores.filter(conductor => {
        const esMenor = conductor.edad < edadLimite;
        const noTieneAuto = !automoviles.some(auto => auto.nombre_conductor === conductor.nombre);
        return esMenor && noTieneAuto;
    });

    let html = `<div>`;
    html += `<h2>Conductores sin auto (Menores de ${edadLimite} años)</h2><ul>`;
    
    if (filtrados.length === 0) {
        html += '<li>No hay conductores que cumplan con los requisitos.</li>';
    } else {
        filtrados.forEach(c => {
            html += `<li><b>${c.nombre}</b> tiene ${c.edad} años y no posee vehículo registrado.</li>`;
        });
    }
    
    html += '</ul><br><a href="/">Volver al menú</a></div>';
    res.send(html);
});

// consulta 4
app.get('/solitos', (req, res) => {
    const conductoresSolos = conductores.filter(c => !automoviles.some(a => a.nombre_conductor === c.nombre));
    const autosSolos = automoviles.filter(a => !conductores.some(c => c.nombre === a.nombre_conductor));

    let html = '<div>';
    html += '<h2>Conductores sin Automóvil registrado</h2>';
    conductoresSolos.forEach(c => html += `<li>${c.nombre} (${c.edad} años)</li>`);
    
    html += '</ul><h2>Automóviles sin Conductor en el sistema</h2><ul>';
    if (autosSolos.length === 0) {
        html += '<li><i>Ninguno, todos los autos de la base de datos pertenecen a un conductor válido</i></li>';
    } else {
        autosSolos.forEach(a => html += `<li>${a.marca} (Patente: ${a.patente})</li>`);
    }
    
    html += '</ul><br><a href="/">Volver al menú</a></div>';
    res.send(html);
});

// consulta 5 y 6
app.get('/auto', (req, res) => {
    const { patente, iniciopatente } = req.query;
    let html = '<div>';
    if (patente) {
        const auto = automoviles.find(a => a.patente.toLowerCase() === patente.trim().toLowerCase());
        html += `<h2>Datos del vehículo por Patente exacta: ${patente}</h2><ul>`;
        
        if (!auto) {
            html += '<li>No se encontró ningún automóvil con la patente ingresada</li>';
        } else {
            const conductor = conductores.find(c => c.nombre === auto.nombre_conductor);
            const infoChofer = conductor ? `${conductor.nombre} (Edad: ${conductor.edad} años)` : 'No asignado';
            
            html += `<li><b>Automóvil:</b> ${auto.marca}</li>`;
            html += `<li><b>Patente:</b> ${auto.patente}</li>`;
            html += `<li><b>Datos del Conductor:</b> ${infoChofer}</li>`;
        }
    } 
    else if (iniciopatente) {
        const letraBusqueda = iniciopatente.trim().toLowerCase();
        const autosFiltrados = automoviles.filter(a => a.patente.toLowerCase().startsWith(letraBusqueda));
        
        html += `<h2>Automóviles que inician con la letra: "${iniciopatente}"</h2><ul>`;
        
        if (autosFiltrados.length === 0) {
            html += '<li>No se encontraron patentes</li>';
        } else {
            autosFiltrados.forEach(a => {
                const conductor = conductores.find(c => c.nombre === a.nombre_conductor);
                const infoChofer = conductor ? `Conductor: ${conductor.nombre} (Edad: ${conductor.edad})` : 'Sin dueño';
                html += `<li>Auto: <b>${a.marca}</b> — Patente: <b>${a.patente}</b> [${infoChofer}]</li>`;
            });
        }
    } 
    else {
        html += '<h2>Ruta incompleta</h2>';
    }
    html += '</ul><br><a href="/">Volver al menú</a></div>';
    res.send(html);
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});