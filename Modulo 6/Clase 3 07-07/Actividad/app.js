/*Nota
1. Profesor yo utilizo pnpm en lugar de npm para ahorrar espacio, evitar conflictos entre dependencias y mayor velocidad
2. Ya tengo creado el archivo .gitignore y tengo incluida la carpeta node_modules
3. Eliminé la carpeta node_modules y volvi a instalarla con pnpm i
*/
import chalk from "chalk";
import dayjs from "dayjs";

// Obtener la fecha y hora actual utilizando dayjs
const fechaActual = dayjs().format("DD/MM/YYYY HH:mm:ss");

console.log(chalk.green("Bienvenido a la actividad de Node.js"));
console.log(chalk.yellow(`La fecha y hora actual es: ${fechaActual}`));