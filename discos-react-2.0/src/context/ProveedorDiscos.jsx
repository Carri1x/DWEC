import { createContext, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI.js";


const contextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {

    const urlBase = "http://localhost:3000/discos";
    const [discos, setDiscos] = useState([]);
    const { obtener, guardar, editarPUT, editarPATCH, borrar } = useAPI();

    const cargarDiscos = async () => {
        try {
            const discosDB = await obtener(urlBase);
            setDiscos(discosDB);
        } catch (error) {
            throw error;
        }
    }

    /*************************************************** DUDA *******************************************
     * Hay un problema. Tengo el uuid el cual yo identifico el disco pero json-server necesita un id, por lo que json-server genera el suyo propio.
     * He preguntado a la IA si debería generarlo yo con crypto:randomUUID y me ha dicho que no. Que no es necesario. A mi me resulta algo inútil.
     * Voy a dejar solo un id y me comentas que es la mejor opción. Creo que esto de generar dos ids distintos puede llegar a ser confuso cuando usar uno y otro. Luego puede generar más errores. 
     */
    const guardarDisco = async (disco) => {
        try {
            await guardar(urlBase, disco);
            cargarDiscos();
        } catch (error) {
            throw error;
        }
    }

    const buscarDiscoPorId = async (id) => {
        try {
            const disco = obtener(`${urlBase}/${id}`);
            return disco;
        } catch (error) {
            throw error;
        }
    }

    const editarDiscoCompleto = async (id, disco) => {
        try {
            await editarPUT(`${urlBase}/${id}`, disco);
            cargarDiscos();
        } catch (error) {
            throw error;
        }
    }

    const editarDiscoParcial = async (id, camposActualizar) => {
        try {
            await editarPATCH(`${urlBase}/${id}`, camposActualizar);
            cargarDiscos();
        } catch (error) {
            throw error;
        }
    }

    const borrarDiscoPorID = async (id) => {
        try{
            await borrar(`${urlBase}/${id}`);
            cargarDiscos();
        } catch (error) {
            throw error;
        }
    }


    const cosasAExportar = {
        discos,
        guardarDisco,
        buscarDiscoPorId,
        editarDiscoCompleto,
        editarDiscoParcial,
        borrarDiscoPorID
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