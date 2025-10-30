"use strict";
import { hacerHermanoVisible } from "./biblioteca/Ejercicio1.js";

/*
    Voy a probar a partir de ahora a hacer los comentarios de esta forma, creo que es más legible, de la otra forma
    se mezclaba todo en un bloque inmenso y no me terminaba de gustar... 
    Parece que así es más legibre, comentame algo sobre esta reflexión.
*/

window.onload = () => {
    
    let acordeon = document.getElementById('acordeon'); //Extraigo la referencia del DIV acordeon.
    
    acordeon.addEventListener('click', (event) => {
        let elemento = event.target;
        if(elemento.classList.contains('visible')){ //Si el elemento tienen la clase visible quitamos la clase oculto del siguiente elemento.
            hacerHermanoVisible(elemento); 
            return; //Sin return se auto quitaría el mismo objeto que ha sido clicado.
        }
        elemento.classList.toggle('oculto'); // Si no tiene la clase 'visible' se añade la clase oculto. 
    });
} //FIN DEL WINDOW.ONLOAD!!