"use strict";

import {curseConstructor} from './biblioteca/ejercicio1.js';//Ejercicio1
import { curseInfo } from './biblioteca/ejercicio2.js';//Ejercicio2
import { calcularMedia } from './biblioteca/ejercicio3.js';//Ejercicio3

//--------------------------------- Ejercicio 1 ---------------------------------------------
console.log(`-------------------------- Ejercicio 1 ----------------------------------------`);

console.log(`Aquí estoy creando el objeto vacío.`)
let curse = curseConstructor();
console.log(curse);
//Parece que crea correctamente el objeto con este tipo de constructor.
//Voy a probar a manejar los atributos de este
curse.curseName = "2ºDAW";
curse.addStudent('Álvaro');
curse.addStudent(['Irene','Rubén']);
curse.addStudent(['Juan De Dios','David', 'Juan Carlos']);
curse.year = "2025/2026";
curse.description = "Curso de Desarrollo de Aplicaciones Web";
//Voy a comprobar que todo efectivamente se está inyectando correctamente...
console.log(`Aquí el objeto modificado.`)
console.log(curse);
console.log("El curso " + curse.curseName + " tiene " + curse.students.length + " alumnos.");


//--------------------------------- Ejercicio 2 ---------------------------------------------
console.log(`-------------------------- Ejercicio 2 ----------------------------------------`);

curseInfo(curse);

//--------------------------------- Ejercicio 3 ---------------------------------------------
console.log(`-------------------------- Ejercicio 3 ----------------------------------------`);

let discente = {
    id: 1,
    nombre: 'Álvaro',
    apellidos: 'Carrión Romero',
    aficiones: ['Surf','Skate Surf','Pádel','Snow Board'],
    notas: {
        primera: [8,6,9,6,8,9,6,5],
        segunda: [9,7,8,7,9,9,7,7],
        tercera: [9,8,8,9,9,10,7,10]
    }
}

const notaMedia = calcularMedia(discente); 

console.log(`La nota media de ${discente.nombre} ${discente.apellidos} es ${notaMedia.toFixed(2)}`);


//--------------------------------- Ejercicio 4 ---------------------------------------------
console.log(`-------------------------- Ejercicio 4 ----------------------------------------`);
//En este caso ya había hecho la función "matricular" addStudent() en el objeto directamente, aun así la voy a reutilizar...
curse.matricular = function(persona){
    this.addStudent(persona);
}
curse.matricular(discente);
console.log(curse);
