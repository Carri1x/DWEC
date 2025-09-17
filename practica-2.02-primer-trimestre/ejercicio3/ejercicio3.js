"use strict"

export const positiveMultiple3 = (num) => {
    if(isNaN(num) || !isPositive(num))return "Error, tienes que insertar un número positivo.";
    
}

const isPositive = (num) => {
    return num >= 0;
}