import { createContext, useEffect, useState } from "react";
import useProductosAPI from "../hooks/useProductosAPI.js";

const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {
    const errorInicial = '';

    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [mensajeProductos, setMensajeProductos] = useState(errorInicial);
    const [cargando, setCargando] = useState(false);
    const { traerProductos, filtroProductos, ordenaProductos } = useProductosAPI();

    const cargarProductos = async() => {
        setCargando(true);
        try {
            const productosAPI =  await traerProductos();
            setProductos(productosAPI);

        } catch (error) {  
            setMensajeProductos(error.message);
        } finally {
            setCargando(false);
        }
    }

    const filtrarProductos = async(filtro, option = 'nombre') => {
        setCargando(true);
        try {
            const productosAPI = await filtroProductos(filtro, option);
            if(productosAPI.length === 0) {
                throw Error('No se han encontrado productos con ese filtro.');
            }
            setProductosFiltrados(productosAPI);
        } catch (error) {
            setMensajeProductos(error.message);
        } finally {
            setCargando(false);
        }
    }

    const borrarFiltroProductos = () => {
        setProductosFiltrados([])
    }

    const ordenarProductos = async(columna, orden) => {
        setCargando(true);
        try {
            const productosAPI = await ordenaProductos(columna, orden);
            setProductos(productosAPI);
        } catch (error) {
            setMensajeProductos(error.message);
        } finally {
            setCargando(false);
        }
    }

    const eliminarMensajeProductos = () => {
        setMensajeProductos(errorInicial);
    }

    useEffect(() => {
        cargarProductos();
    }, []);

    

    const datosAExportar = {
        productos,
        cargando,
        mensajeProductos,
        eliminarMensajeProductos,
        cargarProductos,
        productosFiltrados,
        filtrarProductos,
        borrarFiltroProductos,
        ordenarProductos,
    }

    return (
        <contextoProductos.Provider value={datosAExportar}>
            {children}
        </contextoProductos.Provider>
    );
};
export default ProveedorProductos;
export {contextoProductos};