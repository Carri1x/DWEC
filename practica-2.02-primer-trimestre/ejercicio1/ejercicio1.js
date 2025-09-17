"use strict";

//Ejercicio 1
export const mesDelAño = (num) => {
    if(isNaN(num)){
        return `Lo siento, ${num}, no es un número.`;
    }
    if(num < 1 || num > 12){
        return 'Lo siento, el número debe estár entre 1 y 12';
    }
    let meses = ["Enero", "Febrero", 'Marzo','Abril','Mayo','Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    for (let i = 0; i < meses.length; i++) {
        if(num == i){
            //Cuando coincidan los números recogeremos el mes anterior ya que los meses empiezan desde el 1 al 12 y los arrays desde el 0.
            //Ej -> Si nos insertan el número 1 (solicitando enero) restaremos uno para coger el elemento solicitado en la posición 0.
            return meses[i - 1];
        }
    }
};