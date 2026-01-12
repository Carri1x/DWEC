"use strict";

export const traerDatos = async (url) => {
    try{
        const respuesta = await fetch(url);

        if(!respuesta.ok) throw Error('Ha fallado la petición traer Datos.');

        const datos = await respuesta.json();

        return datos;
    } catch (error) {
        throw error;
    }
}