"use strict";

export const validarFormularioPeliculas = (formulario) => {
    let errores = {};

    if (!tituloValido(formulario[0].value)){
        errores = {titulo: "El nombre debe ser de 5 carácteres al menos."};
    }
    if(!climaValido(formulario[1].value)){
        errores = {...errores, clima: "El clima debe tener al menos 4 caracteres."};
    }

    return errores;
}

const tituloValido = (titulo) => {
    return /[a-zA-Z]{5}/.test(titulo);
}

const climaValido = (clima) => {
    return /[[a-zA-Z]{4}]/.test(clima);
}

export const guardarPelicula = (formulario) => {
    let pelicula = {
        id: crypto.randomUUID(),
        titulo: formulario[0].value,
        clima: formulario[1].value
    }

    let peliculas = localStorage.getItem('peliculas');

    if(peliculas){
        peliculas = JSON.parse(peliculas);
        peliculas = [...peliculas, pelicula];
        localStorage.setItem('peliculas', JSON.stringify(peliculas));
    } else {
        localStorage.setItem('peliculas', JSON.stringify([pelicula]));
    }
}