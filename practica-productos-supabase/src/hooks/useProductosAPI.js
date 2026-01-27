import { supabaseConexion } from "../supabase/Supabase.js";

const useProductosAPI = () => {

    const traerProductos = async() => {
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

    const filtroProductos = async(filtro = '', columna = 'nombre') => {
        try {
            const {data, error} = await supabaseConexion.from('Productos').select('*').ilike(columna, filtro);
            if(error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    const ordenaProductos = async(columna = 'nombre', orden = true) => {
        try {
            const {data, error} = await supabaseConexion.from('Productos').select('*').order(columna, {ascending: orden});
            if(error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;error
        }
    }

    return {
        traerProductos,
        filtroProductos,
        ordenaProductos
    }
};
export default useProductosAPI;