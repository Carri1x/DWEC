"use strict";

import { crearPlantillaTituloPeliculas, pintarTituloPeliculas } from "./js/biblioteca.js";
import { getAllMovies } from "./js/peticiones.js";



window.onload = () => {
    const contenedorTituloPeliculas = document.getElementById('contenedor-peliculas');
    pintarTituloPeliculas(contenedorTituloPeliculas);

    
} // FIN DEL WINDOW.ONLOAD