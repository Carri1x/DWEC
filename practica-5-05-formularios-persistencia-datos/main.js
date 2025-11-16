"use strict";

import { 
    validarFormulario,
    mandarMensajeDeError,
    quitarMensajesDeError,
    comprobarCompatibilidadLocalStorage,
    crearDisco,
    pintarDiscos,
    limpiarFormulario,
    removeDiscoByLocalizacion,
    filtrarDiscosPorNombre
} from "./js/forms.js";

window.onload = () => {

    // FUNCIÓN VALIDAR EL FORMULARIO E INSERTAR DISCO EN LOCAL STORAGE
    document.getElementsByTagName('form')[0].addEventListener('click', (evento) => {
        
        comprobarCompatibilidadLocalStorage(); //Comprobamos si el navegador es compatible con local storage.

        if(evento.target.tagName !== 'BUTTON') return; //Si no es un boton sale.
        evento.preventDefault();

        const form = document.forms.formDiscos;

        const errores = validarFormulario(form); //Devuelve un JSON con los errores que han surgido, si no los hay devuelve false.

        if(errores){
            quitarMensajesDeError(); //Si los hay los quita, si no, no hace nada.
            for (const clave in errores) { //Es un JSON por lo que por cada error mandamos un mensaje.
                if (!Object.hasOwn(errores, clave)) continue;
                const valor = errores[clave];
                mandarMensajeDeError(clave, valor, form); //Mandamos un mensaje de error en cada casilla que haya error.
            }
            return;

        } else {
            quitarMensajesDeError();
        }
        //Creamos el nuevo disco. 
        const nuevoDisco = crearDisco(form);
        let discos = localStorage.getItem('discos');
        if(discos === null){ // Si no hay discos insertamos el primero.
            localStorage.setItem('discos', JSON.stringify([nuevoDisco])); // Metemos el nuevo disco hecho un string.
        } else {
                // Si existe dentro de LocalStorage el objeto discos, lo recuperamos y añadimos el nuevo disco.
            discos = JSON.parse(discos); // Parseamos el string de discos a JSON.
            discos = [...discos, nuevoDisco] //Añadimos el nuevo disco.
            localStorage.setItem('discos', JSON.stringify(discos)); //Lo volvemos a insertar en la base de datos en formato string.
        }
        
        limpiarFormulario(form);
    });

    // MOSTRAR Y FILTRAR DISCOS
    document.getElementsByTagName('section')[0].addEventListener('click', (evento) => {
        comprobarCompatibilidadLocalStorage(); //Comprobamos si el navegador es compatible con local storage.

        //FILTRAR DISCOS
        if(evento.target.parentElement.classList.contains('contenedor-filtro')){
            console.log('entra en el if')
            const nombreAFiltrar = evento.target.previousElementSibling.value; //Cojemos el valor del input para filtrar.

            const discosFiltrados = filtrarDiscosPorNombre(nombreAFiltrar);

            pintarDiscos(discosFiltrados);

            return; //Salimos. Ya que el siguiente if se cumple porque es un botón.
        }


        // MOSTRAR DISCOS
        if(evento.target.tagName === 'BUTTON'){
            const discos = localStorage.getItem('discos');

            const discosRenderizados = pintarDiscos(JSON.parse(discos));
            document.body.appendChild(discosRenderizados);
        }
    });

    // BORRAR DISCO DE LA BASE DE DATOS
    document.getElementsByTagName('aside')[0].addEventListener('click', (evento) => {
        comprobarCompatibilidadLocalStorage(); //Comprobamos si el navegador es compatible con local storage.

        const boton = evento.target.closest('button'); // Comprueba si hacia arriba hay algún elemento button.
        if (!boton) return; // No se ha hecho clic en ningún botón.

        if(confirm(`Seguro que desea eliminar el disco: ${boton.parentElement.firstElementChild.textContent}`)){
            // ¿Por qué lo hago por localización? Porque considero que la localización es única.
            const localizacion = boton.previousElementSibling;
        
            removeDiscoByLocalizacion(localizacion);

            // Eliminamos el disco del DOM
            boton.parentElement.remove();
        }
        
    });



} // FIN DEL WINDOW.ONLOAD