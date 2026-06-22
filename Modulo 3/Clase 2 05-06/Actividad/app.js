// Formula
// Área de un Circulo = pi * r^2
// Se le solicita al usuario el diametro
const d = Number(prompt("Ingresa el diámetro del circulo (cm):"));

// Se calcula el radio
const r = d / 2;

// Obtener resultado
const area = Math.PI * Math.pow(r, 2);

// Mostrar resultado
// Resultado en consola
console.log("Área: ", area.toFixed(2), "cm^2");
// Resultado en ventana emergente
alert(`Área: ${area.toFixed(2)} cm^2`);
// Resultado en index
document.getElementById("resultado").innerHTML = `Área: ${area.toFixed(2)} cm^2`;