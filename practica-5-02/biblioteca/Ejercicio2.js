"use strict";

export const funcionalidadPestaniasConContendio = (evento) => {
    let elemento = evento.target;
    if(elemento.classList.contains('tab')) return; //Si pincho en el contenedor principal que no me lo borre.
    let posicion = 0;
    let divContenedor = elemento.parentElement; //Cogemos el padre del elemento que ha hecho saltar el evento.
    let hijosDivContenedor = divContenedor.children; //Cogemos los hijos del contenedor padre.
    for (let i = 0; i < hijosDivContenedor.length; i++) {
        hijosDivContenedor[i].classList.remove('seleccionado'); //Quitamos a todos la clase seleccionado. Luego se la añadiremos al elemento seleccionado.
        if (hijosDivContenedor[i] === elemento) {
            posicion = i; //Ahora que sabemos cual es el hijo que ha hecho saltar el evento. Igualamos la posición.
        }
    }

    elemento.classList.add('seleccionado'); //Añadimos la clase seleccionado una vez que todas las demás pestañas no la tengan.

    if (!divContenedor.nextElementSibling) return; //Si no tiene hermano siguiente es porque es el contenedor erróneo.
    let divHermano = divContenedor.nextElementSibling; //Cogemos el contenedor hermano siguiente.
    let hijosDelDivHermano = divHermano.children;
    let contenidoObjetivo = divHermano.children[posicion]; //Cogemos el CONTENIDO PESTAÑA que queremos mostrar.

    if (!contenidoObjetivo.classList.contains('oculto')) return; //Si el contenido que queremos manipular ya sale en la pantalla no lo ocultamos lo seguimos manteniendo.

    for (let i = 0; i < hijosDelDivHermano.length; i++) {
        if (hijosDelDivHermano[i] !== contenidoObjetivo) { //Si los elementos son diferentes al contendio que debe ser objetivo.
            if (!hijosDelDivHermano[i].classList.contains('oculto')) { //Si no contiene la clase oculto se la aplica.
                hijosDelDivHermano[i].classList.add('oculto'); // Aplica la clase oculto.
            }

        }

    }
    contenidoObjetivo.classList.toggle('oculto'); //Cambiamos la clase.
}


//Educada y cordialmente, ¡¡¡AAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHH VA BIEN JDR, DE P*** MADRE JDR!!!. :DD Perdona por la locura momentánea.