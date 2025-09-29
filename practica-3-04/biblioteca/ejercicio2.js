"use strict";

//Función que devuelve un array con 10 números aleatorios entre 0 y 10
export const arrayDiezNumerosAleatorios = () => {
    //Creo un array de 10 posiciones y en cada posición meto un número aleatorio entre 0 y 10
    return Array.from({length: 10}, () => Math.floor(Math.random() * 11));
}

//Función que devuelve un array con los números mayores que un número dado.
export const arrayElementosMayorQue = (array, numero) => {
    //Filtro el array y devuelvo un nuevo array con los números mayores que el número dado.
    return array.filter(element => element > numero);
}