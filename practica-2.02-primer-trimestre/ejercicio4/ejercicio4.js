"use strict";

export const calcExponentOf = (base, exponent) => {
    let index = 1;
    if(isNaN(base) || isNaN(exponent)) return "Tanto la base como el exponente deben ser números.";
    //Ahora comprobamos que sean los dos números enteros. En caso contrario no procedemos a hacer la operación.
    if(!Number.isInteger(base) || !Number.isInteger(exponent)) return "Tanto la base como el exponente deben ser números enteros."
    let result = base;
    //Hacemos la operación de base * base tantas veces como el valor del exponente.
    console.log("Index= "+index);
    while(index < exponent){
        console.log("Vuelta= "+index);
        console.log("Result sin calcular= "+result);
        result *= base;
        console.log("Result calculado= "+result);
        index++;
        console.log("Index= "+index);
    }
    return result;
}