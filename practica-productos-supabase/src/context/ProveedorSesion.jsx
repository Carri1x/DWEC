import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import useSesionAPI from "../hooks/useSesionAPI.js";
import { supabaseConexion } from "../supabase/Supabase.js";


const contextoSesion = createContext();

const ProveedorSesion = ({ children }) => {

    const {
        tiposDeMensaje,
        lanzarMensaje,
    } = useContextoMensajes();

    const {
        cargando,
        mensajeCargando,
        registrarUsuarioAPI,
        logearUsuarioAPI,
        cerrarSesionAPI,
    } = useSesionAPI()

    //Datos que se usan como referencia en `datosSesion`, son los datos que tiene que tener por defecto en el formulario.
    const datosSesionIniciales = {
        nombre: "",
        email: "",
        password: ""
    }

    // `datosSesion` Son los datos que previamente ha insertado el usuario a través de un formulario, para luego usarlo en las funciones `registrar`, `logear`...
    const [datosSesion, setDatosSesion] = useState(datosSesionIniciales); 
    const [usuario, setUsuario] = useState({}); // Es el usuario que se ha recogido desde SUPABASE.
    const [sesionIniciada, setSesionIniciada] = useState(false); // Estado BOOLEANO que recoge la información de si la sesión está iniciada o no. DATO: se setea en el useEffect de este proveedor.

    const navegar = useNavigate();  // Variable para navegar hasta una página del sitio web.

    /**
     * Función que actualiza el estado de `datosSesion` para registrar o logear a un usuario.
     * 
     * IMPORTANTE: 
     * - Esta función no hace ninguna petición a al gestor de base de datos.
     * - Esta función solo controla y cambia el estado de un estado (valga la redundancia) de este proveedor.
     * 
     * @param {Event} evento 
     */
    const actualizarEstadoSesion = (evento) => {
        const {name, value} = evento.target;
        setDatosSesion({...datosSesion, [name]: value});
    }

    const limpiarContrasena = () =>{
        setDatosSesion({...datosSesion, password: ""});
    }

    /**
     * Función que registra a un nuevo usuario en la base de datos. 
     * 
     * Se le asignará el estado autenticado dentro de la base de datos si ha seguido la verificación de email necesaria.
     * En cambio no se registrará en la base de datos. 
     * 
     * @async
     * @returns Devuelve los datos del usuario.
     */
    const registrar = async () => {
        try {
            const datos = await registrarUsuarioAPI({
                email: datosSesion.email,
                password: datosSesion.password,
                options: {
                    data: {
                        display_name: datosSesion.nombre
                    }
                }
            });
            lanzarMensaje(`Verifica la cuenta a través del correo proporcionado: ${datosSesion.email}`, tiposDeMensaje.info);
            return datos;
        } catch (error) {
            lanzarMensaje(`Error al registrarse: ${error.message}`, tiposDeMensaje.error);
        }
    }

    /**
     * Función que logea a un usuario ya previamente registrado.
     * 
     * IMPORTANTE: 
     * - Si el usuario no ha sido registrado deberá usarse la función registrar();
     * - Si se ha iniciado sesión en el usuario cambiará el estado `sesionIniciada` por true.
     * 
     * @returns devuelve el usuario logeado.
     */
    const logear = async () => {
        try {
            const data = await logearUsuarioAPI({
                email: datosSesion.email,
                password: datosSesion.password,
                options: {
                    emailRedirectTo: "http://localhost:5173/"
                }
            });
            return data;
        } catch (error) {
            lanzarMensaje(`Error al logearse: ${error.message}`, tiposDeMensaje.error);
        }
    }

    /**
     * Función que cierra la sesión de un usuario.
     * 
     * IMPORTANTE: 
     * - Si se ha cerrado sesión el usuario cambiará el estado `sesionIniciada` por FALSE.
     * 
     * @returns devuelve el usuario que ha cerrado sesión.
     */
    const cerrarSesion = async() => {
        try {
            const data = cerrarSesionAPI();
            navegar('/');
            return data;
        } catch (error) {
            lanzarMensaje(`Error al cerrar sesión: ${error.message}`, tiposDeMensaje.error);
        }
    }


    /**
     * Este useEffect está controlando con una suscripción a la tabla de AUTH DE SUPABASE, para
     * notificarnos si el usuario tiene la sesión iniciada o no.
     */
    useEffect(() => {
        try {
            const suscripcion = supabaseConexion.auth.onAuthStateChange( 
                (event, session) => {
                    if(session) {
                        //NAVEGAREMOS AL LISTADO DE LA COMPRA
                        navegar('/sup/listado-productos')
                        setSesionIniciada(true);
                        setUsuario(session.user)
                    } else {
                        navegar('/');
                        setSesionIniciada(false);
                    }
                }
            );
        } catch (error) {
            lanzarMensaje(error.message, tiposDeMensaje.error);
        }
    }, []);

    const datosAExportar = {
        cargando,
        mensajeCargando,
        actualizarEstadoSesion,
        registrar,
        logear,
        cerrarSesion,
        sesionIniciada,
        usuario,
        limpiarContrasena,
    }

    return (
        <contextoSesion.Provider value={datosAExportar} >
            {children}
        </contextoSesion.Provider>
    );
                  
}

export default ProveedorSesion;
export { contextoSesion };