import { createContext, useEffect, useState } from "react";
import { traerPersonajes, traerVehiculos } from "../libraries/peticiones.js";

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
    const { urlPersonajes } = props;
    const [personajesCntxt, setPersonajesCntxt] = useState([]);
    const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
    const [vehiculosPersonaje, setVehiculosPersonaje] = useState([]);
    const [navesPersonaje, setNavesPersonaje] = useState([]);


    const cargarPersonajes = async (urls) => {
        try {
            const personajesDB = await traerPersonajes(urls);
            setPersonajesCntxt(personajesDB);
        } catch (error) {
            console.log(`Error ProveedorPersonajes: ${error}`)
        }

    }
    const cambiarPersonajeSeleccionado = (nombrePersonaje) => {
        const personaje = personajesCntxt.find((personaje) => personaje.name === nombrePersonaje);
        setPersonajeSeleccionado(personaje);
    }

    const cargarVehiculosPersonaje = async (urls) => {
        try{
            const vehiculosPersonaje = await traerVehiculos(urls);
            setVehiculosPersonaje(vehiculosPersonaje);
        } catch (error) {
            console.log(`Error vehículos: ${error}`);
        }
    }

    const cargarNavesPersonaje = async (urls) => {
        try{
            const navesPersonaje = await traerVehiculos(urls);
            setNavesPersonaje(navesPersonaje);
        }catch (error) {
            console.log(`Error naves: ${error}`)
        }
    }

    const vaciarVehiculosPersonaje = () => {
        setVehiculosPersonaje([]);
        setNavesPersonaje([]);
    }

    const cosasParaExportar = {
        personajesCntxt,
        personajeSeleccionado,
        cambiarPersonajeSeleccionado,
        vehiculosPersonaje,
        cargarVehiculosPersonaje,
        vaciarVehiculosPersonaje,
        navesPersonaje,
        cargarNavesPersonaje
    }

    useEffect(() => {
        cargarPersonajes(urlPersonajes);
    }, [urlPersonajes]);

    return (
        <>
            <contextoPersonajes.Provider value={cosasParaExportar}>
                {props.children}
            </contextoPersonajes.Provider>
        </>
    );
}

export default ProveedorPersonajes;
export { contextoPersonajes };
