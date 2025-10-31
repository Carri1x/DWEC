"use strict";
import { hacerHermanoVisible } from "./biblioteca/Ejercicio1.js";

/*
    Voy a probar a partir de ahora a hacer los comentarios de esta forma, creo que es más legible, de la otra forma
    se mezclaba todo en un bloque inmenso y no me terminaba de gustar... 
    Parece que así es más legibre, comentame algo sobre esta reflexión.
*/

window.onload = () => {
    
    //----------------------------------------------------------------------- Ejerciciof 1: Acordeón -----------------------------------------------------------------------
    let acordeon = document.getElementById('acordeon'); //Extraigo la referencia del DIV acordeon.
    
    acordeon.addEventListener('click', (event) => {
        let elemento = event.target;
        if(elemento === 'div#acordeon.oculto'){
            return;
        }
        if (elemento.nextElementSibling.classList.contains('oculto')){ //He intentado hacer una transición...
            let contador = 0;
            let transicion = setInterval(() => {
                elemento.style.marginBottom = `${contador++}px`;
                if(contador === 21){
                    clearInterval(transicion);
                }
            }, 10);
            elemento.style.marginBottom = '0px';
        }
        elemento.style.marginBottom = '0px';
        if(elemento.classList.contains('visible')){ //Si el elemento tienen la clase visible quitamos la clase oculto del siguiente elemento.
            hacerHermanoVisible(elemento); 
            return; //Sin return se auto quitaría el mismo objeto que ha sido clicado.
        }
        elemento.classList.toggle('oculto'); // Si no tiene la clase 'visible' se añade la clase oculto. 
        
    });


    //----------------------------------------------------------------------- Ejerciciof 2: Pestañas -----------------------------------------------------------------------

    let tabs = document.getElementsByClassName('tab')
    for (let i = 0; i < tabs.length; i++) {

        tabs[i].addEventListener("click", (event) => {
            let elemento = event.target;
            console.log(elemento);
            let posicion = 0;
            let divContenedor = elemento.parentElement; //Cogemos el padre del elemento que ha hecho saltar el evento.
            let hijosDivContenedor = divContenedor.children; //Cogemos los hijos del contenedor padre.
            for (let i = 0; i < hijosDivContenedor.length; i++) {
                if(hijosDivContenedor[i] === elemento){
                    posicion = i; //Ahora que sabemos cual es el hijo que ha hecho saltar el evento. Igualamos la posición.
                }
            }
            if(!divContenedor.nextElementSibling) return; //Si no tiene hermano siguiente es porque es el contenedor erróneo.
            let divHermano = divContenedor.nextElementSibling; //Cogemos el contenedor hermano siguiente.
            let hijosDelDivHermano = divHermano.children;
            let contenidoObjetivo = divHermano.children[posicion]; //Cogemos el CONTENIDO PESTAÑA que queremos mostrar.

            if(!contenidoObjetivo.classList.contains('oculto'))return; //Si el contenido que queremos manipular ya sale en la pantalla no lo ocultamos lo seguimos manteniendo.

            for (let i = 0; i < hijosDelDivHermano.length; i++) { 
                if(hijosDelDivHermano[i] !== contenidoObjetivo){ //Si los elementos son diferentes al contendio que debe ser objetivo.
                    if(!hijosDelDivHermano[i].classList.contains('oculto')){ //Si no contiene la clase oculto se la aplica.
                        hijosDelDivHermano[i].classList.add('oculto'); // Aplica la clase oculto.
                    } 
                    
                }

            }
            contenidoObjetivo.classList.toggle('oculto'); //Cambiamos la clase.
        });
        //Educada y cordialmente, ¡¡¡AAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHH VA BIEN JDR, DE P*** MADRE JDR!!!. :DD Perdona por la locura momentánea.

    }
    



} //FIN DEL WINDOW.ONLOAD!!