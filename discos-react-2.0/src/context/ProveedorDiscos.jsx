import { createContext, useEffect, useState } from "react";
import { traerDiscos } from "../libraries/services.js";


const contextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {

    const urlBase = "http://localhost:3000/discos";
    const [discos, setDiscos] = useState([]);


    const cargarDiscos = async () => {
        try {
            const discosDB = await traerDiscos();

            if (discosDB.length < 0) throw Error('No hay discos insertados en la base de datos...');

            //Si han llegado correctamente los discos de la base de datos actualizamos el estado discos.
            setDiscos(discosDB);
        } catch (error) {
            //Aquí informaremos al usuario de que la petición no ha salido correctamente...
        }

    }

    /*************************************************** DUDA *******************************************
     * Hay un problema. Tengo el uuid el cual yo identifico el disco pero json-server necesita un id, por lo que json-server genera el suyo propio.
     * He preguntado a la IA si debería generarlo yo con crypto:randomUUID y me ha dicho que no. Que no es necesario. A mi me resulta algo inútil.
     * Voy a dejar solo un id y me comentas que es la mejor opción. Creo que esto de generar dos ids distintos puede llegar a ser confuso cuando usar uno y otro. Luego puede generar más errores. 
     */
    const guardarDisco = async (disco) => {
        try {
            const respuesta = await fetch(urlBase, {
                method: "post",
                body: JSON.stringify(disco)
            });
            if (!respuesta.ok) throw Error('Guardar Disco: No se ha podido guardar el disco.');

            return disco;
        } catch (error) {
            throw error;
        }
    }

    const buscarDiscoPorId = async (id) => {
        try {
            const respuesta = await fetch(`${urlBase}/${id}`);
            if (!respuesta.ok) throw new Error("No se encontró el disco");
            const disco = await respuesta.json();
            return disco;
        } catch (error) {
            throw error;
        }
    }

    const cosasAExportar = {
        discos,
        guardarDisco,
        buscarDiscoPorId
    }

    useEffect(() => { //INICIALMENTE CARGAMOS LOS DISCOS QUE 
        cargarDiscos();
    }, []);

    return (
        <contextoDiscos.Provider value={cosasAExportar} >
            {children}
        </contextoDiscos.Provider>
    );
}

export default ProveedorDiscos;
export { contextoDiscos };