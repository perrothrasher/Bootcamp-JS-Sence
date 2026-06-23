const API = "https://jsonplaceholder.typicode.com/users"

class gestorUsuarios{
    constructor(){
        this.usuarios = [];

        const xhr = new XMLHttpRequest();

        xhr.open("GET", API, true);

        xhr.onload = () =>{
            if(xhr.status === 200){
                this.usuarios = JSON.parse(xhr.responseText);
                console.log("Usuarios cargados correctamente por XMLHttpRequest");
            }else{
                console.error(`Error en la petición HTTP. Estado: ${xhr.status}`);
            }
        }
        xhr.onerror = () =>{

        console.error("Error de red"); 
        };
        xhr.send();
    };

    // Buscar por nombre
    buscarPorNombre(nombreBuscado){
        const usuarioEncontrado = this.usuarios.find(function(usuario){
            return usuario.name.toLowerCase() === nombreBuscado.toLowerCase();
        });

        return usuarioEncontrado;
    }

    // Listar usuarios
    listarNombres(){
        console.log("Listado de nombres:");
        this.usuarios.forEach(function(usuario){
            console.log(usuario.name);
        })
    }

    // Buscar información basica
    buscarInformacionBasica(){
        const nombre = prompt("Ingrese el nombre del usuario");
        const usuario = this.buscarPorNombre(nombre);

        if(!usuario){
            console.log("No se encontró el usuario");
            return;
        }

        console.log(`Información basica de: ${usuario.name}`);
        console.log(`Username: ${usuario.username}`);
        console.log(`Correo: ${usuario.email}`);
    }

    // Buscar dirección
    buscarDireccion(){
        const nombre = prompt("Ingrese el nombre del usuario");
        const usuario = this.buscarPorNombre(nombre);

        if(!usuario){
            console.log("No se encontró el usuario");
            return;
        }
        
        console.log(`Dirección del usuario ${usuario.name}`);
        console.log(`Calle: ${usuario.address.street}`);
        console.log(`Suite: ${usuario.address.suite}`);
        console.log(`Ciudad: ${usuario.address.city}`);
        console.log(`Postal: ${usuario.address.zipcode}`);
        console.log(`Latitud: ${usuario.address.geo.lat}`);
        console.log(`Longitud: ${usuario.address.geo.lng}`);
    }

    // Información avanzada
    buscarInformacionAvanzada(){
        const nombre = prompt("Ingrese el nombre del usuario");
        const usuario = this.buscarPorNombre(nombre);

        if(!usuario){
            console.log("No se encontró el usuario");
            return;
        }

        console.log(`Información Avanzada de: ${usuario.name}`);
        console.log(`Telefono: ${usuario.phone}`);
        console.log(`Sitio Web: ${usuario.website}`);
        console.log("Compañia");
        console.log(`Nombre: ${usuario.company.name}`);
        console.log(`Frase de impacto: ${usuario.company.catchPhrase}`);
        console.log(`Bs: ${usuario.company.bs}`);
    }

    // Listar compañias
    listarCompañias(){
        console.log("Listado de Compañias");

        this.usuarios.forEach(function(usuario){
            console.log(usuario.company.name);
        })
    }

    // Listar Nombres ordenados alfabeticamente
    listarUsuariosOrdenados(){
        const nombres = this.usuarios.map(function(usuario){
            return usuario.name;
        });

        // Ordenar alfabeticamente
        nombres.sort();

        console.log("Nombres ordenados alfabeticamente");
        nombres.forEach(function(nombre){
            console.log(nombre);
        });
    }
}

const gestor = new gestorUsuarios();

// Conexión de botones
const btnListarNombres = document.getElementById("btn-listar-nombres");
const btnInformacionBasica = document.getElementById("btn-informacion-basica");
const btnDireccion = document.getElementById("btn-direccion");
const btnInformacionAvanzada = document.getElementById("btn-informacion-avanzada");
const btnListarCompañias = document.getElementById("btn-listar-compañias");
const btnListarAlfabeticamente = document.getElementById("btn-listar-alfabeticamente");


// Acciones
// Listar nombres
btnListarNombres.addEventListener("click", function(){
    gestor.listarNombres();
});

// Información basica
btnInformacionBasica.addEventListener("click", function(){
    gestor.buscarInformacionBasica();
});

// Direccion
btnDireccion.addEventListener("click", function(){
    gestor.buscarDireccion();
});

// Información avanzada
btnInformacionAvanzada.addEventListener("click", function(){
    gestor.buscarInformacionAvanzada();
});

// Listar compañias
btnListarCompañias.addEventListener("click", function(){
    gestor.listarCompañias();
});

// Alfabeticamente
btnListarAlfabeticamente.addEventListener("click", function(){
    gestor.listarUsuariosOrdenados();
})