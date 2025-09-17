"use strict";

//Ejercicio 2

export const analisisNumérico = (num) => {
    let typeOfNumber = [];
    if(isNaN(num))return "Error, el valor a insertar debe ser un número";
    //Otra opción a estos if y else es hacer ternarias.
    if(isPair(num)){
        typeOfNumber.push(`El número ${num} es par`);
    } else {
        typeOfNumber.push(`El número ${num} es impar`);
    }
    if(isPositive(num)){
        typeOfNumber.push(" es positivo");
    } else {
        typeOfNumber.push(" es negativo");
    }
    if(isPrime(num)){
        typeOfNumber.push(" es primo.");
    } else {
        typeOfNumber.push(" no es primo.")
    }
    return typeOfNumber;
}

const isPair = (num) => {
    return num % 2 == 0;
}

const isPositive = (num) => {
    return num >= 0;
}

const isPrime = (num) => {
    if(num <= 1) return false;
    if(num === 2) return true;
    if(num % 2 === 0) return false;
    for(let i = 3; i <= Math.sqrt(num); i += 2){
        if(num % i === 0) return false;
    }
    return true;
}