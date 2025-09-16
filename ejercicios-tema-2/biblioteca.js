"use strict"
//Funciones ejercicio 1 - Estás gordo
export const calcularImc = (masa, altura) => {
    if(isNaN(masa) || isNaN(altura)){
        return "Porfavor inserta un número válido"
    }
    if(masa <= 0 || altura <= 0){
        return "Error, no puede ser la masa o la altura menor o igual a cero";
    }
    return masa/(altura*altura);
}

//Funciones ejercicio 2 - Juego mejor que tú
export const puntuacionMedia = (equipo) => {
    if(!Array.isArray(equipo)){
        console.log("Error. Tienes que insertar bien los parámetros.");
        return;
    }
    let media = 0;
    equipo.forEach((e)=>{
        media += e;
    });
    return media/equipo.length;
}

export function comprobarQueEquipoTieneMejorMedia() {
    console.log("Respectivamente a como se han pasado por parámetro de entrada los equipos vamos a ver quien de ellos es el campeón.")
    let equipos = [];
    if(arguments.length <= 1){
        console.log("Lo siento, no se puede hacer el cálculo con 1 equipo o menos ");
        return;
    }
    for(let i = 0; i < arguments.length; i++){
        equipos[i] = puntuacionMedia(arguments[i]);
    }
    //Vamos a comprobar cual es el equipo con la media más alta
    let mayor = 0;
    let empate = false;
    for(let i = 0; i < arguments.length; i++)  {
        if(equipos[i] >= mayor){
            mayor = equipos[i];
        }
        //Miramos a ver si hay empate
        for(let j = 0; j < arguments.length; j++){
            if(equipos[i] == mayor){
                empate = true;
            }
        }
        
    }
    //En caso de empate verificamos cuales son los equipos que han sido empatados
    if(empate){
        let equiposDeEmpate = [];
        let index = 0;
        for(let i = 0; i < arguments.length; i++){ //Esto esá mal
            if(equipos[i] == mayor){
                equiposDeEmpate[index] = i;
                index++;
            }
        }
        return `Los equipos empatados son el ${equiposDeEmpate[0]} y el equipo ${equiposDeEmpate[1]}`;
    }
    /*Una vez guardada la media en la variable mayor vamos a ver cual es el partido gracias
        a la posición como se han introducido los parámetros de entrada. */
    for (let i = 0; i < arguments.length; i++) {
        if(equipos[i] === mayor){
            return `El ganador es el equipo ${i + 1}`;
        }
    }
}

//Funciones ejercicio 3 - Números
export const iteracionNumeroCuantasVecesSeRepitePorDos = (numDeRepeticiones, numARepetir) => {
    for(let i = 0; i < numDeRepeticiones; i++){
        console.log(numARepetir);
        numARepetir *= 2;
    }
}