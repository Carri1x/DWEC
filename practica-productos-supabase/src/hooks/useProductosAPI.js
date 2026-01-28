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

    const ordenaProductos = async(columna = 'nombre', orden = true) => {
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

    return {
        traerProductos,
        filtroProductos,
        ordenaProductos
    }
};
export default useProductosAPI;