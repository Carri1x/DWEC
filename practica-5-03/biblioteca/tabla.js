"use strict";

export const tablaConstructor = (alto, ancho) => {
    let tabla = document.createElement('table');
    for (let i = 0; i < alto; i++) {
        let fila = document.createElement('tr');
        tabla.appendChild(fila);
        for (let j = 0; j < ancho; j++) {
            let celda = document.createElement('td');
            celda.style.backgroundColor = '#ffffff';
            celda.style.width = '10px';
            celda.style.height = '10px';
            celda.style.border = '1px solid white';
            fila.appendChild(celda);
        }
    }
    tabla.style.border = '1px solid black';
    tabla.style.borderCollapse = 'collapse';
    return tabla;
}

export const cambiarTamañoCeldas = (tabla, tamaño) => {
    if(!tabla || tabla.tagName !== 'TABLE') return; //En caso de que sea undefined o no sea una tabla no hacemos nada.

    let filas = tabla.querySelectorAll('tr');

    for (let i = 0; i < filas.length; i++) {
        let celdas = filas[i].querySelectorAll('td');

        for (let j = 0; j < celdas.length; j++) {
            celdas[j].style.width = `${tamaño}px`;
            celdas[j].style.height = `${tamaño}px`;
        }
    }
}