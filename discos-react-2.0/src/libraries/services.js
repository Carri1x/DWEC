"use strict";
import { traerDatos } from './traerDatos.js';
const urlBase = "http://localhost:3000/discos";

export const traerDiscos = async () => {
    try {
        const respuesta = await traerDatos(urlBase);

        return respuesta;
    } catch (error) {
        throw error;
    }
}

