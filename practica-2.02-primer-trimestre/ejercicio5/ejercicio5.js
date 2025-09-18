"use strict";

import { isANumberAndInteger } from "../util.js";

export function calcAverage() {
    let result = 0;
    if(arguments.length == 0) return "Debes insertar almenos 2 números enteros";
    if(arguments.length == 1) {
        if(!isANumberAndInteger(arguments[0]) || arguments[0] < 0) return "";
        return `Al ser solo un número no hay media tu resultado es = ${arguments[0]}` ;
    }
    for (const num of arguments) {
        //Si no es un número y un entero entramos en el if para no seguir con el programa.
        if(!isANumberAndInteger(num) || num < 0 ) return;
        result += num;
    }
    return `La media de los números es = ${result/arguments.length}`;
}

