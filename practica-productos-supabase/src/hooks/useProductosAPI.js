import { supabaseConexion } from "../supabase/Supabase.js";
import { useState } from "react";

/**
 * Hook/API de acceso a la tabla `Productos` en Supabase.
 * Centraliza todas las operaciones CRUD y consultas relacionadas con productos.
 * 
 * @returns {Object} Conjunto de funciones para interactuar con la API de productos
 */
const useProductosAPI = () => {
    const [cargando, setCargando] = useState(false);
    const [mensajeCargando, setMensajeCargando] = useState('');

    /**
     * Función general que abstrae la lógica del error y los datos que devuelve supabase. Por lo que las siguientes peticiónes especificas solo tendrán que fijarse en las PETICIONES de los datos requeridos para estos.
     * 
     * @async
     * @param {Function} query Consulta que se hará al gestor de base de datos supabase.
     * @throws {Error} Específicamente devuelve el error que ha surgido en el gestor SUPABASE, porque ha ocurrido y en que parte ha acurrido del gestor.
     * @returns Los datos que se han sugerido al gestor de base de datos SUPABASE
     */
    const peticion = async(query) => {
        setCargando(true);
        try {
            const {data, error} = await query;
            if(error) throw error;
            return data;
        } catch (error) {
            throw error;
        } finally {
            setCargando(false);
            setMensajeCargando('')
        }
    }
 
    /**
     * Obtiene todos los productos almacenados en la tabla `Productos`.
     * 
     * @async
     * @returns {Promise<Array>} Lista completa de productos
     * @throws {Error} Si ocurre un error en la petición a Supabase
     */
    const traerProductosAPI = async() => {
        setMensajeCargando('Obteniendo los productos...')
        try {
            const data = await peticion(supabaseConexion.from('Productos').select('*'));
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene un producto concreto a partir de su identificador.
     * Se espera que el `id` sea único, por lo que se usa `.single()`.
     * 
     * @async
     * @param {Number|String} idProducto Identificador único del producto
     * @returns {Promise<Object>} Producto correspondiente al ID proporcionado
     * @throws {Error} Si no se encuentra el producto o falla la petición
     */
    const traerProductoPorIdAPI = async(idProducto) => {
        setMensajeCargando('Obteniendo el producto...')
        try {
            const data = await peticion(supabaseConexion.from('Productos').select('*').eq('id', idProducto).single());
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Filtra productos en función de una columna y un valor de búsqueda.
     * 
     * IMPORTANTE:
     * - Si el filtro está vacío, no se realiza ninguna petición.
     * - Para columnas de texto (por defecto `nombre`), usa búsqueda parcial IGNORECASE (`ilike`).
     * - Para columnas numéricas, busca valores dentro del rango [filtro, filtro + 1).
     * ---
     * 
     * @async
     * @param {String} filtro Valor introducido por el usuario
     * @param {String} columna Columna sobre la que se aplica el filtro
     * @returns {Promise<Array>} Lista de productos filtrados || Si el filtro es una cadena vacía esta función devolverá un @returns {Array[]} Array vacío.
     * @throws {Error} Si el filtro numérico no es válido o falla la petición
     */
    const filtroProductosAPI = async(filtro = '', columna = 'nombre') => {
        setMensajeCargando(`Encontrando los productos que coincidan con: ${filtro? filtro : "desconocido"} ...`)
        try {
            let query = supabaseConexion.from('Productos').select('*');
            // Si el nombre del filtro es una cadena vacía, se devolverá un array vacío.
            if(filtro.trim() === '') {
                return [];
            } else if (columna === 'nombre') {
                //Si la columna que se quiere insertar es nombre, añadiremos el modificador `ilike`
                // que nos da supabase para que se filte los productos que sean como ese nombre de `filtro`.
                query = query.ilike(columna, `%${filtro.trim()}%`);
            } else {
                /**
                 * En el último caso es el filtrado por `precio` o por `peso`.
                 * 
                 * Entonces lo que hacemos es replazar las comas si las hay por puntos y luego de esa acción 
                 */
                filtro = filtro.replace(',', '.');
                filtro = parseFloat(filtro);
                // Si filtro no es un número, lanza un error. 
                if(isNaN(filtro)) {
                    throw Error('El filtro debe ser un número válido para esta opción.');
                }
                /**Si filtro es un número al fin, añadimos las sentencias gte(mayor/igual que) y lt (menor que).  
                 * @example query.gte(peso , 2.3).lt(peso , 2.3 + 1) 
                 *     ¡¡ LA COLUMNA PESO Y EL PESO POR EL QUE QUEREMOS FILTRAR !!
                 */ 
                query = query.gte(columna, filtro).lt(columna, filtro + 1);
            }   
            const data= await peticion(query);
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Ordena los productos según una columna y un sentido de ordenación.
     * 
     * @async
     * @param {string} columna Nombre de la columna por la que se ordena
     * @param {boolean} orden `true` para ascendente, `false` para descendente
     * @returns {Promise<Array>} Lista de productos ordenados
     * @throws {Error} Si falla la petición a Supabase
     */
    const ordenaProductosAPI = async(columna = 'nombre', orden = true) => {
        setMensajeCargando(`Ordenando los productos por atributo: ${columna}`)
        try {
            const data = await peticion(supabaseConexion.from('Productos').select('*').order(columna, {ascending: orden}));
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Inserta un nuevo producto en la tabla `Productos`.
     * 
     * No devuelve datos; si no lanza excepción, la operación se considera exitosa.
     * Se utiliza la variante de Supabase que únicamente devuelve error en caso de fallo.
     * 
     * @async
     * @param {Object} producto Objeto producto a insertar
     * @throws {Error} Si ocurre un error durante la inserción
     */
    const insertarProductoAPI = async(producto) => {
        setMensajeCargando(`Guardando el producto ${producto.nombre}...`)
        try {
            await peticion(supabaseConexion.from('Productos').insert(producto));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Elimina un producto de la base de datos a partir de su ID.
     * 
     * @async
     * @param {number|string} idProducto Identificador del producto a eliminar
     * @throws {Error} Si falla la eliminación
     */
    const eliminarProductoAPI = async(idProducto) => {
        setMensajeCargando('Eliminando el producto...')
        try {
            await peticion(supabaseConexion.from('Productos').delete().eq('id', idProducto));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Actualiza un producto existente en la tabla `Productos`.
     * El producto debe incluir su propiedad `id`.
     * 
     * @async
     * @param {Object} producto Objeto producto con los datos actualizados
     * @throws {Error} Si falla la actualización
     */
    const editarProductoAPI = async(producto) => {
        setMensajeCargando('Editando el producto...')
        try {
            await peticion(supabaseConexion.from('Productos').update(producto).eq('id', producto.id));
        } catch (error) {
            throw error;
        }
    }

    return {
        cargando,
        mensajeCargando,
        traerProductosAPI,
        filtroProductosAPI,
        ordenaProductosAPI,
        insertarProductoAPI,
        eliminarProductoAPI,
        editarProductoAPI,
        traerProductoPorIdAPI,
    }
};
export default useProductosAPI;