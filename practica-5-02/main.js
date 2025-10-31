"use strict";
import { hacerHermanoVisible } from "./biblioteca/Ejercicio1.js";

/*
    Voy a probar a partir de ahora a hacer los comentarios de esta forma, creo que es más legible, de la otra forma
    se mezclaba todo en un bloque inmenso y no me terminaba de gustar... 
    Parece que así es más legibre, comentame algo sobre esta reflexión.
*/

window.onload = () => {
    
    //----------------------------------------------------------------------- Ejerciciof 1: Acordeón -----------------------------------------------------------------------
    let acordeon = document.getElementById('acordeon'); //Extraigo la referencia del DIV acordeon.
    
    acordeon.addEventListener('click', (event) => {
        let elemento = event.target;
        if(elemento === 'div#acordeon.oculto'){
            return;
        }
        if (elemento.nextElementSibling.classList.contains('oculto')){ //He intentado hacer una transición...
            let contador = 0;
            let transicion = setInterval(() => {
                elemento.style.marginBottom = `${contador++}px`;
                if(contador === 21){
                    clearInterval(transicion);
                }
            }, 10);
            elemento.style.marginBottom = '0px';
        }
        elemento.style.marginBottom = '0px';
        if(elemento.classList.contains('visible')){ //Si el elemento tienen la clase visible quitamos la clase oculto del siguiente elemento.
            hacerHermanoVisible(elemento); 
            return; //Sin return se auto quitaría el mismo objeto que ha sido clicado.
        }
        elemento.classList.toggle('oculto'); // Si no tiene la clase 'visible' se añade la clase oculto. 
        
    });


    //----------------------------------------------------------------------- Ejerciciof 2: Pestañas -----------------------------------------------------------------------

    



} //FIN DEL WINDOW.ONLOAD!!