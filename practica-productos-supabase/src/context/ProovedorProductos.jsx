import { createContext, useEffect, useState } from "react";
import useProductosAPI from "../hooks/useProductosAPI.js";

const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {
    const errorInicial = '';

    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [mensaje, setMensaje] = useState(errorInicial);
    const [cargando, setCargando] = useState(false);
    const { traerProductos, filtroProductos } = useProductosAPI();

    const cargarProductos = async() => {
        try {
            setCargando(true);
            const productosAPI =  await traerProductos();
            setProductos(productosAPI);

        } catch (error) {  
            setMensaje(error.message);
        } finally {
            setCargando(false);
        }
    }

    const filtrarProductos = async(filtro, option = 'nombre') => {
        try {
            setCargando(true);
            const productosAPI = await filtroProductos(filtro, option);
            setProductosFiltrados(productosAPI);
        } catch (error) {
            setMensaje(error.message);
        } finally {
            setCargando(false);
        }
    }

    const borrarFiltroProductos = () => {
        setProductosFiltrados([])
    }

    useEffect(() => {
        cargarProductos();
    }, []);

    

    const datosAExportar = {
        productos,
        cargando,
        mensaje,
        cargarProductos,
        productosFiltrados,
        filtrarProductos,
        borrarFiltroProductos
    }

    return (
        <contextoProductos.Provider value={datosAExportar}>
            {children}
        </contextoProductos.Provider>
    );
};
export default ProveedorProductos;
export {contextoProductos};