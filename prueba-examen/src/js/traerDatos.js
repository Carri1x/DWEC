"use strict";

export const traerDatos = async(url) => {
    try{
        const respuesta = await fetch(url);
    
        if(!respuesta.ok) throw new Error('No hay datos de la petición');
    
        const datos = await respuesta.json();

        return datos;
    } catch (error){
        throw error;
    }


}