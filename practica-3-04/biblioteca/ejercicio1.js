"use strict";

//Función que devuelve un array con las palabras en mayúsculas
export const palabrasMayusculas = (...palabras) => {
    return palabras.map((palabra) => {
        return palabra.toUpperCase();
    })
}

//Función que devuelve un array con las palabras ordenadas al revés
export const ordenadasAlReves = (palabras) => {
    return [...palabras].sort().reverse();
}

//Función que convierte un array de palabras a un array de objetos JSON con id y nombre
export const arrayToJSON = (palabras) => {
    return [...palabras].map((palabra, i) => {
        return {
            id: i,
            nombre: palabra
        }
    })
}