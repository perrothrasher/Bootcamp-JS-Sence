// Objetos

// Estructura de datos mutable/compleja
let persona={
    nombre: "Juan",
    edad: 30,
    curso: "FullStack JavaScript",
};
console.log(persona);

// Acceder a las propiedades del objeto
// 1. Dot notation/Notación de punto
console.log(persona.nombre);

// 2. Bracket notation/Notación de corchetes (Util si...)
// - Cuando el nombre de la propiedad es dinámico
// - Cuando el nombre de la propiedad no es un identificador válido (por ejemplo, contiene espacios o caracteres especiales)
// - Cuando el nombre de la propiedad es una palabra reservada
console.log(persona["edad"]);