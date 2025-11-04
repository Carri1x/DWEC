"use strcit";
import { arrayDeNumerosAleatoriosNoRepetidos } from "./biblioteca/util.js";

window.onload = () => {
  crearLayout();

  let arrastables = document.getElementsByClassName("arrastrable");
  for (let i = 0; i < arrastables.length; i++) {
    arrastables[i].setAttribute("draggable", true);
  }

  let zonasArrastrables = document.getElementsByClassName("zona-arrastrable");

    for (const zona of zonasArrastrables) {
        zona.addEventListener("dragstart", (evento) => {
            if (evento.target.classList.contains("arrastrable")) {
                evento.dataTransfer.setData("indentificador", evento.target.id); //Guardamos el identificador del elemento agarrado. Posteriormente lo usaremos.
                console.log(evento.dataTransfer.getData('identificador'));
            }
        });
    }


    for (const zona of zonasArrastrables) {
        zona.addEventListener("dragover", (evento) => {
            console.log("Entra por lo menos en la 25")
            evento.preventDefault();
        });
    }

    for (const zona of zonasArrastrables) {
        zona.addEventListener("drop", (evento) => {
            evento.preventDefault(); // Prevenimos la acción por defecto.
            console.log("SI QUIERA ENTRA??")
            let targetEsSoltable = evento.target.classList.contains("soltable");
            
            if (targetEsSoltable && !evento.target.hasChildNodes()) { // Si el target es soltable y además no contiene hijos podrémos soltar el elemento.arrastrable dentro de él.

                const idArrastrado = evento.dataTransfer.getData("indentificador"); //Obtenemos el ID del elemento arrastrado.
 
                const elementoArrastrado = document.getElementById(idArrastrado); //Obtenemos la referencia al elemento real usando el ID.
                console.log('Entra en la linea 43')
                if (elementoArrastrado) { //Si existe el elemento.
                    console.log('Entra en la linea 45')
                    evento.target.appendChild(elementoArrastrado); //Añadimos el elemento real al destino.
                }
            }
        });
    }


}; //FIN DE WINDOW.ONLOAD

const crearLayout = () => {
    let divs = document.getElementsByClassName("zona-arrastrable")[0].children;

    const numeroDeImagenes = 9;

    let posicionImagenes = arrayDeNumerosAleatoriosNoRepetidos(1,numeroDeImagenes); // Generamos un array que sea desde 1 hasta 9 posiciones aleatorias entre esos números, desde el 1 hasta el 9.

    posicionImagenes.forEach((pos) => {
        let img = document.createElement("img"); //Por cada posición del array de números aleatorios creamos una imagen.
        img.src = `./img/${pos}.png`; //Asignamos la ruta de la imagen.
        img.setAttribute("class", "arrastrable"); // Damos la clase arrastrable.
        img.setAttribute("id", pos); //Le damos el id correspondiente.
        divs[0].appendChild(img); //Añadimos la imagen al primer div del HTML.
    });

  //CREAMOS TANTOS DIVS COMO IMÁGENES HAY.
    for (let i = 0; i < numeroDeImagenes; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "soltable");
        div.setAttribute("id", i + 1);
        divs[1].appendChild(div);
    }
};
