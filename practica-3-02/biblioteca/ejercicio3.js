"use strict";

export const calcularMedia = (discente) => {
    //Sumo todas las notas de las evaluaciones.
    let primeraEvaluacion = sumarElementosArray(discente.notas.primera);
    let segundaEvaluacion = sumarElementosArray(discente.notas.segunda);
    let terceraEvaluacion = sumarElementosArray(discente.notas.tercera);
    //Hago la función para sacar la media de todas las notas.
    let total = (primeraEvaluacion + segundaEvaluacion + terceraEvaluacion) /3;
    return total;
}

//No me interesa exportar esta función.
//Solo refactorizo y evito duplicar código. 
const sumarElementosArray = (array) => {
    //Sumo todas los los elementos del array pasado por parámetro.
    let total = array.reduce((acumulador, valor)=>{
        return acumulador + valor;
    })
    //Devuelvo la media.
    return total/array.length;
}