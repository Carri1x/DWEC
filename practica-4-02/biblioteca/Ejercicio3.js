"use strict";

/*
    Me ha parecido más fácil cambiar los colores con clases CSS que directamente el estilo en linea del párrafo.
*/

export const cambiarColorParrafos = () => {
    //Obtengo todos los párrafos del body.
    let parrafos = document.body.getElementsByTagName('p');
    //Si no hay párrafos salgo de la función.
    if (parrafos.length === 0) return;
    //Quito el resaltado del párrafo que lo tenga.
    for (let i = 0; i < parrafos.length; i++) {
        if(parrafos[i].classList.contains('resaltado')){
            parrafos[i].classList.remove('resaltado');
        }
    }
    let numAleatorio = Math.floor(Math.random() * parrafos.length);
    //Selecciono un párrafo aleatorio y le añado la clase resaltado.
    parrafos[numAleatorio].classList.add('resaltado');
}