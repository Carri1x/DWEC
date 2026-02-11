import { createContext, useEffect, useState } from "react";
import useProductosAPI from "../hooks/useProductosAPI.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";

const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {
    const {
        lanzarMensaje,
        tiposDeMensaje
    } = useContextoMensajes();
    const nuevoProductoInicial = {
        nombre: "",
        precio: 0,
        peso: 0,
        imagen: "",
        descripcion: ""
    }
    const {
        cargando,
        mensajeCargando,
        traerProductosAPI,
        filtroProductosAPI, 
        ordenaProductosAPI,
        insertarProductoAPI,
        eliminarProductoAPI,
        editarProductoAPI,
        traerProductoPorIdAPI,
        borrarProductoDeTodasListasCompraAPI,
    } = useProductosAPI();

    const [productos, setProductos] = useState([]); //Estos son todos los productos principales que se hacen en la primera petición cuando se crea este Proovedor.
    const [productosFiltrados, setProductosFiltrados] = useState([]); //Estos son los productos que ha decidido filtrar el usuario, si los ha usado...
    const [nuevoProducto, setNuevoProducto] = useState(nuevoProductoInicial); //Estado que controla el nuevo producto que va a querer insertar el usuario.

    /**
     * Función que carga en el estado productos todos los productos existentes en la base de datos.
     * 
     * @async
     */
    const cargarProductos = async() => {
        try {
            const productosAPI =  await traerProductosAPI();
            setProductos(productosAPI);

        } catch (error) {  
            lanzarMensaje(error.message, tiposDeMensaje.error);
        } 
    }

    /**
     * Función que devuelve un producto por ID pasado por parámetro.
     * 
     * @async
     * @param {String (UUID)} idProducto 
     * @returns Devuelve el producto con ID que se pasa por parámetro.
     */
    const cargarProductoPorID = async(idProducto) => {
        try {
            const productoAPI = await traerProductoPorIdAPI(idProducto);
            return productoAPI;
        } catch (error) {
            lanzarMensaje(`CargarProductoPorID: ${error.message}`, tiposDeMensaje.error);
        }
    }

    /**
     * Función que hace una petición de filtrado entre todos los productos existentes de la base de datos.
     * 
     * IMPORTANTE: 
     * - En caso de querer camibar el la opción, las opciones son las columnas que tiene esa tabla.
     * 
     * @async
     * @param {String} filtro Es el valor el cual quiere el usuario filtrar todos sus productos.
     * @param {String} option (OPCIONAL) Es la opción que se da al usuario por la que prefiera filtrar la lista de productos.
     */
    const filtrarProductos = async(filtro, option = 'nombre') => {
        try {
            const productosAPI = await filtroProductosAPI(filtro, option);
            if(productosAPI.length === 0) {
                throw Error('No se han encontrado productos con ese filtro.');
            }
            setProductosFiltrados(productosAPI);
        } catch (error) {
            lanzarMensaje(error.message, tiposDeMensaje.error);
        } 
    }

    /**
     * Borra todos los productos FILTRADOS que se han pedido por petición a supabase.
     */
    const borrarFiltroProductos = () => {
        setProductosFiltrados([])
    }

    /**
     * Función que ordena todos los productos que existen en la base de datos.
     *
     * -Supabase devuelve esa lista ordenada por la columna que ha sido seleccionada.
     *
     * @async
     * @param {String} columna La columna por la que se va a querer ordenar.
     * @param {Boolean} orden TRUE si es ascendente y FALSE si es descendente.
     */
    const ordenarProductos = async(columna, orden) => {
        try {
            const productosAPI = await ordenaProductosAPI(columna, orden);
            setProductos(productosAPI);
        } catch (error) {
            lanzarMensaje(error.message, tiposDeMensaje.error);
        } 
    }

    /**
     * Función que usa el componente <CrearProducto /> para cambiar el estado `nuevoProducto` que a posteriori se insertará en la base de datos, como nuevo producto de todos los productos existentes.
     * 
     * IMPORTANTE: 
     * - Esta función no hace ninguna petición a al gestor de base de datos.
     * - Esta función solo controla y cambia el estado de un estado (valga la redundancia) de este proveedor.
     * 
     * @param {Event} evento 
     */
    const cambiarEstadoNuevoProducto = (evento) => {
        const {name, value} = evento.target;
        if(name === 'precio' || name === 'peso') {
            const valorParseado = value.replace(',', '.');
            setNuevoProducto({...nuevoProducto, [name]: parseFloat(valorParseado)});
        } else {
            setNuevoProducto({...nuevoProducto, [name]: value});
        }
    }

    /**
     * Función que inserta los datos en la base de datos con el nuevo producto que quiere crear el usuario.
     * 
     * @async
     */
    const crearProducto = async () => {
        try {
            await insertarProductoAPI(nuevoProducto);
            lanzarMensaje(`Producto ${nuevoProducto.nombre} creado correctamente.`);
            cargarProductos();
        } catch (error) {
            lanzarMensaje(error.message, tiposDeMensaje.error)
        } 
    }

    /**
     * Función que elimina un producto en la base de datos a través del ID que se ha pasado por parámetro.
     * 
     * IMPORTANTE!! DANGER!! IMPORTANTE!!:
     * ESTA FUNCIÓN `borrarProductoDeTodasListasCompraAPI(idProducto)` TOCA LA TABLA ---> ListasCompra_Productos <--- UTILIZAR ESTA FUNCIÓN CON PRECAUCIÓN.
     * 
     * @param {String (UUID)} idProducto ID del producto a eliminar.
     */
    const eliminarProducto = async(idProducto) => {
        try {
            //Eliminamos los productos de todas las listas  de los usuarios si no tenemos conflicto con las constraints y no podemos hacerlo.
            await borrarProductoDeTodasListasCompraAPI(idProducto)
            //Llamada a la API para eliminar el producto.
            await eliminarProductoAPI(idProducto);
            lanzarMensaje('Producto eliminado correctamente');
            cargarProductos();
        } catch (error) {
            lanzarMensaje(error.message, tiposDeMensaje.error);
        }
    }

    /**
     * Función que edita el producto en la base de datos, requiere un objeto producto el cual tenga todos sus datos (columnas) 
     * 
     * @param {Object} productoEditado 
     */
    const editarProducto = async(productoEditado) => {
        try {
            await editarProductoAPI(productoEditado);
            lanzarMensaje('Producto editado correctamente.');
            cargarProductos();
        } catch (error) {
            lanzarMensaje(error.message, tiposDeMensaje.error);
        } 
    }

    useEffect(() => {
        cargarProductos();
    }, []);


    const datosAExportar = {
        productos,
        cargando,
        mensajeCargando,
        cargarProductos,
        productosFiltrados,
        filtrarProductos,
        borrarFiltroProductos,
        ordenarProductos,
        cambiarEstadoNuevoProducto,
        crearProducto,
        eliminarProducto,
        editarProducto,
        cargarProductoPorID,
    }

    return (
        <contextoProductos.Provider value={datosAExportar}>
            {children}
        </contextoProductos.Provider>
    );
};
export default ProveedorProductos;
export {contextoProductos};