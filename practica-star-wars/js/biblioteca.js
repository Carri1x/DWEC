"use strict";

import { getAllMovies, getMovieById } from "./peticiones.js";

export const pintarTituloPeliculas = async (contenedorDestino) => {
    //Mientras espera la respuesta puede poner un cargando...
    contenedorDestino.innerHTML = '<img src="./assets/cargando.gif" class="cargando alt="Cargando datos"/>';

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

const crearPlantillaTituloPeliculas = (peliculas) => {
    let plantilla = '';

    for (const pelicula of peliculas) {
        plantilla += `
            <div id="${pelicula.episode_id}" class="titulo-pelicula">
                ${pelicula.title} 
            </div>
        `;
    }

    return plantilla;
}

export const pintarPelicula = async (idPelicula, contenedorDestino) => {  
    //Mientras espera la respuesta puede poner un cargando...
    //No se si hay mejor forma de hacerlo, porque deja mucho que desear, se ve mucho y no es algo que esté muy allá
    contenedorDestino.innerHTML = '<img src="./assets/cargando.gif" class="cargando" alt="Cargando datos"/>';

    let plantilla = '';
    try{
        const pelicula = await getMovieById(idPelicula);
        console.log(pelicula)
        plantilla = crearPlantillaPelicula(pelicula);
    }catch (error){
        console.log("Error en el pintar pelicula entera")
    }
    contenedorDestino.innerHTML = plantilla;
}

const crearPlantillaPelicula = (pelicula) => {
    return `
        <div class="pelicula">
            <h1>${pelicula.title}</h1>
            <div class="sinopsis">
                <h4>Sinópsis:</h4>
                <p>${pelicula.opening_crawl}</p>
            </div>
        </div>
    `;
}