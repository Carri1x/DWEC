"use strict";

//Me he hecho una libreria útil para almacenar las funciones que puedan serme útiles y usarlas solo importando, sin que haga falta duplicar código.

export const isANumberAndInteger = (num) => {
    if(isNaN(num)) {
        console.log("Error. El dato debe ser un número.");
        return false;
    }
    if(!Number.isInteger(num)) {
        console.log("Error. El dato debe ser un número entero.");
        return false;
    }
    return true;
}

export const cambiarFormatoEspanya = (numero) =>{
    return numero.replaceAll(".",",").toLocaleString("es-ES");
}