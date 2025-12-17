"use strict";

import { traerDatos } from "./traerDatos.js";

export const guardarPeliculas = (peliculas) => {
    let peliculasDB = localStorage.getItem('peliculas');
    if (peliculasDB) {
        peliculasDB = JSON.parse(peliculasDB);
        peliculasDB = [...peliculasDB, ...peliculas];
        localStorage.setItem('peliculas', JSON.stringify(peliculasDB))
    } else {
        localStorage.setItem('peliculas', JSON.stringify(peliculas));
    }
}

export const guardarPelicula = (pelicula) => {
    let peliculasDB = localStorage.getItem('peliculas');
    if (peliculasDB) {
        peliculasDB = JSON.parse(peliculasDB);
        peliculasDB = [...peliculasDB, pelicula];
        localStorage.setItem('peliculas', JSON.stringify(peliculasDB))

    } else {
        localStorage.setItem('peliculas', JSON.stringify([pelicula]))
    }
}

export const pintarPeliculas = (peliculas, contenedorDestino) => {
    let plantilla = '';

    for (const pelicula of peliculas) {
        plantilla += `
            <div id="${pelicula.id}">
               Título: ${pelicula.titulo} -> año: ${pelicula.año}
            </div>
        `;
    }

    contenedorDestino.innerHTML += plantilla;
}

export const cargarPeliculasLocalStorage = async () => {
    let peliculas = await localStorage.getItem('peliculas');
    if (peliculas) {
        return JSON.parse(peliculas);
    }
}

export const validarFormularioUsuarios = (formulario) => {
    let errores = {};

    if (!nombreValido(formulario[0].value)) {
        errores = { nombre: 'El nombre debe tener almenos 4 caracteres' };
    }

    return errores;
}

const nombreValido = (nombre) => {
    return /[a-zA-Z]{4}/.test(nombre);
}

export const mostrarErrores = (errores, formulario) => {
    let plantilla = `
        <div class="mensaje-error">${errores.nombre}</div>
    `;

    formulario[0].insertAdjacentHTML('afterend', plantilla)
}

export const eliminarErrores = () => {
    let errores = document.querySelectorAll('.mensaje-error');
    for (const error of errores) {
        error.remove();
    }
}

export const traerUsuarios = async (url) => {
    try {
        const usuarios = await traerDatos(url);
        if (usuarios) {
            return usuarios;
        }
    } catch(error) {
        throw error;
    }
}

export const guardarUsuarios = (usuarios) => {

    let usuariosDB = localStorage.getItem('usuarios');

    if(usuariosDB){
        usuariosDB = JSON.parse(usuariosDB);
        usuariosDB = [...usuariosDB, ...usuarios];
        localStorage.setItem('usuarios', JSON.stringify(usuariosDB));
    } else {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

export const guardarUsuario = (formulario) => {
    let usuarios = localStorage.getItem('usuarios');
    let usuario = {
        id: crypto.randomUUID(),
        nombre: formulario[0].value
    }
    if(usuarios){
        usuarios = JSON.parse(usuarios);
        usuarios = [...usuarios, usuario];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } else {
        localStorage.setItem('usuarios',JSON.stringify([usuario]));
    }
    console.log(usuario)
}

export const mostrarErrorDataBase = (error) => {
    const divParaPintarPeliculas = document.getElementsByClassName('mostrar-peliculas')[0].lastElementChild;

    divParaPintarPeliculas.innerHTML += `<div class="mensaje-error-data-base"> ${error.message} </div>`;
}

export const eliminarUsuariosPeliculas = () => {
    let divParaPintarPeliculas = document.querySelector('.mostrar-peliculas');
    divParaPintarPeliculas = divParaPintarPeliculas.lastElementChild;
    
    divParaPintarPeliculas.innerHTML = '';
}

export const cargarUsuariosLocalStorage =  () => {
    const usuarios = localStorage.getItem('usuarios');
    if(usuarios){
        return JSON.parse(usuarios);
    }
}

export const pintarUsuarios = (usuarios, contenedorDestino) =>{
    let plantilla = '';

    for (const usuario of usuarios) {
        plantilla += `
            <div id="${usuario.id}">
                ${usuario.nombre}
            </div>
        `
    }

    contenedorDestino.innerHTML = plantilla;
}