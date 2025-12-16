"use strict";

export const traerDatos = async (url) => {
    try{
        const respuesta = await fetch(url);

        if(!respuesta.ok) throw new Error('Ha habido un error en la petición.')
        
        const datos = await respuesta.json();

        if(datos.value){
            return datos.value
        } else if(datos.results){
            return datos.results;
        } else {
            return datos;
        }
    } catch (error){
        throw error;
    }

}