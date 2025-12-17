"use strict";

export const traerDatos = async (url) => {

    try {
        let respuesta = await fetch(url);

        if (!respuesta.ok) throw new Error('Error de respuesta en traer datos.');

        const datos = await respuesta.json();

        return datos;
    } catch (error) {
        throw error;
    }

}