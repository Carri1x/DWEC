"use strcit";
import { arrayDeNumerosAleatoriosNoRepetidos } from './biblioteca/util.js'

window.onload = () => {

    let numerosRandom = arrayDeNumerosAleatoriosNoRepetidos(1,9);
    console.log(numerosRandom)

    crearLayout()

}; //FIN DE WINDOW.ONLOAD

const crearLayout = () => {
    let divs = document.getElementsByTagName("div");
    
    let posicionImagenes = arrayDeNumerosAleatoriosNoRepetidos(1, 9); // Generamos un array que sea desde 1 hasta 9 posiciones aleatorias entre esos números, desde el 1 hasta el 9.

    posicionImagenes.forEach((pos) => {
        let img = document.createElement('img'); //Por cada posición del array de números aleatorios creamos una imagen.
        img.src = `./img/${pos}.png`; //Asignamos la ruta de la imagen.
        img.setAttribute('class','arrastable'); // Damos la clase arrastable.
        img.setAttribute('draggable', true); // Aceptamos el atributo que sea arrastable.
        divs[0].appendChild(img); //Añadimos la imagen al div del HTML.
    });

    


};

