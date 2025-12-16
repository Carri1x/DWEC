"use strict";

import { traerDatos } from "./traerDatos.js";

export const validarFormulario = (formulario) => {
    let errores = {};

    if (!nombreValido(formulario.nombre.value)) {
        errores = { nombre: "El nombre no es válido" };
    }
    if (!caratulaValida(formulario.caratula.value)) {
        errores = { ...errores, caratula: "La carátula no es válida" }
    }
    if (!grupoInterpreteValido(formulario.grupoInterprete.value)) {
        errores = { ...errores, grupoInterprete: "El grupoInterprete no es válido" }
    }
    if (!añoValido(formulario.año.value)) {
        errores = { ...errores, año: "El año no es válido." }
    }
    if (!localizacionValida(formulario.localizacion.value)) {
        errores = { ...errores, localizacion: "La localización no es válida." }
    }

    return errores;
}
const nombreValido = (nombre) => {
    return /[a-zA-Z]{4}/.test(nombre);
}
const caratulaValida = (caratula) => {
    return /[a-zA-Z]{4}/.test(caratula);
}
const grupoInterpreteValido = (grupoInterprete) => {
    return /[a-zA-Z]{4}/.test(grupoInterprete);
}
const añoValido = (año) => {
    return /[0-9]{4}/.test(parseInt(año));
}
const localizacionValida = (localizacion) => {
    return /[a-zA-Z]{4}/.test(localizacion);
}

export const mostrarErrores = (errores) => {
    let plantilla = '';

    for (const nombreError in errores) {
        if (!Object.hasOwn(errores, nombreError)) continue;

        const mensajeError = errores[nombreError];

        plantilla += `
            <div class="mensaje-error">
                ${mensajeError}
            </div>
        `
    }

    document.forms[0].insertAdjacentHTML('afterend', plantilla);
}

export const borrarErrores = () => {
    const errores = document.querySelectorAll('.mensaje-error');

    for (const error of errores) {
        error.remove();
    }
}

export const avisarLocalStorage = () => {
    if (typeof localStorage === 'undefined') {
        document.body.innerHTML = `<p>Lo siento debe actualizar el navegador para que soporte local storage</p>`;
    }
}

export const guardarDisco = async (formulario) => {
    let disco = {
        nombre: formulario[0].value,
        caratula: formulario[1].value,
        grupoInterprete: formulario[2].value,
        año: formulario[3].value,
        genero: formulario[4].value,
        localizacion: formulario[5].value,
        prestado: formulario[6].checked
    }

    let discos = await localStorage.getItem('discos');

    if (discos) {
        discos = JSON.parse(discos);
        discos = [...discos, disco];
        await localStorage.setItem('discos', JSON.stringify(discos));
    } else {
        await localStorage.setItem('discos', JSON.stringify([disco]));
    }
}

export const getAllDiscos = () => {
    let discos = localStorage.getItem('discos');
    return JSON.parse(discos);
}

export const pintarDiscos = (discos, contenedorDestino) => {
    let plantilla = '';

    for (const disco of discos) {
        plantilla += `
            <div class="disco-card">
                <h2>${disco.nombre}</h2>
                <p>${disco.caratula}</p>
                <p>${disco.grupoInterprete}</p>
                <p>${disco.año}</p>
                <p>${disco.genero}</p>
                <p>${disco.localizacion}</p>
                <p>${disco.prestado ? 'Prestado' : 'No prestado'}</p>
            </div>
        `
    }

    contenedorDestino.innerHTML += plantilla;
}

/*********************************************
 * QUE VAMOS A HACER MAÑANA??????
 * 
 * VAMOS A COMPROBAR PRIMERO QUE SE ESTÁN METIENDO BIEN LOS DISCOS. A TRAVÉS DE UN MOSTRAR DISCOS
 * 
 * LUEGO VAMOS A PROBAR QUE SE PUEDE HACER UN ASYNC Y AWAIT EN GUARDARDISCO!!!!!!!!!!
 * 
 */
const urlSwapiPy4e = "https://swapi.py4e.com/api/films/";
const urlSwapiInfo = "https://swapi.info/api/films/";

export const traerPeliculas = async () => {
    const urls = [urlSwapiInfo, urlSwapiPy4e];
    try {
        let peticiones = urls.map((url) => {
            return traerDatos(url);
        });

        const peliculas = await Promise.any(peticiones);

        if (Object.keys(peliculas).length > 0) {
            return peliculas;
        }
    } catch (error) {
        throw error;
    }
}

export const pintarPeliculas = (peliculas, contenedorDestino) => {
    let plantilla = '';

    for (const pelicula of peliculas) {
        plantilla += `
            <div>
                <h3>${pelicula.title}</h3>
                <p>${pelicula.director}</p>
                <p>${pelicula.characters}</p>
            </div>
        `;
    }

    contenedorDestino.innerHTML += plantilla;
}

export const traerPersonajes = async (pelicula) => {
    const urlsPersonajes = pelicula.characters;
    const peticiones = urlsPersonajes.map((url) => {
        return traerDatos(url);
    });

    const personajes = await Promise.allSettled(peticiones);
    
    return personajes;
}
export const crearPlantillaPersonajes = (personajes) => {
    let plantilla = '';
    for (const personaje of personajes) {
        plantilla += `<p>Personaje: ${personaje.value.name}</p>`

    }
    return plantilla;
}

export const pintarPelicula = (pelicula, plantillaPersonajes, contenedorDestino) => {
    let plantilla = '';

    plantilla += `
            <div>
                <h3>${pelicula.title}</h3>
                <p>${pelicula.director}</p>
                ${plantillaPersonajes}
            </div>
        `;

    contenedorDestino.innerHTML += plantilla; 
}