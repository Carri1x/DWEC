import { supabaseConexion } from "../supabase/Supabase.js";

const useProductosAPI = () => {

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
     * Es una función void. si no devuelve una excepción, MARAVILLOSO.
     * He estado mirando en la documentación que hay varias opciones para insertar un producto nuevo en supabase.
     * Solo me ha interesado la que te da un error en caso de que haya salido algo mal. Hay otra que te devuelve un objeto donde dentro está data: [ {aqui el objeto} ], no me interesa nada. 
     * En este en concreto te devuelve status y el statusText
     * @param {Producto} producto 
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
    }
};
export default useProductosAPI;