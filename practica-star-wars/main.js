"use strict";

import { pintarTituloPeliculas, pintarPelicula} from "./js/biblioteca.js";



window.onload = () => {
    const contenedorTituloPeliculas = document.getElementById('titulo-peliculas');
    const contenedorDetallePelicula = document.getElementById('detalle-peliculas');
    pintarTituloPeliculas(contenedorTituloPeliculas);

    contenedorTituloPeliculas.addEventListener('click', (evento) => {
        if(evento.target.classList.contains('titulo-pelicula')){
            const idPelicula = parseInt(evento.target.id);
            pintarPelicula(idPelicula, contenedorDetallePelicula); //Pinto la película por id y en el contenedor deseado
        }
    });

} // FIN DEL WINDOW.ONLOAD