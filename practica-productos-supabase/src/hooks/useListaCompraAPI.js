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

    const traerListaPorIdAPI = async(idLista) => {
        try {
            const listaAPI = await peticion(
                supabaseConexion
                .from('ListasCompra')
                .select('*')
                .eq('id', idLista)
            );
            return listaAPI[0];
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
                    {nombre: nombre,
                    id_propietario: idPropietario}
                ])
                .select()
            );
            return data;
        } catch (error) {
            throw error;
        }
    }


    const traerProductosDeListaAPI = async(idLista) => {
        try {
            const productos = await peticion(
                supabaseConexion
                .from('ListasCompra_Productos')
                .select('*')
                .eq('id_ListasCompra', idLista)
            )
            return productos;
        } catch (error) {
            throw error;            
        }
    }
    
    const añadirProductoAPI = async(idLista, idProducto) => {
        try {
            const data = peticion(
                supabaseConexion
                .from('ListasCompra_Productos')
                .insert(
                    {id_ListasCompra: idLista,
                    id_Producto: idProducto,
                    cantidad: 1}
                )
            );
            return data;
        } catch (error) {
            throw error;
        }
    }

    const actualizarProductoCantidadAPI = async(idLista, idProducto, cantidad) => {
        try {
            const data = peticion(
                supabaseConexion
                .from('ListasCompra_Productos')
                .update({cantidad: cantidad})
                .eq('id_ListasCompra', idLista)
                .eq('id_Producto', idProducto)
                .select()
            )

            return data;
        } catch (error) {
            throw error;
        }
    }

    return {
        cargando,
        traerListasAPI,
        traerListaPorIdAPI,
        crearListaAPI,
        traerProductosDeListaAPI,
        añadirProductoAPI,
        actualizarProductoCantidadAPI,
    }
}

export default useListaCompraAPI;