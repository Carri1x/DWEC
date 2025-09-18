"use strict"

export const positiveMultiple3 = (num) => {
    if(isNaN(num) || !isPositive(num))return "Error, tienes que insertar un número positivo.";
    console.log(`Número por comprobar sus posibles múltiplos de 3 desde el 1: ${num}`);
    for (let i = 1; i < num; i++) {
        if(i % 3 === 0) console.log(i);
    }
}

const isPositive = (num) => {
    return num >= 0;
}