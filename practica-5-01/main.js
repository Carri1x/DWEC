"use strict";
import { repetirSaludo } from "./biblioteca/ejericio1.js";

window.onload = () => {
    //Recogo los botones.
    let comenzarSaludos = document.getElementById('boton-comenzar-saludos');
    let pararSaludos = document.getElementById('boton-parar-saludos');
    //Declaro la variable donde se va a ubicar la referencia del intervalo.
    let elSaludo = 0;
    comenzarSaludos.addEventListener('click',() => {
        //Cuando se haga click en el botón se iniciaria el intervalo.
        elSaludo = repetirSaludo();
    });
    pararSaludos.addEventListener('click', () => {
        //Cuando se haga click en el botón se parará el intervalo.
        clearInterval(elSaludo);
    });

    
};//CIERRE DE WINDOW.ONLOAD
