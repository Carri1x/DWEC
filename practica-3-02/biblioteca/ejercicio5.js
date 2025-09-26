"use strict";

import { cambiarFormatoEspanya } from "./util.js";

export const printObject = (object) =>{
    //Compruebo cada atributo del objeto.
    for (const clave in object) {
        //Comprobamos que ¡NO! tenga realmente esta propiedad.
        if(!object.hasOwnProperty(clave)) return ;
        //Si tiene la propiedad la imprimimos con su función.
        switch(object[clave]){
            case 'array':
                printArray();
                break;
            case 'number':
                cambiarFormatoEspanya(clave);

        }
    }
}

const printArray = (array) => {
    //Separamos esta simple función para que el método anterior sea más legible.
    array.forEach(element => {
        console.log(element);
    });
}

