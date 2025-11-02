"use strict";

import { cambiarTamañoCeldas, tablaConstructor } from "./biblioteca/tabla.js";

window.onload = () => {
    let main = document.getElementsByClassName('main')[0]; //Solo vamos a tener un elemento main.

    crearLayoutColoresYLienzo(main);

    let colorSelec = '#FFFFFF';
    let pintando = false;

    main.addEventListener('click', (evento) => {
        let elemento = evento.target;
        if (elemento.classList.contains('color')) {
            colorSelec = elemento.style.backgroundColor;
        }
        if (elemento.tagName === 'BUTTON'){
            window.location.reload();
        }
    });

    main.addEventListener('mousedown',(evento) => {
        if(evento.target.tagName === 'TD'){
            pintando = true;
        }
    });

    main.addEventListener('mousemove', (evento) => {
        let elemento = evento.target;
        
        if(pintando && elemento.tagName === 'TD'){
            console.log(colorSelec)
            elemento.style.backgroundColor = colorSelec;
        }
    });

    main.addEventListener('mouseup',(evento) => {
        if(evento.target.tagName === 'TD'){
            pintando = false;
        }
    });










} //¡¡FIN DEL WINDOW.ONLOAD!!



const crearLayoutColoresYLienzo = (main) => {
    let elementos = main.children;  //Extraemos los divs que vamos a rellenar.


    let lienzo = tablaConstructor(60, 60);

    elementos[1].appendChild(lienzo); //El segundo div con el lienzo.

    const coloresHexadecimal = [
        '#FFFFFF', // blanco (para borrar)
        '#000000', // negro
        '#FF0000', // rojo
        '#00FF00', // verde
        '#0000FF', // azul
        '#FFFF00', // amarillo
        '#FF00FF', // magenta  
    ];

    let colores = document.getElementsByClassName('color');
    for (let i = 0; i < colores.length; i++) {
        colores[i].style.backgroundColor = coloresHexadecimal[i];
    }
}