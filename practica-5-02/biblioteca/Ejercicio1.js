"use strict";

export const funcionalidadAcordeon = (evento) => {
    let elemento = evento.target;
    let elementoOculto = elemento.nextElementSibling; //Cogemos el siguiente hermano del elemento que ha hecho saltar el evento.
    if (elementoOculto.classList.contains('oculto')) { // He intentado hacer una transición... Sale un poco forzada pero comparado con la anterior del carrusel estoy bastante contento como ha salido.
        let contador = 0;
        let transicion = setInterval(() => {  
            elementoOculto.style.padding = `${contador++}px`;
            if (contador === 21) {
                clearInterval(transicion);
            }
        }, 15);
    }
    if(elemento.classList.contains('visible')){ //Como el elemento está visible el hermano está oculto lo hago visible.
        hacerHermanoVisible(elemento);              //Si no tiene la clase visible no hago nada.
    }

}

const hacerHermanoVisible = (HTMLElement) => {
    let clasesDelHermano = HTMLElement.nextElementSibling.classList; // Cogemos las clases del siguiente hermano.
    clasesDelHermano.toggle('oculto'); //Ak hermano le cambiamos la clase oculto.
}