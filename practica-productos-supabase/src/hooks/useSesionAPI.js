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
    try {
      const data = await peticion(supabaseConexion.auth.signOut());
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * La función flecha de que va a hacer el el manejador 
   * de la base de datos cuando 
   * se de cuenta que la sesión está iniciada
   * Y que va a hacer cuando no está iniciada.
   * 
   * @example usuarioSuscripcion(
   *    (event, session) => {
            if(session) {
                //Si hay sesión hacemos la lógica que queramos.
                navegar('/sup/listado-productos')
                setSesionIniciada(true);
                setUsuario(session.user)
            } else {
                //Si no hay sesión hacemos la lógica que queramos.
                navegar('/');
                setSesionIniciada(false);
            }
        });
   * )
   * 
   * @async
   * @param {Function} callBack 
   * @returns Objeto de código y texto de respuesta.
   */
  const usuarioSuscripcion = (callBack) => {
    try {
      const data = peticion(supabaseConexion.auth.onAuthStateChange(callBack));
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    cargando,
    registrarUsuarioAPI,
    logearUsuarioAPI,
    cerrarSesionAPI,
    usuarioSuscripcion,
  };
};

export default useSesionAPI;
