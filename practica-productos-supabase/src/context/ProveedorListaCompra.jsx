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
        usuario,
        obtenerUsuario,
    } = useContextoSesion();

    const {
        cargando,
        traerListasAPI,
        crearListaAPI,
    } = useListaCompraAPI();

    const [listasCompra, setListasCompra] = useState('');

    const cargarListasCompra = async() => {
        /*
        try {
            const listas = await traerListasAPI(usuario.id);
            setListasCompra(listas);
        } catch (error) {
            lanzarMensaje(`CargarListasCompra: ${error.message}`, tiposDeMensaje.error)
        }*/

    }

    const crearListaCompra = async(nombre = 'Nueva lista') => {
        try {
            console.log("Si está entrando en crearListaCompra")
            const data = await crearListaAPI(nombre, usuario.id);
            console.log(data);
            cargarListasCompra();
        } catch (error) {
            lanzarMensaje(`CrearListaCompra: ${error.message}`,tiposDeMensaje.error);
        }
    }

    useEffect(() => {
        //Si no hay usuario lo obtenemos para poder acceder a sus listas.
        if(!usuario) {
            obtenerUsuario();
        } else {
            cargarListasCompra();
        }
    }, []);
    

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