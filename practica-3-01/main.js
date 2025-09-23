"use strict";

/**
 * Voy a partir estas prácticas en el main, separándolo por ejercicios.
 */

//Ejercicio 1----------------------------------------------------------------------------------------
console.log(`-------------------------EJERCICIO 1------------------------------`);
function sumar(){
    let acumulador = 0;
    if(arguments.length < 2) return 'Debe haber al menos 2 números para sumar...';
    for (const num of arguments) {
        if(isNaN(num)) return `Lo siento socio esto : ${num} no es un número.`;
        acumulador += num;
    }
    return acumulador;
}

console.log(sumar(1,2,3,"holaaaaa"));
console.log(sumar(1,2,3,43,54,434,3,2));
console.log(sumar(1));

//Ejercicio 2----------------------------------------------------------------------------------------
console.log(`-------------------------EJERCICIO 2------------------------------`);

const tablas = (num, funcion) => {
    if(isNaN(num) || !Number.isInteger(num) || num < 2){
        console.log(`Lo siento tiene que ser un número entero mayor o igual que dos`)
    }
    for (let i = num; i >= 2; i--) {
        for (let j = 0; j <= 10; j++) {
            funcion(j,i);
        }
        console.log(`----------------------------`)
    }
}

const multiplicar = (num1, num2) => {
    console.log(`${num1} x ${num2} = ${num1 * num2}`);
}

tablas(6,multiplicar);

//Ejercicio 3----------------------------------------------------------------------------------------
console.log(`-------------------------EJERCICIO 3------------------------------`);

let valorCuenta = [124, 48, 268];
let porcentajePropinas = [20, 15, 10];
let cantFinal = [];

const calculadorPropinas = (arrayCuenta) => {
    let resultadoPropinas = [];
    for (let i = 0; i < arrayCuenta.length; i++) {
        if(valorCuenta[i] < 50) resultadoPropinas.push(valorCuenta[i] + (valorCuenta[i] * (porcentajePropinas[0]/100)));
        else if(valorCuenta[i] >= 50 && valorCuenta[i] <= 200) resultadoPropinas.push(valorCuenta[i] + (valorCuenta[i] * (porcentajePropinas[1]/100)));
        else resultadoPropinas.push(valorCuenta[i] + (valorCuenta[i] * (porcentajePropinas[2]/100)));
    }
    return resultadoPropinas;
}

cantFinal = calculadorPropinas(valorCuenta);
cantFinal.forEach((x)=>{
    console.log(`Cuenta con propina incluida ${x}`);
});