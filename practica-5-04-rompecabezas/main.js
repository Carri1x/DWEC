"use strcit";
import { aleatorizarImagenes, haGanado, insertarMensajeDeVictoria } from "./biblioteca/puzzle.js";
import { arrayDeNumerosAleatoriosNoRepetidos } from "./biblioteca/util.js";

window.onload = () => {
    crearLayout();
    document.getElementsByClassName('ganador')[0]?.remove(); //Si existe el mensaje de ganador lo eliminamos al recargar la página.

    let arrastables = document.getElementsByClassName("arrastrable");
    for (let i = 0; i < arrastables.length; i++) {
        arrastables[i].setAttribute("draggable", true);
    }


    document.getElementById("zona-arrastrable").addEventListener("dragstart", (evento) => {
        if (evento.target.classList.contains("arrastrable")) {
            evento.dataTransfer.setData("indentificador", evento.target.id); //Guardamos el identificador del elemento agarrado. Posteriormente lo usaremos.
        }
    });




    document.getElementById("zona-arrastrable").addEventListener("dragover", (evento) => {
        evento.preventDefault();
    });


    document.getElementById("zona-arrastrable").addEventListener("drop", (evento) => {
        evento.preventDefault(); // Prevenimos la acción por defecto.
        let targetEsSoltable = evento.target.classList.contains("soltable");

        if (targetEsSoltable && !evento.target.hasChildNodes()) { // Si el target es soltable y además no contiene hijos podrémos soltar el elemento.arrastrable dentro de él.

            const idArrastrado = evento.dataTransfer.getData("indentificador"); //Obtenemos el ID del elemento arrastrado.

            const elementoArrastrado = document.getElementById(idArrastrado); //Obtenemos la referencia al elemento real usando el ID.
            if (elementoArrastrado) { //Si existe el elemento.
                evento.target.appendChild(elementoArrastrado); //Añadimos el elemento real al destino.
            }
        }
        const tabla = document.getElementsByTagName('table')[0];
        if(haGanado(tabla)){ //Le pasamos la tabla cada vez que haya hecho un drop para comprobar si ha ganado.
            insertarMensajeDeVictoria();
        }
    });

    document.getElementsByClassName('boton')[0].addEventListener('click', (evento) => {
        document.getElementsByClassName('ganador')[0]?.remove(); //Si existe el mensaje de ganador lo eliminamos al recargar la página.
        let imagenes = document.getElementsByClassName('arrastrable'); // Cogemos todas las imágenes.
        let primerDiv = document.getElementsByClassName('soltables')[0]; // Cogemos el div donde queremos depositarlas.
        //let posicionImagenes = arrayDeNumerosAleatoriosNoRepetidos(0, imagenes.length); //Hacemos un array con números aleatorios para que las imágenes salgan de forma aleatoria (Como al principio).
        const imagenesAleatorizadas = aleatorizarImagenes(imagenes);
        console.log(imagenes)
        console.log("-----------------------")
        console.log(imagenesAleatorizadas)
        for(const imagen of imagenesAleatorizadas){
            primerDiv.appendChild(imagen); // Vamos añadiendo las imágenes una a una.
        }
        
    })


}; //FIN DE WINDOW.ONLOAD

const crearLayout = () => {
    let main = document.getElementById("zona-arrastrable").children;

    const numeroDeImagenes = 9;

    let posicionImagenes = arrayDeNumerosAleatoriosNoRepetidos(1, numeroDeImagenes); // Generamos un array que sea desde 1 hasta 9 posiciones aleatorias entre esos números, desde el 1 hasta el 9.

    posicionImagenes.forEach((pos) => {
        let img = document.createElement("img"); //Por cada posición del array de números aleatorios creamos una imagen.
        img.src = `./img/${pos}.png`; //Asignamos la ruta de la imagen.
        img.setAttribute("class", "arrastrable"); // Damos la clase arrastrable.
        img.setAttribute("id", pos); //Le damos el id correspondiente.
        main[0].appendChild(img); //Añadimos la imagen al primer div del HTML.
    });

    let contador = 1;
    let tabla = document.createElement("table");
    for (let i = 0; i < 3; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            let celda = document.createElement("td");
            celda.setAttribute("class", "soltable");
            celda.setAttribute('id', contador++)
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    main[1].appendChild(tabla);

};