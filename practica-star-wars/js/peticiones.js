"use strict";

const urlBasica = 'https://swapi.info/api/';

export const getAllMovies = () => {
    return fetch(`${urlBasica}films`)
            .then((respuesta) => {
                return respuesta.json();
            })
            .then((datos) => {
                return datos;
            })
            .catch((error) => {
                return error;
            })
}

export const getMovieById = (id) => {
    // Aquí estaba recogiendo la película de esta forma pensando que lo hacía por id (${urlBasica}/films/${id}) pero no,
    //  es por posición que está en el array no por el id de la pelicula, vamos un timo :(
    id = parseInt(id);
    return fetch(`${urlBasica}/films`)
            .then((respuesta) => {
                return respuesta.json();
            })
            .then((datos) => {
                return datos.find((pelicula) => {
                    return pelicula.episode_id === id;
                });
            })
            .catch((error) => {
                return error;
            })
}