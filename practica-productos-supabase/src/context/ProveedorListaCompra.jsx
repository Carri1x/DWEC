import { createContext, useEffect, useState } from "react"
import useContextoSesion from "../hooks/useContextoSesion.js";
import useListaCompraAPI from "../hooks/useListaCompraAPI.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";

const contextoListaCompra = createContext();
const ProveedorListaCompra = ({children}) => {
    const {
        lanzarMensaje,
        tiposDeMensaje,
        confirmarAccion,
    } = useContextoMensajes();
    const {
        sesionIniciada,
        usuario,
    } = useContextoSesion();

    const {
        cargando,
        traerListasAPI,
        traerListaPorIdAPI,
        crearListaAPI,
        traerProductosDeLista,
    } = useListaCompraAPI();

    const [listasCompra, setListasCompra] = useState([]);
    const [lista, setLista] = useState({});

    const cargarListasCompra = async() => {
        try {
            const listas = await traerListasAPI(usuario.id);
            setListasCompra(listas);
        } catch (error) {
            lanzarMensaje(`CargarListasCompra: ${error.message}`, tiposDeMensaje.error)
        }
    }

    const cargarListaPorID = async(idLista) =>{
        try {
            let lista = await traerListaPorIdAPI(idLista);
            const productos = await traerProductosDeLista(idLista);
            lista = {...lista, productos: [...productos]};
            setLista(lista);
        } catch (error) {
            lanzarMensaje(`CargarListaPorID: ${error.message}`, tiposDeMensaje.error);
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
    
    const borrarLista = async() => {
        const confirmado = await confirmarAccion('Aun no se ha hecho esta funcionalidad BORRAR LISTA');
    }

    useEffect(() => {
        if(sesionIniciada && usuario.id){
            cargarListasCompra();
        }
    }, [sesionIniciada, usuario]); //Si la sesión está iniciada cargamos las listas de la compra.
    

    const cosasExportar = {
        cargando,
        lista,
        listasCompra,
        crearListaCompra,
        cargarListaPorID,
        borrarLista,
    }
    
    return (
        <contextoListaCompra.Provider value={cosasExportar}>
            {children}
        </contextoListaCompra.Provider>
    );
};

export default ProveedorListaCompra;
export {contextoListaCompra};