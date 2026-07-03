import http from 'http';

const server = http.createServer((req, res)=>{
    res.writeHead(200, {"content-type": "text/plain; charset=utf-8"});

    // Respuesta al navegador
    res.end("Hola mundo desde Node.js");
});

server.listen(8000, ()=>{
    console.log("Servidor escuchando en http://localhost:3000");
});