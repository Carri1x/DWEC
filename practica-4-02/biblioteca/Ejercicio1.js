"use strict";

const palabrasCensuradas = [
    'sexo',
    'sexual',
    'sexualizar',
    'sexuales',
    'pornografía'
];

/*
export const sustituirContenidoBloqueado = () => {
    //Extraigo todo el contenido de body.
    let body = document.body.innerHTML;
    console.log(body);
    //Compruebo que cada palabra que aparece en body no sea ninguna de las palabras censuradas previamente
      //selecionadas en el array palabrasCensuradas.
    for (const palabra of body) {
        //Si la palabra en el body coincide con alguna de estas palabras censuradas la cambiamos.
        for (const palabraCensurada of palabrasCensuradas) {
            if(palabraCensurada == palabra){
                palabra= '<strong class = "censurado">Contenido Bloqueado</strong>';
            }
        }
    }
    //Una vez cambiadas las palabras censuradas volvemos a inyectar el HTML en el body.
    document.body.innerHTML = body;
}
*/

export const sustituirContenidoBloqueado = () => {
    let body = document.body.innerHTML;
    for (const palabraCensurada of palabrasCensuradas) {
        body.replaceAll(palabraCensurada, '<strong class = "censurado">Contenido Bloqueado</strong>');
    }
    document.body.innerHTML = body;
}


