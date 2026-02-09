import { createContext, useEffect, useState } from "react"
import useContextoSesion from "../hooks/useContextoSesion.js";
import useListaCompraAPI from "../hooks/useListaCompraAPI.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import useContextoProductos from "../hooks/useContextoProductos.js";

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
        traerProductosDeListaAPI,
        añadirProductoAPI,
        actualizarProductoCantidadAPI,
    } = useListaCompraAPI();

    const {
        cargarProductoPorID,
    } = useContextoProductos();

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
            let refListaProducto = await traerProductosDeListaAPI(idLista);
            let productos = refListaProducto.map( async(ref) => {
                const producto = await cargarProductoPorID(ref.id_Producto);
                return {
                    ...producto,
                    cantidad: ref.cantidad,
                } 
            });    
            productos = await Promise.allSettled(productos);
            productos = productos.map(p => p.value);

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

    const añadirProducto = async(idLista, idProducto) => {
        try {
            const data = await añadirProductoAPI(idLista, idProducto);
            cargarListaPorID(idLista);
            return data;
        } catch (error) {
            lanzarMensaje(`AñadirProducto: ${error.message}`, tiposDeMensaje.error)
        }
    }

    const actualizarProductoCantidad = async(idLista, idProducto, cantidad) => {
        try {
            const data = await actualizarProductoCantidadAPI(idLista, idProducto, cantidad);
            cargarListaPorID(idLista);
        } catch (error) {
            lanzarMensaje(`ActualizarProductoCantidad: ${error.message}`, tiposDeMensaje.error);
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
        añadirProducto,
        actualizarProductoCantidad
    }
    
    return (
        <contextoListaCompra.Provider value={cosasExportar}>
            {children}
        </contextoListaCompra.Provider>
    );
};

export default ProveedorListaCompra;
export {contextoListaCompra};