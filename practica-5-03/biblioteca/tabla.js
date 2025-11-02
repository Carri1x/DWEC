"use strict";

export const tablaConstructor = (alto, ancho) => {
    let tabla = document.createElement('table'); //Creamos la tabla.
    for (let i = 0; i < alto; i++) {
        let fila = document.createElement('tr'); //Creamos una fila.
        tabla.appendChild(fila); //Añadimos la fila a la tabla.
        for (let j = 0; j < ancho; j++) {
            let celda = document.createElement('td'); //Creamos una celda.
            celda.style.backgroundColor = '#ffffff';
            celda.style.width = '10px';
            celda.style.height = '10px';
            celda.style.border = '1px solid white';
            fila.appendChild(celda); //Añadimos la celda a la fila.
        }
    }
    tabla.style.border = '1px solid black';
    tabla.style.borderCollapse = 'collapse';
    return tabla;
}

export const cambiarTamañoCeldas = (tabla, tamaño) => {
    if(!tabla || tabla.tagName !== 'TABLE') return; //En caso de que sea undefined o no sea una tabla no hacemos nada.

    let filas = tabla.querySelectorAll('tr'); //Seleccionamos todas las filas de la tabla.

    for (let i = 0; i < filas.length; i++) {
        let celdas = filas[i].querySelectorAll('td'); //Seleccionamos todas las celdas de la fila actual.

        for (let j = 0; j < celdas.length; j++) {
            celdas[j].style.width = `${tamaño}px`; //Cambiamos el tamaño de la celda.
            celdas[j].style.height = `${tamaño}px`; //Cambiamos el tamaño de la celda.
        }
    }
}