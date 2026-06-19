// Clase alumno
class Alumno{
    constructor(nombre, edad, carrera){
        this.nombre = nombre;
        this.edad = edad
        this.carrera = carrera;
    }

    mostrarInfo(){
        console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}, Carrera: ${this.carrera}`);
        console.log("---------------------------------------------------------------------------------------");
    }
}

const alumno = new Alumno("Carlos", 23, "Ingeniería de Software");
alumno.mostrarInfo();
// #########################################################################################################################################################

// Clase banda musical
class BandaMusical{
    constructor(nombre, genero, integrantes, discos){
        this.nombre = nombre;
        this.genero = genero;
        this.integrantes = integrantes;
        this.discos = discos;
    }

    listarDiscos(){
        console.log(`Discos de ${this.nombre}:`);
        if(this.discos.length === 0){
            console.log("No hay discos disponibles.");
        }else{
            // Se recorre el array de los discos mostrando el indice + nombre del disco
            this.discos.forEach((disco, index)=>{
                // Index + 1 para mostrar el numero comenzando desde el 1 en lugar de 0
                console.log(`${index + 1}. ${disco}`);
            })
        }
    }

    mostrarInfo(){
        console.log(`Nombre de la Banda: ${this.nombre}, Genero: ${this.genero}, Integrantes: ${this.integrantes}, Discos: ${this.discos}`);
    }
    
}

const yoasobi = new BandaMusical("Yoasobi", "J-Pop", ["Ikura", "Ayase"], ["The Book", "The Book 2", "The Book 3", "E-Side", "E-Side 2", "E-Side 3", "E-Side 4"]);
yoasobi.mostrarInfo();
yoasobi.listarDiscos();
console.log("---------------------------------------------------------------------------------------");
// #########################################################################################################################################################

// Clase Perro
class Perro{
    constructor(nombre, raza, edad){
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
    }

    ladrar(){
        console.log("Guau Guau");
    }

    mostrarInfo(){
        console.log(`Nombre del perro: ${this.nombre}, Raza: ${this.raza}, Edad: ${this.edad} años`);
    }
}

const maggie = new Perro("Maggie", "Mestizo", 10);
maggie.mostrarInfo();
maggie.ladrar();