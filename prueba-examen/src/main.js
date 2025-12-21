"use strict";

import { traerPeliculas } from "./js/peticiones.js";
import { cargarPeliculasLocalStorage,eliminarUsuariosPeliculas, mostrarErrorDataBase, traerUsuarios, eliminarErrores, guardarPeliculas, mostrarErrores, pintarPeliculas, validarFormularioUsuarios, guardarUsuarios , guardarUsuario, pintarUsuarios, cargarUsuariosLocalStorage} from "./js/forms.js";
import { validarFormularioPeliculas, guardarPelicula } from "./js/biblioteca.js";

window.onload = () => {
    if (typeof localStorage === "undefined") {
        document.body.innerHTML = "<p>Tiene que actualizar el navegador, local storage no está disponible...</p>"
        return;
    }

    localStorage.clear();
    const cargarUsuariosDB = async () => {
        try {
            const usuarios = await traerUsuarios('http://localhost:3000/usuarios');
            if (usuarios) {
                guardarUsuarios(usuarios);
            }
        } catch (error) {
            eliminarUsuariosPeliculas();
            mostrarErrorDataBase(error);
        }
    }
    const cargarPeliculasDB = async () => {
        try {
            const peliculas = await traerPeliculas('http://localhost:3000/peliculas');
            if (peliculas) {
                guardarPeliculas(peliculas);
            }
        } catch (error) {
            eliminarUsuariosPeliculas();
            mostrarErrorDataBase(error);
        }

    }
    cargarUsuariosDB();
    cargarPeliculasDB();

    const divMostrarPeliculas = document.getElementsByClassName('mostrar-peliculas')[0];

    divMostrarPeliculas.addEventListener('click', async (evento) => {
        //MostrarPeliculas
        if (evento.target.tagName === 'BUTTON' && evento.target.nextElementSibling.tagName === 'BUTTON') {
            const peliculas = await cargarPeliculasLocalStorage();
            const divParaPintarPeliculas = evento.target.nextElementSibling.nextElementSibling;
            pintarPeliculas(peliculas, divParaPintarPeliculas);
        }

        //Mostrar Usuarios
        if(evento.target.tagName === 'BUTTON' && evento.target.nextElementSibling.tagName === 'DIV'){
            const usuarios = cargarUsuariosLocalStorage();
            const divParaPintarUsuarios = evento.target.nextElementSibling.nextElementSibling;
            pintarUsuarios(usuarios,divParaPintarUsuarios);
        }
    });

    const formularios = document.getElementsByTagName('form');

    //FORMULARIO USUARIOS
    const formularioUsuarios = formularios[0];
    formularioUsuarios.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'BUTTON') {
            evento.preventDefault();
            const errores = validarFormularioUsuarios(formularioUsuarios);

            if (Object.keys(errores).length > 0) {
                eliminarErrores()
                mostrarErrores(errores, formularioUsuarios);
            } else {
                eliminarErrores()

                guardarUsuario(formularioUsuarios);
            }
        }
    })

    const formularioPeliculas = formularios[1];

    formularioPeliculas.addEventListener('click', (evento) => {
        if(evento.target.tagName === 'BUTTON'){
            evento.preventDefault();

            const errores = validarFormularioPeliculas(formularioPeliculas);

            if(Object.keys(errores).length > 0){
                //Hay errores
                eliminarErrores();
                mostrarErrores(errores, formularioPeliculas);
            } else {
                eliminarErrores()

                guardarPelicula(formularioPeliculas);
            }

        }
    })

} //fin del window onload