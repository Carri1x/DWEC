"use strict";

import { 
    validarFormulario,
    mandarMensajeDeError,
    quitarMensajesDeError,
    avisarSobreLocalStorage,
    crearDisco,
    pintarDiscos
} from "./js/forms.js";

window.onload = () => {

    document.getElementsByTagName('form')[0].addEventListener('click', (evento) => {
        
        if(typeof localStorage === 'undefined') {
            avisarSobreLocalStorage();
            return; //El navegador no soporta localStorage salimos del evento.
        }
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
        console.log(discos)
        if(discos === null){ // Si no hay discos insertamos el primero.
            localStorage.setItem('discos', JSON.stringify([nuevoDisco])); // Metemos el nuevo disco hecho un string.
            return; //Salimos de la funión porque ya hemos hecho todo lo que queríamos.
        } else {
                // Si existe dentro de LocalStorage el objeto discos, lo recuperamos y añadimos el nuevo disco.
            discos = JSON.parse(discos); // Parseamos el string de discos a JSON.
            discos = [...discos, nuevoDisco] //Añadimos el nuevo disco.
            localStorage.setItem('discos', JSON.stringify(discos)); //Lo volvemos a insertar en la base de datos en formato string.
        }
        
    });


    document.getElementsByTagName('header').addEventListener('click', (evento) => {
        if(typeof localStorage === 'undefined') {
            avisarSobreLocalStorage();
            return; //El navegador no soporta localStorage salimos del evento.
        }
        if(evento.target.tagName === 'BUTTON'){
            const discos = localStorage.getItem('discos');
            pintarDiscos(JSON.parse(discos));
        }
    });


} // FIN DEL WINDOW.ONLOAD