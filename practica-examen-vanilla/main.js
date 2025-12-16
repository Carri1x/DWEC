"use strict";
import {
    validarFormulario,
    mostrarErrores,
    borrarErrores,
    avisarLocalStorage,
    guardarDisco,
    getAllDiscos,
    pintarDiscos,
    traerPeliculas,
    pintarPeliculas,
    traerPersonajes,
    pintarPelicula,
    crearPlantillaPersonajes
} from "./js/forms.js";

window.onload = () => {

    avisarLocalStorage();
    const formulario = document.forms[0];

    const guardarDiscoLocalStorage = async (form) => {
        await guardarDisco(form);
    }

    formulario.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'BUTTON') {
            evento.preventDefault();
            let errores = validarFormulario(formulario);
            if (Object.keys(errores).length > 0) {
                borrarErrores();
                mostrarErrores(errores);
                errores = {};
                return;
            }
            //SI NO HAY ERRORES....
            borrarErrores(); //Por si antes los tenía previamente...
            //Guardamos el disco
            guardarDiscoLocalStorage(formulario);

            formulario.reset();

        } //FIN DEL EVENTO VALIDAR Y GUARDAR EN LA BASE DE DATOS
    });


    const divMostrarDiscos = formulario.nextElementSibling;

    divMostrarDiscos.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'BUTTON') {
            const discos = getAllDiscos();

            if (Object.keys(discos).length < 0) {
                divMostrarDiscos.innerHTML += `<p>No hay discos guardados en la base de datos.</p>`
                return;
            }

            pintarDiscos(discos, divMostrarDiscos);


        }
    })
    const divs = document.getElementsByTagName('div');
    const divMostrarPlanetas = divs[divs.length - 1];
    const cargarPeliculas = async (contenedorDestino) => {
                try {
                    const peliculas = await traerPeliculas();
                    /*
                    Aquí sería solo para pintar las películas
                    if (peliculas) {
                        pintarPeliculas(peliculas, contenedorDestino);
                    }
                        PERO VAMOS A PINTAR TAMBIEN LOS NOMBRES DE SUS PERSONAJES.    
                    */
                    for (const pelicula of peliculas) {
                        const personajes = await traerPersonajes(pelicula);
                        const plantillaPersonajes = crearPlantillaPersonajes(personajes);
                        pintarPelicula(pelicula, plantillaPersonajes, contenedorDestino)
                    }
                }catch (error) {
                    console.log(error);
                }
                
            }

    divMostrarPlanetas.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'BUTTON') {
            cargarPeliculas(divMostrarPlanetas);
        }
    })
} //FIN DEL WINDOW ONLOAD