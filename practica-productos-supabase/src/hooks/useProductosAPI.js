import { supabaseConexion } from "../supabase/Supabase.js";

const useProductosAPI = () => {

    

    const traerProductos = async() => {
        try {
            const {data: productos, error} = await supabaseConexion.from('Productos').select('*'); 

            if(error) {
                throw error;
            }

            return productos;

        } catch (error) {
            throw error;
        }
    }

    return {
        traerProductos
    }
};
export default useProductosAPI;