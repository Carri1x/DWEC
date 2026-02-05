import { createContext, useEffect, useState } from "react"
import useContextoSesion from "../hooks/useContextoSesion.js";
import useListaCompraAPI from "../hooks/useListaCompraAPI.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";

const contextoListaCompra = createContext();
const ProveedorListaCompra = ({children}) => {
    const {
        lanzarMensaje,
        tiposDeMensaje
    } = useContextoMensajes();
    const {
        sesionIniciada,
        usuario,
    } = useContextoSesion();

    const {
        cargando,
        traerListasAPI,
        crearListaAPI,
    } = useListaCompraAPI();

    const [listasCompra, setListasCompra] = useState([]);

    const cargarListasCompra = async() => {
        try {
            const listas = await traerListasAPI(usuario.id);
            console.log(usuario.id)
            setListasCompra(listas);
        } catch (error) {
            lanzarMensaje(`CargarListasCompra: ${error.message}`, tiposDeMensaje.error)
        }
    }

    const crearListaCompra = async(nombre = 'Nueva lista') => {
        try {
            const data = await crearListaAPI(nombre, usuario.id);
            cargarListasCompra();
            lanzarMensaje(`Lista '${nombre}' creada correctamente.`, tiposDeMensaje.ok);
        } catch (error) {
            lanzarMensaje(`CrearListaCompra: ${error.message}`,tiposDeMensaje.error);
        }
    }

    useEffect(() => {
        if(sesionIniciada && usuario.id){
            cargarListasCompra();
        }
    }, [sesionIniciada, usuario]); //Si la sesión está iniciada cargamos las listas de la compra.
    

    const cosasExportar = {
        cargando,
        listasCompra,
        crearListaCompra,
    }
    
    return (
        <contextoListaCompra.Provider value={cosasExportar}>
            {children}
        </contextoListaCompra.Provider>
    );
};

export default ProveedorListaCompra;
export {contextoListaCompra};