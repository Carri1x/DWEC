"use strict";

import { traerDatos } from "./traerDatos.js";

const urlSwapiPy4e = "https://swapi.py4e.com/api/films/";
const urlSwapiInfo = "https://swapi.info/api/films";
const urlSwapiDev = "https://swapi.dev/api/films/";

export const fetchPeliculas = async () => {
    const urls = [urlSwapiDev, urlSwapiInfo, urlSwapiPy4e];
    const peticiones = urls.map((url) => {
        return traerDatos(url);
    });

    const datosPeliculas = await Promise.any(peticiones);

    //Si ha conseguido llegar antes la petición que trae los datos de la peli en un objeto results, devolvemos los datos (peliculas) de dentro.
    if(datosPeliculas.results){
        return datosPeliculas.results;
    } else {
        return datosPeliculas;
    }
}

/*export const fetchDiscentes = async (urls) => {
    console.log(urls)
    const peticiones = urls.map((url) => {
        return traerDatos(url);
    });

    let datosDiscentes = await Promise.allSettled(peticiones);
    
    datosDiscentes = datosDiscentes.filter((discente) => {
        return discente.status === 'fulfilled';
    })

    if(datosDiscentes.results){
        return datosDiscentes.results;
    } else {
        return datosDiscentes;
    }
}*/

export const fetchDiscentes = async (urls) => {
    const peticiones = urls.map((url) => traerDatos(url));

    const resultados = await Promise.allSettled(peticiones);

    return resultados
        .filter(r => r.status === "fulfilled")
        .map(r => r.value);
};
