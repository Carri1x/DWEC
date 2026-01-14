import React, { useState } from "react";

const useAPI = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const solicitud = async (url, options = {}) => {
        setCargando(true); //Cambiamos el estado a cargando la petición.
        setError(null); //Por si acaso contiene error el estado Error lo cambiamos a null.

        try {
            const respuesta = await fetch(url, {
                headers: {
                    "Content-Type": "application/json"
                },
                ...options
            });

            if (!respuesta.ok) {
                throw Error(`Error en la solicitud ${respuesta.status}: ${respuesta.statusText}`);
            }

            const datos = await respuesta.json();

            return datos;
        } catch (error) {
            setError(error.message || 'Algo a salido mal en la petición.');
            throw error;
        } finally {
            setCargando(false);
        }
    }

    /**
     * Hace la solicitud GET para recoger los datos que se han solicitado a la base de datos.
     * 
     * @param {String} url A la que se quiere solicitar los datos.
     * @returns Los datos que se han solicitado en la base de datos pasada por parámetro.
     */
    const obtener = (url) => {
        return solicitud(url);
    }

    const guardar = (url, body) => {
        return solicitud(url,{
            method : "POST",
            body: JSON.stringify(body)
        });
    }

    const editarPUT = (url, body) => {
        return solicitud(url, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    }

    const editarPATCH = (url, body) => {
        return solicitud(url, {
            method: "PATCH",
            body: JSON.stringify(body)
        });
    }

    const borrar = (url) => {
        return solicitud(url, {
            method: "DELETE"
        })
    }

    return {
        cargando,
        error,
        obtener,
        guardar,
        editarPUT,
        editarPATCH,
        borrar
    }

}

export default useAPI;