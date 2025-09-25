"use strict";

export const curseInfo = (curse) => {
    //Recorro cada atributo que tiene curso.
    for (const attrib in curse) {
        //Compruebo que curso tenga esa misma propiedad.
        if(curse.hasOwnProperty(attrib)){
            //Imprimo el atributo y el valor de este.
            console.log(`${attrib}: ${curse[attrib]}`);
        }
    }
}