"use strict";

/**
 * Voy a partir estas prácticas en el main, separándolo por ejercicios.
 */

//Ejercicio 1
function sumar(){
    let acumulador = 0;
    if(arguments.length < 2) return 'Debe haber al menos 2 números para sumar...';
    for (const num of arguments) {
        if(isNaN(num)) return `Lo siento socio esto : ${num} no es un número.`;
        acumulador += num;
    }
    return acumulador;
}

console.log(sumar(1,2,3,"holaaaaa"));
console.log(sumar(1,2,3,43,54,434,3,2));
console.log(sumar(1));

//Ejercicio 2

const tablas = (num, funcion) => {
    for (let i = 0; i < num; i++) {
        funcion.apply(i);
    }
}

const multiplicar = (num) => {
    console.log()
}