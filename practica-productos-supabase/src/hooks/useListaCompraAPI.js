import { useState } from "react";
import { supabaseConexion } from "../supabase/Supabase.js";

/**
 * HOOK/API de acceso a la tabla `ListasCompra` y `ListasCompra_Productos` en Supabase.
 * Centraliza todas las operaciones CRUD y consultas relacionadas con Listas de la compra y
 * sus productos con la relación de cada uno de sus Propietarios.
 * 
 * @returns {Object} Conjunto de funciones para interactuar con la API de Listas de la Compra.
 */
const useListaCompraAPI = () => {
    const [cargando, setCargando] = useState(false);
    const [mensajeCargando, setMensajeCargando] = useState('')

    /**
     * Función general que abstrae la lógica del error y los datos que devuelve supabase. Por lo que las siguientes peticiónes especificas solo tendrán que fijarse en las PETICIONES de los datos requeridos para estos.
     * 
     * @async
     * @param {Function} query Consulta que se hará al gestor de base de datos supabase.
     * @param {Boolean} cargando En caso de que la petición no queramos que salga el componente <Cargando /> 
     * @throws {Error} Específicamente devuelve el error que ha surgido en el gestor SUPABASE, porque ha ocurrido y en que parte ha acurrido del gestor.
     * @returns Los datos que se han sugerido al gestor de base de datos SUPABASE
     */
    const peticion = async(query, cargando = true) => {
        if(cargando) {
            setCargando(true);
        }
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
            setMensajeCargando('');
        }
    }

    /**
     * Función que busca por el id del propietario en la tabla ListasCompra, devolviendo las Listas que tiene este propietario.
     * En caso de haber error lanza @throws @error un error.
     * 
     * @async
     * @param {String (UUID)} idPropietario 
     * @returns Devuelve todas las listas de la compra que tiene ese propietario.
     */
    const traerListasAPI = async (idPropietario) => {
        setMensajeCargando('Trayendo listas de la compra...')
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


    /**
     * Función que busca la lista en específico por el id de esta, la busca en la tabla ListasCompra.
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @returns Devuelve esa lista buscada por id.
     */
    const traerListaPorIdAPI = async(idLista) => {
        setMensajeCargando('Buscando lista de la compra...')
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

    /**
     * Función que inserta una lista nueva en la base de datos y la asigna al id del propietario que la ha creado.
     * 
     * @async
     * @param {String} nombre 
     * @param {String (UUID)} idPropietario 
     * @returns Devuelve el estado y el texto del estado de la petición.
     */
    const crearListaAPI = async(nombre, idPropietario) => {
        setMensajeCargando('Creando tu lista de la compra...')
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

    /**
     * Función que borra una lista por su id.
     * 
     * IMPORTANTE:
     * En caso de que esa lista tenga productos tendrá que pasar antes por la tabla intermedia 
     * de ListasCompra_Productos para eliminar todos esos productos de la lista.
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @returns Devuelve la información del borrado y en caso de alguna otra de los productos borrados dentro por la clave 'productosBorrados'.
     */
    const borrarListaAPI = async(idLista) => {
        setMensajeCargando('Borrando lista de la compra...')
        try {
            //Primero borramos todos sus productos si los tiene.
            const dataProdBorrados = await borrarProductosLista(idLista);
            //Luego de haber borrado todos sus productos procedemos a borrar la lista.
            const data = await peticion(
                supabaseConexion
                .from('ListasCompra')
                .delete()
                .eq('id', idLista)
            )
            return {data, productosBorrados: dataProdBorrados};
        } catch (error) {
            throw error;
        }
    }

    /**
     * Función que devuelve todos los productos de la lista que se ha buscado por id.
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @returns Devuelve los productos de la lista buscada por id en concreto. 
     */
    const traerProductosDeListaAPI = async(idLista) => {
        setMensajeCargando('Trayendo todos los productos de la lista...')
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
    
    /**
     * Función que añade un producto por primera vez en la lista que se pasa por parámetro.
     * 
     * IMPORTANTE:
     *  -> Esta función en caso de que este proudcto (idProducto) ya exista lanzara una excepción.
     * --->
     * En este caso deberemos usar la función : actualizarProductoCantidadAPI(idLista, idProducto, cantidad)
     * <---
     * @throws ID(UUID) repetido en la misma tabla, lo cual no podrá insertarse el producto.
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @param {String (UUID)} idProducto 
     * @returns 
     */
    const añadirProductoAPI = async(idLista, idProducto) => {
        setMensajeCargando('Añadiendo el producto a la lista...')
        try {
            const data = await peticion(
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

    /**
     * Función que se usa para cuando ya existe un producto(idProducto) en una lista (idLista) procedemos a aumentar o disminuir su cantidad.
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @param {String (UUID)} idProducto 
     * @param {Number} cantidad 
     * @returns Devolverá el producto entero con su nueva cantidad actualizada.
     */
    const actualizarProductoCantidadAPI = async(idLista, idProducto, cantidad) => {
        setMensajeCargando('Actualizando la cantidad del producto...')
        try {
            const data = await peticion(
                supabaseConexion
                .from('ListasCompra_Productos')
                .update({cantidad: cantidad})
                .eq('id_ListasCompra', idLista)
                .eq('id_Producto', idProducto)
                .select()
            ,false); //Añadimos false a la petición por si queremos o no que salga el componente <Cargando /> 

            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Función que borra un producto (idProducto) de la lista(idLista) en la tabla ListasCompra_Productos.
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @param {String (UUID)} idProducto 
     * @returns Devuelve el producto borrado, con toda su información de la cantidad que estaba seleccionada en esta lista.
     */
    const borrarProductoDeListaAPI = async(idLista, idProducto) => {
        setMensajeCargando('Borrando el producto de la tabla...')
        try {
            const data = await peticion(
                supabaseConexion
                .from('ListasCompra_Productos')
                .delete()
                .eq('id_ListasCompra', idLista)
                .eq('id_Producto', idProducto)
                .select()
            )
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Función que borra todos los productos de la lista (idLista) que se pasa por parámetro.
     * 
     * IMPORTANTE:
     * Esta función se usa en la función borrarListaAPI(idLista).
     * ---
     * En caso de quererse borrar esta función deberá implementarse en esta otra función anteriormente nombrada (borrarListaAPI(idLista)).
     * ---
     * 
     * @async
     * @param {String (UUID)} idLista 
     * @returns Devuelve todos los productos de esa lista.
     */
    const borrarProductosLista = async(idLista) => {
        setMensajeCargando('Borrando todos los productos de la tabla...')
        try {
            const data = await peticion(
                supabaseConexion
                .from('ListasCompra_Productos')
                .delete()
                .eq('id_ListasCompra', idLista)
                .select()
            ); 
            return data;
        } catch (error) {
            throw error;
        }
    }

    

    return {
        cargando,
        mensajeCargando,
        traerListasAPI,
        traerListaPorIdAPI,
        crearListaAPI,
        traerProductosDeListaAPI,
        añadirProductoAPI,
        actualizarProductoCantidadAPI,
        borrarProductoDeListaAPI,
        borrarListaAPI,
    }
}

export default useListaCompraAPI;