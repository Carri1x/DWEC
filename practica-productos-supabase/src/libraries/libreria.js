"use strict";

export const filtrarObjeto = (objeto, caracteristicaParaFiltrar) => {
    for (const atributo in objeto) {
        if (!Object.hasOwn(objeto, atributo)) continue;
        if(typeof objeto[atributo] !== 'string' || objeto[atributo] === '') continue;
        if(atributo === 'id') continue;
        if(atributo === 'img')continue;
        const valor = objeto[atributo].toLowerCase();
        if(valor.includes(caracteristicaParaFiltrar.toLowerCase())) return true;
    }
    return false;
}