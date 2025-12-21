"use strict";

import { traerDatos } from "./traerDatos.js";

export const traerPeliculas = async (urls) => {
    try {
        const peticiones = urls.map((url) => {
            return traerDatos(url);
        })

        //Recogemos la primera petición que se haya hecho.
        const respuesta = await Promise.any(peticiones);
        
        //Compruebo que los datos recibidos estén en el objeto results. 
        if(respuesta.results){
            return respuesta.results;
        } else { //Si no, vienen de otra api que no da las películas en ese objeto.
            return respuesta;
        }
    } catch (error) {
        throw error;
    }
    
}

export const traerPersonajes = async (urlsPersonajes) => {
    try{
        if(!urlsPersonajes) return;
        const peticiones = urlsPersonajes.map((url) => {
            return traerDatos(url);
        })
        const respuesta = await Promise.allSettled(peticiones);
        const personajes = respuesta.map((res) => {
            return res.value;
        });
        return personajes;
    } catch (error){
        throw error;
    }
}

export const traerVehiculos = async (urlsVehiculos) => {
    try{
        if(!urlsVehiculos) return;
        const peticiones = urlsVehiculos.map((url) => {
            return traerDatos(url);
        });

        const respuesta = await Promise.allSettled(peticiones);

        const vehiculos = respuesta.map((res) => {
            return res.value;
        });

        return vehiculos;
    } catch (error){
        throw error;
    }
}