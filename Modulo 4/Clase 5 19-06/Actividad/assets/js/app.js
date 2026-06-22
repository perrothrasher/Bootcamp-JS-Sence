const API = 'https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10'
let personajes = null;

const resultado = document.getElementById("resultado");

// Botones
const btnListado = document.getElementById("btnListado");
const btnAgrupar = document.getElementById("btnAgrupar");
const btnFicha = document.getElementById("btnFicha");

// Obtener datos desde la API
function obtenerPersonajes(callback){
    // Si ya se han llamado los personajes
    if(personajes != null){
        console.log("Ya se ha llamado a la API anteriormente");
        callback(personajes);
        return;
    }

    // Si no se han llamado
    console.log("Llamando a la API por primera vez");
    fetch(API)
        .then(function(respuesta){
            console.log("Respuesta original del servidor: ");
            console.log(respuesta);
            return respuesta.json();
        })
        .then(function(data){
            console.log("Datos convertidos a JSON");
            console.log(data);

            // se almacenan los datos
            personajes = data;
            callback(personajes);
        })
        .catch(function(error){
            console.log("Ocurrió un error");
            console.log(error);
        });
}

// Se muestra el listado de personajes
btnListado.addEventListener("click", ()=>{
    obtenerPersonajes(function(lista){
        let html = "<h2>Listado de personajes</h2>";
        lista.forEach(function(personaje){
            html +=`
                <p>
                    ID: ${personaje.id} -
                    Nombre: ${personaje.name} -
                    Especie: ${personaje.species}
                    <br>
                    <img src="${personaje.image}" width="60">
                </p>
            `;
        });

        resultado.innerHTML = html;
    })
})

// Agrupación por especie
btnAgrupar.addEventListener("click",()=>{
    obtenerPersonajes(function(lista){
        let especies = [];
        lista.forEach(function(personaje){
            if(!especies.includes(personaje.species)){
                especies.push(personaje.species);
            }
        });

        let html = "<h2>Agrupado por especie</h2>";

        especies.forEach(function (especie) {
            html += `<h3>${especie}</h3>`;
 
            lista.forEach(function (personaje) {
                if (personaje.species === especie) {
                    html += `<p>- ${personaje.name} (ID: ${personaje.id})</p>`;
                }
            });
        });
 
        resultado.innerHTML = html;
    })
})

// Ver ficha de un personaje
// En este caso es con el id 1
btnFicha.addEventListener("click", function () {
    obtenerPersonajes(function (lista) {
        const personaje = lista.find(function (p) {
            return p.id === 1;
        });
 
        resultado.innerHTML = `
            <h2>Ficha de personaje</h2>
            <p>ID: ${personaje.id}</p>
            <p>Nombre: ${personaje.name}</p>
            <p>Especie: ${personaje.species}</p>
            <img src="${personaje.image}" width="150">
        `;
    });
 
});