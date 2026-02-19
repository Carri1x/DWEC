import { useState } from "react";
import { supabaseConexion } from "../supabase/Supabase.js";

/**
 * HOOK/API de acceso a la tabla `Auth` de Supabase.
 * Controla toda la funcionalidad que nos da el gestor de base de datos Supabase, para
 * registrar usuarios, logearlos y cerrar sesión, más aparte otras funciones muy interesantes como suscribirse
 * a un escuchador de inicio de sesión por parte de ese usuario.
 *
 * @returns {Object} Conjunto de funciones para interactuar con la API de usuarios-sesión.
 */
const useSesionAPI = () => {
  const [cargando, setCargando] = useState(false);
  const [mensajeCargando, setMensajeCargando] = useState('');

  /**
   * Función general que abstrae la lógica del error y los datos que devuelve supabase. Por lo que las siguientes peticiónes especificas solo tendrán que fijarse en las PETICIONES de los datos requeridos para estos.
   *
   * @async
   * @param {Function} query Consulta que se hará al gestor de base de datos supabase.
   * @throws {Error} Específicamente devuelve el error que ha surgido en el gestor SUPABASE, porque ha ocurrido y en que parte ha acurrido del gestor.
   * @returns Los datos que se han sugerido al gestor de base de datos SUPABASE
   */
  const peticion = async (query) => {
    setCargando(true);
    try {
      const { data, error } = await query;
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    } finally {
      setCargando(false);
      setMensajeCargando('');
    }
  };

  /**
   * Registra al usuario en la base de datos. PREVIAMENTE TENDRÁ QUE MIRAR SU CORREO ELECTRÓNICO PARA QUE PUEDA VERIFIAR QUE ES EXACTAMENTE SU CORREO Y NO HAY SUPLANTACIÓN DE IDENTIDAD.
   *
   * @async
   * @param {Object} usuario
   * @returns Objeto de código y texto de respuesta.
   */
  const registrarUsuarioAPI = async (usuario) => {
    setMensajeCargando(`Registrándote como usuario...`)
    try {
      const data = await peticion(supabaseConexion.auth.signUp(usuario));
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logea a un usuario que ha sido registrado anteriormente.
   *
   * @async
   * @param {Object} usuario
   * @returns Objeto de código y texto de respuesta.
   */
  const logearUsuarioAPI = async (usuario) => {
    setMensajeCargando(`Iniciando sesión...`)
    try {
      const data = await peticion(
        supabaseConexion.auth.signInWithPassword(usuario),
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Cierra la sesión del usuario que está haciendo la petición.
   *
   * @async
   * @returns Objeto de código y texto de respuesta.
   */
  const cerrarSesionAPI = async () => {
    setMensajeCargando(`Cerrando sesión...`)
    try {
      const data = await peticion(supabaseConexion.auth.signOut());
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Función que devuelve si el usuario que se pregunta es administrador o no.
   * 
   * @param {String (UUID)} idUsuario 
   * @returns {Boolean} TRUE si es usuarioAdministrador. FALSE  si no es usuarioAdministrador.
   */
  const esUsuarioAdminAPI = async(idUsuario) => {
    try {
      const data = await peticion(
        supabaseConexion
        .from('roles')
        .select('*')
        .eq('id_rol', idUsuario)
      )
      //Viene un array de objetos.
      //Por lo que tenemos que sacar el objeto del array primero.
      return data[0];
    } catch (error) {
      throw error;
    }
  }

  const traerPerfilUsuarioAPI = async(idUsuario) => {
    try {
      const perfil = await peticion(
        supabaseConexion
        .from('perfiles')
        .select('*')
        .eq('id', idUsuario)
      )
      return perfil[0];
    } catch (error) {
      
    }
  }

  const editarUsuarioAPI = async(idUsuario, usuarioEditado) => {
    setMensajeCargando(`Editando usuario...`);
    try {
      const data = await peticion(
        supabaseConexion
        .from('perfiles')
        .update(usuarioEditado)
        .eq('id', idUsuario)
      )
      return data;
    } catch (error) {
      throw error;
    }
  }


  return {
    cargando,
    mensajeCargando,
    registrarUsuarioAPI,
    logearUsuarioAPI,
    cerrarSesionAPI,
    esUsuarioAdminAPI,
    traerPerfilUsuarioAPI,
    editarUsuarioAPI
  };
};

export default useSesionAPI;
