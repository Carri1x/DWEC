"use strict";
import { funcionalidadAcordeon } from "./biblioteca/Ejercicio1.js";
import { funcionalidadPestaniasConContendio } from "./biblioteca/Ejercicio2.js";

/*
    Voy a probar a partir de ahora a hacer los comentarios como está en el fichero de cada ejercicio, creo que es más legible, de la otra forma
    se mezclaba todo en un bloque inmenso y no me terminaba de gustar... 
    Parece que así es más legibre, comentame algo sobre esta reflexión.
*/

window.onload = () => {
    
    //----------------------------------------------------------------------- Ejerciciof 1: Acordeón -----------------------------------------------------------------------
    let acordeon = document.getElementById('acordeon'); //Extraigo la referencia del DIV acordeon.
    
    acordeon.addEventListener('click', (event) => {
        funcionalidadAcordeon(event);
    });


    //----------------------------------------------------------------------- Ejerciciof 2: Pestañas -----------------------------------------------------------------------

    let tabs = document.getElementsByClassName('tab') //Lo hago de esta forma como dijiste así es reutilizable el "elemento" con clase "tab", básicamente he querido enfocarlo en que se combierta en un componente.
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", (event) => {
            funcionalidadPestaniasConContendio(event);
        });
        
    }
    
} //FIN DEL WINDOW.ONLOAD!!