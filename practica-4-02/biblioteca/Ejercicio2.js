"use strict";
import { isANumberAndInteger } from "./util.js";

export const crearTabla = (alto, ancho) => {
 if (!isANumberAndInteger(alto) || !isANumberAndInteger(ancho)) return;

    let tabla = document.createElement("table");
    let contador = 1;

    for (let i = 0; i < alto; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < ancho; j++) {
            let celda = document.createElement("td");
            celda.textContent = contador++;
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    document.body.appendChild(tabla);
}