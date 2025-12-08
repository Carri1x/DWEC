"use strict";

export const traerDatos = (url) => {
    return fetch(url)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((datos) => {
            return datos;
        })
        .catch((error) => {
            return `Se ha producido un error ${error.message}`;
        })
}