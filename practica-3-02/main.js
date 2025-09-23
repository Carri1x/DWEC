"use strict";

import {curseConstructor} from './biblioteca/ejercicio1.js';

//---------------------------------Ejercicio 1 ---------------------------------------------
console.log(curseConstructor());

//Parece que crea correctamente el objeto con este tipo de constructor.
//Voy a probar a manejar los atributos de este

let curse = curseConstructor();
curse.curseName = "2ºDAW"

