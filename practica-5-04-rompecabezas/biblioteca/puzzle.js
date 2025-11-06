"use strict";
import { arrayDeNumerosAleatoriosNoRepetidos } from "./util.js";

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

export const aleatorizarImagenes = (imagenes) => {
    let imagenesTemporal = []; //Creo un nuevo array para que no sea un HTMLCollection.
    const numeroDeImagenes = 9;
    const arrayNumerosAleatorios = arrayDeNumerosAleatoriosNoRepetidos(0, numeroDeImagenes - 1); //Creo un array de números aleatorios de 9 posiciones.
    for (let i = 0; i < imagenes.length; i++) {
        imagenesTemporal[i] = imagenes[i]; //Intercambio las imágenes del HTMLCollection por en un Array.
    }
    let resultado = []; //Creo este array  para guardar las imágnes que saldrán de la función.
    for (let i = 0; i < imagenesTemporal.length; i++) {
        resultado.push(imagenesTemporal[arrayNumerosAleatorios[i]]); //Me guardo en el resultado las imágenes como los números aleatorios estén ordenados.
    }
    return resultado;
}

/**
 * Entiendo perfectamente que dado la ocasión las imágenes son solo links de ellas mismas y podría haberlas borrado y haber utilizado la 
 * función que hay dentro de la función crearLayout() pero he hecho esto por simular como que las imágenes ya se han cargado en memoria
 * y usarlas sería una gran ventaja en vez de tener que llamar otra vez a la base de datos...
 * 
 * Conclusión: he querido "optimizar" el proceso de aleatorizar las imágenes.
 *  */