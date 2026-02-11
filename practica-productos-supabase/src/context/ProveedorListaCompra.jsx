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
    } = useContextoMensajes();
    const {
        sesionIniciada,
        usuario,
    } = useContextoSesion();

    const {
        cargando,
        mensajeCargando,
        traerListasAPI,
        traerListaPorIdAPI,
        crearListaAPI,
        traerProductosDeListaAPI,
        añadirProductoAPI,
        actualizarProductoCantidadAPI,
        borrarProductoDeListaAPI,
        borrarListaAPI,
    } = useListaCompraAPI();

    /**
     * Esta función se encarga de cargar una lista de la compra por su ID, y también de cargar los productos de esa lista para tener toda la información necesaria en el estado "lista" que se usará para mostrar los detalles de la lista en la pantalla.
     */
    const {
        cargarProductoPorID,
    } = useContextoProductos();

    // Estado para almacenar las listas de la compra del usuario y la lista de la compra que se está visualizando actualmente.
    const [listasCompra, setListasCompra] = useState([]);
    const [lista, setLista] = useState({}); //Esta es la lista que se está visualizando actualmente, con sus productos incluidos; dentro del atributo: lista.productos.

    /**
     * Función que se encarga de cargar las listas de la compra del usuario, 
     * para mostrarlas en el menú lateral. 
     * Se llama cuando se inicia sesión y se detecta que hay un usuario con ID, 
     * y también después de crear o borrar una lista para actualizar el menú lateral.
     * 
     * IMPORTANTE: 
     * - Esta función está usandose en otras funciónes de este proovedor, también se usa en otros componentes de la aplicación.
     * 
     * @async
     */
    const cargarListasCompra = async() => {
        try {
            const listas = await traerListasAPI(usuario.id);
            setListasCompra(listas);
        } catch (error) {
            lanzarMensaje(`CargarListasCompra: ${error.message}`, tiposDeMensaje.error)
        }
    }
    /**
     * Función que se encarga de cargar una lista de la compra por su ID, 
     * y también de cargar los productos de esa lista para tener toda la información necesaria en el estado "lista".
     * 
     * @async
     * @param {String (UUID)} idLista 
     */
    const cargarListaPorID = async(idLista) =>{
        try {
            // 1. Cargamos la información de la lista.
            let lista = await traerListaPorIdAPI(idLista);
            /* 2. Cargamos los productos de esta lista. 
                IMPORTANTE: 
                - Acuerdate que traerProductosDeListaAPI(idLista) devuelve el ID del producto y la CANTIDAD de este producto que le ha asignado el usuario. 
            */
            let refListaProducto = await traerProductosDeListaAPI(idLista);
            // 3. Con los IDs de los productos de esta lista, traemos la información completa de cada uno de estos productos desde el catálogo global de productos.
            let productos = refListaProducto.map( async(ref) => {
                // Hacemos petición de cada producto con su ID para que nos devuelva toda su información.
                const producto = await cargarProductoPorID(ref.id_Producto);
                // Devolvemos toda la información del producto, con la cantidad que hemos extraido en la petición traerProductosDeListaAPI(idLista)
                return {
                    ...producto,
                    cantidad: ref.cantidad,
                } 
            });    
            // 3. Recogemos todas las promesas controladamente cuando estén `Settled`, hechas en el paso 3.
            productos = await Promise.allSettled(productos);
            // 4. Convertimos los objetos que devuelve Promise.allSettled() a solamente los productos que necesitamos.
            productos = productos.map(p => p.value);
            // 5. Añadimos estos productos a la lista que le corresponde.
            lista = {...lista, productos: [...productos]};
            // 6. Seteamos la lista al estado Lista que se comparte con todos los componentes.
            setLista(lista);
        } catch (error) {
            lanzarMensaje(`CargarListaPorID: ${error.message}`, tiposDeMensaje.error);
        }
    }

    /**
     * Función que crea una lista de la compra para un usuario en concreto por su ID.
     * 
     * Cuando se haya creado esta lista se llamará a la función cargar listas para que esté la lista de listas acutalizada.
     * 
     * @async
     * @param {String} nombre (Opcional) En caso de no pasar por parámetro un nombre se le asigará el nombre por defecto 'Nueva lista'.
     */
    const crearListaCompra = async(nombre = 'Nueva lista') => {
        try {
            const data = await crearListaAPI(nombre, usuario.id);
            cargarListasCompra();
            lanzarMensaje(`Lista '${nombre}' creada correctamente.`, tiposDeMensaje.ok);
        } catch (error) {
            lanzarMensaje(`CrearListaCompra: ${error.message}`,tiposDeMensaje.error);
        }
    }

    /**
     * Función que borra una lista por ID.
     * 
     * Cuando se haya borrado esta lista se llamará a la función cargar listas para que esté la lista de listas acutalizada.
     * 
     * @async
     * @param {String (UUID)} idLista 
     */
    const borrarListaPorID = async(idLista) => {
        try {
            const data = await borrarListaAPI(idLista);
            cargarListasCompra();
            lanzarMensaje(`La lista '${lista.nombre} ha sido borrada.'`)
        } catch (error) {
            lanzarMensaje(`BorrarLista: ${error.message}`,tiposDeMensaje.error);
        }
    }

    /**
     * Función que añade un producto dentro de una lista.
     * Em el momento que se ha añadido este producto volvemos a cargar la información que se ha insertado en la base de datos.
     * 
     * IMPORTANTE:
     * - La información de este producto solo es el ID y la cantidad que se ha añadido en esta lista.
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @param {String (UUID)} idProducto 
     * @returns La información de este producto insertado.
     */
    const añadirProducto = async(idLista, idProducto) => {
        try {
            const data = await añadirProductoAPI(idLista, idProducto);
            cargarListaPorID(idLista);
            return data;
        } catch (error) {
            lanzarMensaje(`AñadirProducto: ${error.message}`, tiposDeMensaje.error)
        }
    }

    /**
     * Función que actualiza la cantidad del producto que está insertado en una lista en concreto.
     * 
     * @example En la tabla de la base de datos: 
     * 
     * 1. Parámetros(idLista=213, idProducto=45, cantidad=12)
     * 
     * 2. DatosYaGuardadosEnLaBaseDeDatos(idLista=213, idProducto=45, cantidad=1)
     * 
     * 3. Resultado(idLista=213, idProducto=45, cantidad=12)
     * 
     * RESULTADO = En la lista 213, se a actualizado la cantidad del producto 45 a 12 unidades. 
     * 
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @param {String (UUID)} idProducto 
     * @param {Number} cantidad 
     */
    const actualizarProductoCantidad = async(idLista, idProducto, cantidad) => {
        try {
            const data = await actualizarProductoCantidadAPI(idLista, idProducto, cantidad);
            cargarListaPorID(idLista);
            const producto = lista.productos.find((p) => {
                return p.id === idProducto
            });
            console.log(producto)
            lanzarMensaje(`Producto ${producto.nombre} actualizado correctamente.`)
        } catch (error) {
            lanzarMensaje(`ActualizarProductoCantidad: ${error.message}`, tiposDeMensaje.error);
        }
    }

    /**
     * Función que borra todos los productos de la lista por ID.
     * 
     * @param {String (UUID)} idLista 
     * @param {String (UUID)} idProducto 
     * @returns Devuelve todos los productos de la lista que se han borrado.
     */
    const borrarProductoDeLista = async(idLista, idProducto) => {
        try {
            const data = await borrarProductoDeListaAPI(idLista, idProducto);
            cargarListaPorID(idLista);
            return data;
        } catch (error) {
            lanzarMensaje(`BorrarProductoDeLista: ${error.message}`, tiposDeMensaje.error);
        }
    }
    

    /**
     * USE EFFECT que carga todas las listas que tiene el usuario si tiene la sesión iniciada.
     * 
     * También se hace la comprobación por usuario.id, porque daban errores de que el ID del usuario era `undefined`.
     */
    useEffect(() => {
        if(sesionIniciada && usuario.id){
            cargarListasCompra();
        }
    }, [sesionIniciada, usuario]); //Si la sesión está iniciada cargamos las listas de la compra.
    

    const cosasExportar = {
        cargando,
        mensajeCargando,
        lista,
        listasCompra,
        crearListaCompra,
        cargarListaPorID,
        borrarListaPorID,
        añadirProducto,
        actualizarProductoCantidad,
        borrarProductoDeLista
    }
    
    return (
        <contextoListaCompra.Provider value={cosasExportar}>
            {children}
        </contextoListaCompra.Provider>
    );
};

export default ProveedorListaCompra;
export {contextoListaCompra};