"use strict";

export const haGanado = (tabla) => {

    const filas = tabla.children; // Cogemos las filas de la tabla.

    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].children; //Cogemos las celdas de cada una de las filas.
        for (let j = 0; j < celdas.length; j++) {
            let celda = celdas[j]; //Cogemos la celda.
            let img = celda.children[0]; // Y la imagen que hay dentro de ella.
            if(!celdaImagenIguales(celda, img)) return false; //Si la imagen no debería estar en ese sitio no ha ganado el usuario.
        }
    }
    return true; //Ha ganado.
}

const celdaImagenIguales = (celda, img) => {
    if(!img) return false; //Si la imagen es undefined devolvemos falso.
    //En caso contrario comprobamos que sean iguales los ids.
    const idCelda = celda.getAttribute('id');
    const idImg = img.getAttribute('id');
    return idCelda === idImg; 
}

export const insertarMensajeDeVictoria = () => {
    let div = document.createElement('div'); //Creamos un div para luego insertar el texto dentro.
    div.setAttribute('class', 'ganador');

    let texto = document.createElement('h1');
    texto.innerText = 'HAS GANADO'; 

    div.appendChild(texto); //Insertamos el texto dentro del div.

    document.body.appendChild(div); //Insertamos el div en el body.
}