"use strict"

import { comprobarQueEquipoTieneMejorMedia, puntuacionMedia } from "../biblioteca.js";

let puntosJuan = [89, 120, 103];
let puntosMiguel = [116, 94, 123];
let puntosMaria = [97, 134, 105];

console.log(`Puntuación del equipo de Juan = ${puntuacionMedia(puntosJuan)}`);
console.log(`Puntuación del equipo de Miguel = ${puntuacionMedia(puntosMiguel)}`);

console.log(comprobarQueEquipoTieneMejorMedia(puntosJuan, puntosMiguel));
console.log(comprobarQueEquipoTieneMejorMedia(puntosJuan, puntosMiguel, puntosMaria));