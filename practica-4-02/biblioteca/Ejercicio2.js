"use strict";
import { isANumberAndInteger , esPrimo} from "./util.js";

export const crearTabla = (alto, ancho) => {
 if (!isANumberAndInteger(alto) || !isANumberAndInteger(ancho)) return;
    //Creo la tabla.
    let tabla = document.createElement("table");
    let contador = 1;
    //Relleno la tabla.
    for (let i = 0; i < alto; i++) {
        //Creo una fila.
        let fila = document.createElement("tr");
        for (let j = 0; j < ancho; j++) {
            //Creo una celda.
            let celda = document.createElement("td");
            //Añado el número correspondiente.
            celda.textContent = contador++;
            //Añado la celda a la fila.
            fila.appendChild(celda);
        }
        //Añado la fila a la tabla.
        tabla.appendChild(fila);
    }
    //Añado la tabla al body.
    document.body.appendChild(tabla);
}

export const cambiarColorNumPrimos = () => {
    //Obtengo todas las tablas del body.
    let tablas = document.body.getElementsByTagName('table');
    //Si no hay tablas salgo de la función.
    if(tablas === 0) return;
    //Recogo cada tabla.
    for (let i = 0; i < tablas.length; i++) {
    const filas = tablas[i].children;
    //Recogo cada fila.
    for (let j = 0; j < filas.length; j++) {
      const celdas = filas[j].children; 
        //Recogo cada celda.
      for (let k = 0; k < celdas.length; k++) {
        //Recogo el número de la celda.
        const td = celdas[k];
        const num = td.textContent.trim();
        //Si es primo le cambio el color con la clase primo.
        if (esPrimo(Number(num))) {
          td.classList.add('primo');
        }
      }
    }
  }
}