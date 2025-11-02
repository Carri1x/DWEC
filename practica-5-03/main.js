"use strict";

import { tablaConstructor } from "./biblioteca/tabla.js";

window.onload = () => {
    let main = document.getElementsByClassName('main')[0]; //Solo vamos a tener un elemento main.

    crearLayoutColoresYLienzo(main);

    let colorSelec = '#FFFFFF';
    let pintando = false;

    //Eventos para la selección de color y el pintado del lienzo.
    main.addEventListener('click', (evento) => {
        let elemento = evento.target;
        if (elemento.classList.contains('color')) { //Si el elemento tiene la clase color.
            colorSelec = elemento.style.backgroundColor; //Cambiamos el color seleccionado por el del div clicado.
        }
        if (elemento.tagName === 'BUTTON'){ //Si clicamos el botón de borrar.
            window.location.reload(); //Recargamos la página para borrar el lienzo.
        }
    });

    main.addEventListener('mousedown',(evento) => {
        if(evento.target.tagName === 'TD'){ //Si clicamos sobre una celda.
            pintando = true; //Activamos el pintado.
            evento.target.style.backgroundColor = colorSelec; //Cambiamos el color de la celda clicada.
        }
    });

    main.addEventListener('mousemove', (evento) => { //Mientras movemos el ratón.
        let elemento = evento.target;
        
        if(pintando && elemento.tagName === 'TD'){ //Si estamos pintando y el elemento es una celda.
            elemento.style.backgroundColor = colorSelec; //Cambiamos el color de las celdas por donde pasemos.
        }
    });

    main.addEventListener('mouseup',(evento) => { //Cuando soltamos el botón del ratón.
        if(evento.target.tagName === 'TD'){ //Si el elemento es una celda.
            pintando = false; //Desactivamos el pintado.
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