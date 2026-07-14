import http from "http";

const PORT = 3000;
const DIAS = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

// 1. Servidor de Fecha y Hora (Endpoint Principal)
// Este es consultado en la URL por defecto
function manejarFechaHora(req, res) {
  const ahora = new Date();
  const nombreDia = DIAS[ahora.getDay()];
  const numeroDia = ahora.getDate();
  const mes = ahora.getMonth() + 1;
  const anio = ahora.getFullYear();
  const hora = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const segundos = ahora.getSeconds().toString().padStart(2, '0');

  // Si no agrego el utf-8, las tildes no se ven
  const html = `
    <head>
      <meta charset="UTF-8"> 
    </head>
    <body>
      <h1>Fecha y Hora Actual del Servidor</h1>
      <ul>
        <li>Día: ${nombreDia}</li>
        <li>Número de día: ${numeroDia}</li>
        <li>Mes: ${mes}</li>
        <li>Año: ${anio}</li>
        <li>Hora (24h): ${hora}</li>
        <li>Minutos: ${minutos}</li>
        <li>Segundos: ${segundos}</li>
      </ul>
    </body>
  `;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2. Servidor de Respuestas Aleatorias (Endpoint Secundario, p. ej. /random-data)
function generarPalabraAleatoria() {
  const letras = 'abcdefghijklmnopqrstuvwxyz';
  // Se genera una longitud entre 3 y 10
  const longitud = Math.floor(Math.random() * (10 - 3 + 1)) + 3; 
  let palabra = '';
  for (let i = 0; i < longitud; i++) {
    palabra += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  return palabra;
}

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (50000 - 10 + 1)) + 10;
}

function manejarRandomData(req, res) {
  const metodo = req.method;

  if (metodo === 'GET') {
    const palabra = generarPalabraAleatoria();
    const html = `
        <h1>Palabra Aleatoria</h1>
        <p>${palabra}</p>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);

  } else if (metodo === 'PUT') {
    const numero = generarNumeroAleatorio();
    const html = `
        <h1>Número Aleatorio</h1>
        <p>${numero}</p>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);

  } else {
    // 3. Otros Métodos HTTP
    // Esto es para los metodos que no son soportados
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Aún no estoy preparado para responder al método ${metodo}`);
  }
}


const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/' && req.method === 'GET') {
    manejarFechaHora(req, res);
  } else if (url === '/random') {
    manejarRandomData(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Recurso no encontrado');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});