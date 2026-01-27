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

    const filtroProductos = async(filtro = '', option = 'nombre') => {
        try {
            const {data, error} = await supabaseConexion.from('Productos').select('*').eq(option, filtro);
            if(error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    return {
        traerProductos,
        filtroProductos
    }
};
export default useProductosAPI;