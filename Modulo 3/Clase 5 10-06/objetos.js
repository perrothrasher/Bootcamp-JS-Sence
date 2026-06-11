// Objetos
let usuario ={
    nombre: "Camila",
    edad: 25,
    ciudad: "Santiago" 
};

// JSON = JavaScript Object Notation
// DOM = Document Object Model

// console.log(usuario);

let producto={
    nombre: "Mouse",
    precio: 1200,
    stock: 15,
    objeto:{},
    arreglos: []
};

// Obtener información del objeto
// console.log(producto.nombre);
// console.log(producto.precio);
// console.log(producto.stock);
// console.log(producto["nombre"]);

// Creación de un objeto
let objeto2={
    propiedad1: "Prueba",
    propiedad2: function(){
        console.log("Hola Mundo");
    },
};

// console.log(objeto2.propiedad1);
// objeto2.propiedad2(); // Con esto invocamos la función dentro del objeto

// console.log(usuario);
usuario.curso = "JavaScript";
// console.log(usuario);

usuario.ciudad = "Coquimbo";
// console.log(usuario);

usuario["edad"] = 27;
// console.log(usuario);


let propiedadBuscada = "ciudad";
// console.log(usuario[propiedadBuscada]);


// Object.create
let persona={
    saludar(){
        console.log("Hola");
    }
}

// console.log(persona);

let estudiante = Object.create(persona);

estudiante.nombre = "Pepito";
// console.log(persona);
// console.log(estudiante);
// persona.saludar();
// estudiante.saludar();



// Object.keys
const trabajo={
    cargo: "Programador",
    tipo: "Por hora",
    jornada: "Lunes a Viernes",
    detalles(){
        console.log(`El cargo de ${this.cargo} se trabaja ${this.tipo} de ${this.jornada}`)
    },
};

console.log(Object.keys(trabajo));

// Object.values
console.log(Object.values(trabajo));

// Object.entries
console.log(Object.entries(trabajo));