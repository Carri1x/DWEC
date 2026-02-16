import { useState } from "react";
import { supabaseConexion } from "../supabase/Supabase.js";

const useAdminAPI = () => {
    const [cargando, setCargando] = useState(false);

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
        }
    }

    const cargarUsuariosAPI = async() => {
        try {
            const usuarios = await peticion(
                supabaseConexion
                .from('Perfiles')
                .select('*')
            )
            return usuarios;
        } catch (error) {
            throw error;
        }
    }

    return {
        cargarUsuariosAPI,

    }
}

export default useAdminAPI;