import { createContext, useEffect, useState } from "react"
import useContextoSesion from "../hooks/useContextoSesion.js";
import useListaCompraAPI from "../hooks/useListaCompraAPI.js";

const contextoListaCompra = createContext();
const ProveedorListaCompra = ({children}) => {
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
    const [mensaje, setMensaje] = useState('');
    const eliminarMensaje = () => {
        setMensaje('')
    }

    const cargarListasCompra = async() => {
        try {
            const listas = await traerListasAPI(usuario.id);
            setListasCompra(listas);
        } catch (error) {
            setMensaje(`CargarListasCompra: ${error.message}`)
        }

    }

    const crearListaCompra = async(nombre = 'Nueva lista') => {
        try {
            const data = await crearListaAPI(nombre, usuario.id);
            console.log(data);
            cargarListasCompra();
        } catch (error) {
            setMensaje(`CrearListaCompra: ${error.message}`);
        }
    }

    useEffect(() => {
        //Si no hay usuario lo obtenemos para poder acceder a sus listas.
        if(!usuario) {
            obtenerUsuario();
        }
    }, []);
    /**
     * Cargamos las listas de la compra del usuario en cuestión.
     * Tenemos que primero esperar que el usuario exista.
     */
    useEffect(() => {
        cargarListasCompra();
    },[usuario]);

    const cosasExportar = {
        cargando,
        mensaje,
        eliminarMensaje,
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