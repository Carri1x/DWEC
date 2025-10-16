"use strict";

const sustituirContenidoBloqueado = () => {
    let palabrasCensuradas = [
    'sexualizar',
    'sexuales',
    'sexo',
    'sexual', 
    'pornografía'
    ];
    let cuerpo = document.body.innerHTML;
    let cuerpoNuevo = document.body;
    for (const palabraCensurada of palabrasCensuradas) {
        cuerpo = cuerpo.replaceAll(
            palabraCensurada,
            '<strong class = "censurado">Contenido Bloqueado</strong>'
        );
    }
    cuerpoNuevo.innerHTML = cuerpo;
}

export {sustituirContenidoBloqueado};

