"use strict";

export const hacerHermanoVisible = (HTMLElement) => {
    let clasesDelHermano = HTMLElement.nextElementSibling.classList; // Cogemos las clases del siguiente hermano.
    clasesDelHermano.toggle('oculto'); //Ak hermano le cambiamos la clase oculto.
}