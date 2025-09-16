"use strict"

import {calcularImc} from './../biblioteca.js';

let masaMarcos = 70;
let masaJuan = 80;

let alturaMarcos = 1.80;
let alturaJuan = 1.78;

let imcMarcos = calcularImc(masaMarcos, alturaMarcos);
let imcJuan = calcularImc(masaJuan, alturaJuan);

//Si alguna de las variables de imc es un string lo imprimimos por pantalla (es un error)
if(isNaN(imcMarcos)){
    console.log(imcMarcos);
}else if(isNaN(imcJuan)){
    console.log(imcJuan);
}else{
    let mayorImcMarcosQueJuan = imcMarcos > imcJuan;
    console.log(`¿Tiene Marcos un IMC mayor que el de Juan: ${mayorImcMarcosQueJuan}`);
}

