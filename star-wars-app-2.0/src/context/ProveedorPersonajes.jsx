import { createContext, useEffect, useState } from "react";
import { traerPersonajes } from "../libraries/peticiones.js";

/**
 * No se hasta que punto esta forma es la más adecuada para hacer un contexto y proveedor.
 * 
 * He pensado que ya que los personajes van a tener una lista de nombres y luego una fichaPersonajes
 *  para que se puedan ver los detalles de este, para que haya una buena comunicación entre estos componentes
 *  es buena idea un proveedor para que este se encargue de buscar los datos de todos los personajes...
 * 
 * Dime que te parece la idea... 
 * 
 * El único incombeniente que veo es que en este proveedor ProveedorPersonajes depende de una serie de personajes que se le pasan
 * por props, pero he pensado que la mejor opción que las peticiones y los asíncronismos se encarguen estos proveedores. 
 */
const contextoPersonajes = createContext();

const ProveedorPersonajes = (props) => {
    const {urlPersonajes} = props;
    const [personajes, setPersonajes] = useState([]);

    const cargarPersonajes = async (urls) => {
        console.log(urls)
        const personajesDB = await traerPersonajes(urls);
        setPersonajes(personajesDB);
    }


    useEffect(()=>{
        //Me estaba devolviendo undefined...
        if(!urlPersonajes) return;
        cargarPersonajes(urlPersonajes);
    },[urlPersonajes]);

    return (
        <>
            <contextoPersonajes.Provider value={personajes}>
                {props.children}
            </contextoPersonajes.Provider>
        </>
    );
}

export default ProveedorPersonajes;
export {contextoPersonajes};
