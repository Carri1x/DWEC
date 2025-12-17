"use strict";

import { traerDatos } from "./traerDatos.js";

export const traerPeliculas = async(url) => {
    const peliculas = await traerDatos(url);
    
    if(peliculas){
        return peliculas;
    }
}