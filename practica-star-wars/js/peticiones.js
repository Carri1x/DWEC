"use strict";

const urlBasica = 'https://swapi.info/api/';

export const getAllMovies = () => {
    return fetch("https://swapi.info/api/films")
    .then((respuesta) => {
        return respuesta.json()
    })
    .then((datos) => {
        return datos;
    })
    .catch((error) => {
        return error;
    })
}