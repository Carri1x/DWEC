"use strict";

import { cambiarFormatoEspanya } from "./util.js";

export const printObject = (object) => {
    //Compruebo cada atributo del objeto.
    for (const clave in object) {
        //En caso de no tener esa propiedad la obviará.
        if (!object.hasOwnProperty(clave)) continue;
            
        //Obtengo el valor de la clave.
        const valor = object[clave];
        
        if (Array.isArray(valor)) {
            //Pongo directamente que es un array dado que JavaScript lo reconoce como Object y no como Array.
            console.log(`El atributo es: ${clave}, de tipo Array y contiene:`);
            printArray(valor);
        } else if (typeof valor === "object" && valor !== null) {
            console.log(`El atributo es: ${clave}, de tipo ${typeof valor} y contiene:`);
            printObject(valor);
        } else if (typeof valor === "number") {
            console.log(`El atributo es: ${clave}, de tipo ${typeof valor} y contiene: ${cambiarFormatoEspanya(valor)}.`);
        } else {
            console.log(`El atributo es: ${clave}, de tipo ${typeof valor} y contiene: ${valor}.`);
        }
    }
};

const printArray = (array) => {
    return array.forEach((element) => {
        //Si dentro del array hay otro array o un objecto seleccionamos que hacer con el.
        if(Array.isArray(element)){
            printArray(element);
        }
        else if(typeof element === 'object' && element !== null) {
            //En caso de ser un objeto usamos la anterior función.
            printObject(element);
        }else if(typeof element === 'number'){
            //Si es simplemente un elemento lo imprimimos.
            console.log(cambiarFormatoEspanya(element));
        }else{
            console.log(element);
        }
     
    });
}