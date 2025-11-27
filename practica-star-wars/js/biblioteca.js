"use strict";

import { getAllMovies } from "./peticiones.js";


export const crearPlantillaTituloPeliculas = (peliculas) => {
    let plantilla = '';

    for (const pelicula of peliculas) {
        plantilla += `
            <div id="${pelicula.episode_id}" class="contenedor-titulo-pelicula">
                <h3 class="titulo-pelicula">${pelicula.title}</h3>
            </div>
        `;
    }

    return plantilla;
}

export const pintarTituloPeliculas = async (contenedorDestino) => {
    let plantilla = '';
    try {
        const peliculas = await getAllMovies();
        plantilla = crearPlantillaTituloPeliculas(peliculas);
    } catch (error){
        console.log("Estamos en el error de pintar titulo peliculas")
        return '';
    }
    contenedorDestino.innerHTML = plantilla;
}