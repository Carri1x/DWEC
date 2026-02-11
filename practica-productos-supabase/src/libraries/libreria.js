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

export const formatearFechaHoraSupabase = (fechaSupabase) => {
    /*
        El formato de la fecha:
        2026-02-05T17:18:30.069755+00:00
    */
    let fecha = fechaSupabase.split('T')[0]; // 'FECHA'T'HORA'
    fecha = fecha.split('-'); //[YYYY,MM,DD]
    fecha = `${fecha[2]}/${fecha[1]}/${fecha[0]}`; //DD/MM/YYYY
    const hora = fechaSupabase.split('T')[1].split('.')[0];

    return `${fecha} a las ${hora}`;
}

/**
 * Función que formatea el estilo de la moneda al español de ESPAÑA. :es:
 * 
 * @param {Number} precio 
 * @returns Devuelve el precio formateado al Español de ESPAÑA. 
 */
export const formatearMonedaEspanya = (precio) => {
    if(!precio) return '-';
    return Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        useGrouping: true,
    }).format(precio)
} 

export const formatearPesoEspanya = (peso) => {
    if(!peso) return '-';
    return Intl.NumberFormat('es-ES', {
        useGrouping: true
    }).format(peso);
}
