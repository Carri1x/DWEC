import { createContext, useEffect, useState } from "react";
import useProductosAPI from "../hooks/useProductosAPI.js";

const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {
    const errorInicial = '';
    const nuevoProductoInicial = {
        nombre: "",
        precio: 0,
        peso: 0,
        imagen: "",
        descripcion: ""
    }
    const { 
        traerProductosAPI,
        filtroProductosAPI, 
        ordenaProductosAPI,
        insertarProductoAPI,
        eliminarProductoAPI,
        editarProductoAPI,
    } = useProductosAPI();

    const [productos, setProductos] = useState([]); //Estos son todos los productos principales que se hacen en la primera petición cuando se crea este Proovedor.
    const [productosFiltrados, setProductosFiltrados] = useState([]); //Estos son los productos que ha decidido filtrar el usuario, si los ha usado...
    const [mensajeProductos, setMensajeProductos] = useState(errorInicial); // Mensaje de error para toda la sección productos.
    const [cargando, setCargando] = useState(false); //El control de cargado, cuanto tiempo está haciendose cualquiera de las peticiones que se han hecho aquí.
    const [nuevoProducto, setNuevoProducto] = useState(nuevoProductoInicial); //Estado que controla el nuevo producto que va a querer insertar el usuario.

    const cargarProductos = async() => {
        setCargando(true);
        try {
            const productosAPI =  await traerProductosAPI();
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
            const productosAPI = await filtroProductosAPI(filtro, option);
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
            const productosAPI = await ordenaProductosAPI(columna, orden);
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

    const cambiarEstadoNuevoProducto = (evento) => {
        const {name, value} = evento.target;
        if(name === 'precio' || name === 'peso') {
            const valorParseado = value.replace(',', '.');
            setNuevoProducto({...nuevoProducto, [name]: parseFloat(valorParseado)});
        } else {
            setNuevoProducto({...nuevoProducto, [name]: value});
        }
    }

    const crearProducto = async () => {
        setCargando(true);
        try {
            await insertarProductoAPI(nuevoProducto);
            setMensajeProductos(`Producto ${nuevoProducto.nombre} creado correctamente.`);
            cargarProductos();
        } catch (error) {
            setMensajeProductos(error.message)
            console.log(error)
        } finally {
            setCargando(false);
        }
    }

    const eliminarProducto = async(id) => {
        setCargando(true);
        try {
            //Llamada a la API para eliminar el producto.
            await eliminarProductoAPI(id);
            setMensajeProductos('Producto eliminado correctamente.');
            cargarProductos();
        } catch (error) {
            setMensajeProductos(error.message);
        } finally {
            setCargando(false);
        } 
    }

    const editarProducto = async(productoEditado) => {
        setCargando(true);
        try {
            //Llamada a la API para editar el producto.
            await editarProductoAPI(productoEditado);
            setMensajeProductos('Producto editado correctamente.');
            cargarProductos();
        } catch (error) {
            setMensajeProductos(error.message);
        } finally {
            setCargando(false);
        }
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
        cambiarEstadoNuevoProducto,
        crearProducto,
        eliminarProducto,
        editarProducto,
    }

    return (
        <contextoProductos.Provider value={datosAExportar}>
            {children}
        </contextoProductos.Provider>
    );
};
export default ProveedorProductos;
export {contextoProductos};