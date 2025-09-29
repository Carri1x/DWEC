"use strict";

import { arrayToJSON, ordenadasAlReves, palabrasMayusculas } from "./biblioteca/ejercicio1.js";
import { arrayDiezNumerosAleatorios, arrayElementosMayorQue } from "./biblioteca/ejercicio2.js";
import { insertarCodigoPostal, insertarApellido, insertarUsuario, usuariosCorreoYahoo, usuariosMayoresDeEdad, usuariosSinAlgunDato, usuariosTemaClaroMayoresDeEdadEspañoles } from "./biblioteca/ejercicio3.js";

import { mostrarArray, printObject } from "./biblioteca/util.js";

//--------------------------------  Ejercicio 1  -----------------------------------
console.log(`\n----------------------  Ejercicio 1 ---------------------------------\n`);
let nombres = ["Álvaro", "Tristan", "María", "Lucía", "Antonio"];

//Paso las palabras a mayúsculas, las ordeno al revés y las convierto a JSON.
console.log(`\nPunto 1.1:`);
mostrarArray(palabrasMayusculas(...nombres));

//Ordeno los nombres al revés.
console.log(`\nPunto 1.2:`);
mostrarArray(ordenadasAlReves(nombres));

//Convierto el array de nombres a JSON.
//Y lo muestro.
console.log(`\nPunto 1.3:`);
arrayToJSON(nombres).forEach((obj) => {
    printObject(obj);
});

//--------------------------------  Ejercicio 2  -----------------------------------
console.log(`\n----------------------  Ejercicio 2 ---------------------------------\n`);

//Creo 3 arrays de 10 números aleatorios entre 0 y 10.
let array1 = arrayDiezNumerosAleatorios();
let array2 = arrayDiezNumerosAleatorios();
let array3 = arrayDiezNumerosAleatorios();

//Creo el array con los números mayores que 5 de los 3 arrays anteriores.
let arrayMayorQueCinco = arrayElementosMayorQue([...array1,...array2,...array3], 5);

//Muestro los arrays.
mostrarArray(arrayMayorQueCinco);

//--------------------------------  Ejercicio 3  -----------------------------------
console.log(`\n----------------------  Ejercicio 3 ---------------------------------\n`);

const usuario = {
    nombre: "Pepito",
    preferencias: { tema: "oscuro", idioma: "español", edad: 30 },
    contacto: {
      direccion: {
        calle: "Calle nueva, 1",
        localidad: "Madrid",
        pais: "España",
      },
      correoelectronico: "pepito@correito.com",
      telefono: "123456789",
    }
};

console.log(`\nPunto 3.1`);

//Inserto el nuevo usuario en el array de usuarios.
let usuariosActualizado = insertarUsuario(usuario);

//Muestro el array de usuarios actualizado.
usuariosActualizado.forEach((usuario) => {
    printObject(usuario);
    console.log('-------------------------------');
});

console.log(`\nPunto 3.2`);

//Creo un nuevo array con los usuarios mayores de edad.
let usuariosMayores = usuariosMayoresDeEdad(usuariosActualizado);

//Muestro el array de usuarios mayores de edad.
usuariosMayores.forEach((usuario) => {
    printObject(usuario);
    console.log('-------------------------------');
});

console.log(`\nPunto 3.3`);

//Creo un nuevo array con los usuarios que tienen correo de Yahoo.
let usuariosYahoo = usuariosCorreoYahoo();

//Muestro el array de usuarios con correo de Yahoo.
usuariosYahoo.forEach((usuario) => {
    printObject(usuario);
    console.log('-------------------------------');
});

console.log(`\n Punto 3.4`);
//Creo un nuevo array con los usuarios que tienen el tema claro, son mayores de edad y son de España.
let usuariosClaroMayoresEspaña = usuariosTemaClaroMayoresDeEdadEspañoles();

//Muestro el array de usuarios que tienen el tema claro, son mayores de edad y son de España.
usuariosClaroMayoresEspaña.forEach((usuario) => {
    printObject(usuario);
    console.log('-------------------------------');
});

console.log(`\n Punto 3.5`);

//Creo un nuevo array con los usuarios que tienen algún dato de contacto vacío.
let usuariosSinDatos = usuariosSinAlgunDato(usuariosActualizado);

//Muestro el array de usuarios que tienen algún dato de contacto vacío.
usuariosSinDatos.forEach((usuario) => {
    printObject(usuario);
    console.log('-------------------------------');
});

console.log(`\n Punto 3.6`);

//Función que inserta el apellido "Pérez" a todos los usuarios y devuelve el nuevo array.
let usuariosConApellido = insertarApellido(usuariosActualizado);

//Muestro el array de usuarios con el apellido "Pérez" añadido.
usuariosConApellido.forEach((usuario) => {
    printObject(usuario);
    console.log('-------------------------------');
});

console.log(`\n Punto 3.7`);

//Función que inserta el código postal "00000" a todos los usuarios y devuelve el nuevo array.
let usuariosConCodigoPostal = insertarCodigoPostal(usuariosActualizado);

//Muestro el array de usuarios con el código postal "00000" añadido.
usuariosConCodigoPostal.forEach((usuario) => {
    printObject(usuario);
    console.log('-------------------------------');
});
