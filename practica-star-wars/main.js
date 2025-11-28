"use strict";

import { pintarTituloPeliculas, pintarPelicula} from "./js/biblioteca.js";



window.onload = () => {
    const contenedorTituloPeliculas = document.getElementById('titulo-peliculas');
    const contenedorDetallePelicula = document.getElementById('detalle-peliculas');
    //Pintamos todos los títulos de las películas de la base de datos.
    pintarTituloPeliculas(contenedorTituloPeliculas);

    /**
     * Cuando se clica el nombre de la película.
     * Se pintan los detalles de la película en el DOM. 
     */
    contenedorTituloPeliculas.addEventListener('click', (evento) => {
        if(evento.target.classList.contains('titulo-pelicula')){
            //Recogemos el id del div que contiene el título de la película que es el id (BD) de esta.
            const idPelicula = parseInt(evento.target.id);
            //Pintamos la película y las características de esta.
            pintarPelicula(idPelicula, contenedorDetallePelicula); //Pinto la película por id y en el contenedor deseado
        }
    });

} // FIN DEL WINDOW.ONLOAD