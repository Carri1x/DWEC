"use strict";

const regexHttps = /^https:\/\//;
const minLetras = 3;
const minPrecio = 0.10;
const minPeso = 0.10;

export const erroresFormulario = (form) => {
    let errores = {};
    if(!nombreValido(form.nombre.value)) {
        errores = {nombre: `El nombre tiene que contener al menos ${minLetras} letras.`};
    }
    if(!precioValido(form.precio.value)) {
        errores = {...errores, precio: `El precio tiene que ser al menos de ${minPrecio}€.`};
    }
    if(!pesoValido(form.peso.value)) {
        errores = {...errores, peso: `Al menos debe de pesar ${minPeso}kg`};
    }
    //En este caso me da igual que haya o no imagen, pero si la hay que sea válida...
    if(!form.imagen === '') {
        if(!imagenValida(form.imagen)) {
            errores = {...errores, imagen: `La imagen debe empezar de esta forma https://`};
        }
    }
    return errores;
}

const nombreValido = (nombre) => {
    return nombre.length >= minLetras;
}

const precioValido = (precio) => {
    let num = precio.replace(',', '.');
    num = parseFloat(num);
    return !isNaN(num) && num >= minPrecio;
}

const pesoValido = (peso) => {
    let num = peso.replace(',', '.');
    num = parseFloat(num);
    return !isNaN(num) && num >= minPeso;
}

const imagenValida = (url) => {
    return regexHttps.test(url);
}

export const comprobarCambiosEditados = (productoOriginal, productoEditado) => {
    let hayCambios = false;
    if(productoOriginal.nombre !== productoEditado.nombre) {
        hayCambios = true;
    }
    if(productoOriginal.precio !== productoEditado.precio) {
        hayCambios = true;
    }
    if(productoOriginal.peso !== productoEditado.peso) {
        hayCambios = true;
    }
    if(productoOriginal.imagen !== productoEditado.imagen) {
        hayCambios = true;
    }
    if(productoOriginal.descripcion !== productoEditado.descripcion) {
        hayCambios = true;
    }
    return hayCambios;
}