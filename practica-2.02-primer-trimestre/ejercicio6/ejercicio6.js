"use strict";

import {isANumberAndInteger} from "../util.js";

export const calculator = (num1, num2, operator) => {
    if(!isANumberAndInteger(num1) || !isANumberAndInteger(num2)) return "";
    switch(operator) {
        case "+":
            return `El resultado de ${num1} + ${num2} es = ${add(num1,num2)}`;
            break;
        case "-":
            return `El resultado de ${num1} - ${num2} es = ${subtract(num1, num2)}`;
            break;
        case "*":
        case "x":
            return `El resultado de ${num1} x ${num2} es = ${multiply(num1, num2)}`;
            break;
        case "/":
            return `El resultado de ${num1} / ${num2} es = ${divide(num1,num2)}`;
            break;
        case "%":
            return `El resultado de ${num1} % ${num2} es = ${modulus(num1,num2)}`;
            break;
        default:
            return "Error. Debe ser alguno de estos operadores (+, -, *, x, /, %)"
            break;
    }
}

const add =  (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    if(num2 === 0) return "Error, no puede dividirse entre 0";
    return num1 / num2;
}

const modulus = (num1, num2) => {
    if(num2 === 0) return "Error, no puede hacerse el módulo entre 0";
    return num1 % num2;
}

