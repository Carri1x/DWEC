"use strict";

export const calcularMedia = (discente) => {
    let totalNotasPrimeraEvaluacion = sumarElementosArray(discente.notas.primera);
    let totalNotasSegundaEvaluacion = sumarElementosArray(discente.notas.segunda);
    let totalNotasTerceraEvaluacion = sumarElementosArray(discente.notas.tercera);
    let total = totalNotasPrimeraEvaluacion + totalNotasSegundaEvaluacion + totalNotasTerceraEvaluacion /3;
    return total;
}

const sumarElementosArray = (array) => {
    let total = array.reduce((acumulador, valor)=>{
        return acumulador + valor;
    })
    return total;
}