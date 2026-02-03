import { useState } from "react";
import { supabaseConexion } from "../supabase/Supabase.js";

const useListaCompraAPI = () => {
    const [cargando, setCargando] = useState(false);

    const peticion = async(query) => {
        setCargando(true);
        try {
            const {data, error} = await query;
            if(error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        } finally {
            setCargando(false);
        }
    }

    const traerListasAPI = async (idPropietario) => {
        try {
            const listasAPI = await peticion(
                supabaseConexion
                .from('ListasCompra')
                .select('*')
                .eq('id_propietario', idPropietario)
            );
            return listasAPI;
        } catch (error) {
            throw error;
        } 
    }

    const crearListaAPI = async(nombre, idPropietario) => {
        try {
            const data = await peticion(
                supabaseConexion
                .from('ListasCompra')
                .insert([
                    {nombre: nombre},
                    {id_propietario: idPropietario}
                ])
                .select()
            );
            return data;
        } catch (error) {
            throw error;
        }
    }



    return {
        cargando,
        traerListasAPI,
        crearListaAPI,
    }
}

export default useListaCompraAPI;