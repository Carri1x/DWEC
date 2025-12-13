"use strict";

export const traerDatos = async (url) => {
    try{
        //Hacemos la petición y recogemos la respuesta.
        const respuesta = await fetch(url);
        //En caso de que no esté bien lanzamos un error.
        if(!respuesta.ok) throw new Error(`Error traer datos: ${respuesta.status} -> ${respuesta.statusText}`);

        //Parseamos los datos a JSON
        const datos = await respuesta.json();

        //Podría comprobar si en datos está results, pero prefiero hacerlo en la función de 
        return datos;
    }catch(error) {
        //Recogemos el error si existe y lo lanzamos fuera de la función.
        throw error;
    }
}