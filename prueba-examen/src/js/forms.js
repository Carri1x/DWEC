"use strict";

import { traerDatos } from "./traerDatos.js";

export const validarFormularioPelicula = (formulario) => {
    const tituloPelicula = formulario.firstElementChild.nextElementSibling;
    const añoPelicula  = tituloPelicula.nextElementSibling.nextElementSibling;
    let errores = {}
    if(!tituloPeliculaValido(tituloPelicula.value)){
        errores = {...errores, tituloPelicula: "El título de la peli debe ser de almenos 5 caracteres"}
    }
    if(!añoPeliculaValido(añoPelicula.value)){
        errores = {...errores, añoPelicula: "El año de la película debe ser de almenos 4 caracteres"}
    }
    return errores;
}

const tituloPeliculaValido = (tituloPelicula) => {
    return /[a-zA-Z]{5}/.test(tituloPelicula);
}

const añoPeliculaValido = (añoPelicula) => {
    return /[0-9]{4}/.test(añoPelicula);
}

export const mostrarErrores = (errores) =>{

    let plantilla = '';

    for (const clave in errores) {
        if (!Object.hasOwn(errores, clave)) continue;
        
        const valor = errores[clave];
        
        plantilla += `
        <div class="mensaje-error">
            ${valor}
        </div>
    `
    }

    document.forms[0].innerHTML += plantilla;
}

export const eliminarErrores = () => {
    let errores = document.querySelectorAll('.mensaje-error');
    if(!errores) return;
    for (const error of errores) {
        error.remove();
    }
}

export const guardarPelicula = (formulario) => {
    const pelicula = {
        tituloPelicula: formulario[0].value,
        añoPelicula: formulario[1].value
    }

    let peliculas = localStorage.getItem('peliculas');
    if(peliculas) {
        peliculas = JSON.parse(peliculas);
        peliculas = [...peliculas, pelicula];
        localStorage.setItem('peliculas', JSON.stringify(peliculas));
    } else {
        localStorage.setItem('peliculas', JSON.stringify([pelicula]));
    }
}

export const pintarPeliculas = (peliculas, contenedorDestino) => {
    let plantilla = '';

    for (const pelicula of peliculas) {
        plantilla += `
        
            <div class="pelicula-card">
                <p>${pelicula.tituloPelicula}</p>
                <p>${pelicula.añoPelicula}</p>
            </div>
        `
    }

    contenedorDestino.innerHTML += plantilla;
}

export const getAllPeliculas = () => {
    let peliculas = localStorage.getItem('peliculas');
    if(peliculas){
        peliculas = JSON.parse(peliculas);
    }
    const pelisDB = getPeliculasDB()
    peliculas = [...peliculas, pelisDB];
    return peliculas;
}

const getPeliculasDB = async () => {
    const peliculas = await traerDatos('http://localhost:3000/peliculas');
    return peliculas;
}

