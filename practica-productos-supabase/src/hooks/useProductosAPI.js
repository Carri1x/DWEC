import { supabaseConexion } from "../supabase/Supabase.js";

/**
 * Hook/API de acceso a la tabla `Productos` en Supabase.
 * Centraliza todas las operaciones CRUD y consultas relacionadas con productos.
 * 
 * @returns {Object} Conjunto de funciones para interactuar con la API de productos
 */
const useProductosAPI = () => {

    /**
     * Obtiene todos los productos almacenados en la tabla `Productos`.
     * 
     * @async
     * @returns {Promise<Array>} Lista completa de productos
     * @throws {Error} Si ocurre un error en la petición a Supabase
     */
    const traerProductosAPI = async() => {
        try {
            const {data, error} = await supabaseConexion.from('Productos').select('*'); 
            if(error) {
                throw error;
            }
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
        try {
            const {data, error} = await supabaseConexion.from('Productos').select('*').eq('id', idProducto).single();
            if(error) {
                throw error;
            }
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
     * @returns {Promise<Array>} Lista de productos filtrados
     * @throws {Error} Si el filtro numérico no es válido o falla la petición
     */
    const filtroProductosAPI = async(filtro = '', columna = 'nombre') => {
        try {
            let peticion = supabaseConexion.from('Productos').select('*');
            // En esta parte evito que se haga una petición.
            if(filtro.trim() === '') {
                return [];
            } else if (columna === 'nombre') {
                peticion = peticion.ilike(columna, `%${filtro.trim()}%`);
            } else {
                filtro = filtro.replace(',', '.');
                filtro = parseFloat(filtro);
                if(isNaN(filtro)) {
                    throw Error('El filtro debe ser un número válido para esta opción.');
                }
                peticion = peticion.gte(columna, filtro).lt(columna, filtro + 1);
            }   
            const {data, error} = await peticion;
            if(error) {
                throw error;
            }
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
        try {
            const {data, error} = await supabaseConexion.from('Productos').select('*').order(columna, {ascending: orden});
            if(error) {
                throw error;
            }
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
        try {
            const {error} = await supabaseConexion.from('Productos').insert(producto);
            if(error) {
                throw error;
            }
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
        try {
            const {error} = await supabaseConexion.from('Productos').delete().eq('id', idProducto);
            if(error) {
                throw error;
            }
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
        try {
            const {error} = await supabaseConexion.from('Productos').update(producto).eq('id', producto.id);
            if(error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    return {
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