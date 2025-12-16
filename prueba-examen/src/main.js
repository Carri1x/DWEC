"use strict";

import { eliminarErrores, guardarPelicula, mostrarErrores, pintarPeliculas, validarFormularioPelicula, getAllPeliculas} from "./js/forms.js";


window.onload = () => {

    const formulario = document.forms[0];

    formulario.addEventListener('click', (evento) => {
        if(evento.target.tagName === 'BUTTON'){
            evento.preventDefault();
            const errores = validarFormularioPelicula(formulario);

            //Si hay errores
            if(Object.keys(errores).length > 0){
                eliminarErrores();
                mostrarErrores(errores);
            } else {
                //Si no hay errores
                eliminarErrores();
                guardarPelicula(formulario);
            }
        }
    });


    let botones = document.getElementsByTagName('button');
    let botonMostrarPeliculas = null;

    for (const boton of botones) {
        if(boton.textContent === 'Mostrar Películas'){
            botonMostrarPeliculas = boton;
        }
    }

    botonMostrarPeliculas.addEventListener('click', (evento) => {
        const contenedorDestino = evento.target.nextElementSibling;
        const peliculas = getAllPeliculas();
        if(peliculas) {
            if(contenedorDestino.hasChildNodes){
                contenedorDestino.innerHTML = ''
            }
            pintarPeliculas(peliculas, contenedorDestino);
        } else {
            contenedorDestino.innerHTML = `<p>No hay peliculas en la base de datos.</p>`
        }
    })

} //FIN DEL WINDOW ON LOAD