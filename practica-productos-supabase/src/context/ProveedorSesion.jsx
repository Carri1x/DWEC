import { createContext, useEffect, useState } from "react";
import { supabaseConexion } from "../supabase/Supabase.js";
import { useNavigate } from 'react-router-dom';
import useContextoMensajes from "../hooks/useContextoMensajes.js";


const contextoSesion = createContext();

const ProveedorSesion = ({ children }) => {

    const {
        tiposDeMensaje,
        lanzarMensaje,
        quitarMensaje,
    } = useContextoMensajes();

    const datosSesionIniciales = {
        nombre: "",
        email: "",
        password: ""
    }

    const [datosSesion, setDatosSesion] = useState(datosSesionIniciales);
    const [usuario, setUsuario] = useState({});
    const [sesionIniciada, setSesionIniciada] = useState(false);

    const navegar = useNavigate();

    const actualizarEstadoSesion = (evento) => {
        const {name, value} = evento.target;
        setDatosSesion({...datosSesion, [name]: value});
    }

    const registrar = async () => {
        try {
            const { data, error } = await supabaseConexion.auth.signUp({
                email: datosSesion.email,
                password: datosSesion.password,
                options: {
                    data: {
                        display_name: datosSesion.nombre
                    }
                }
            });

            if(error) {
                throw error;
            } else {
                lanzarMensaje(`Verifica la cuenta a través del correo proporcionado: ${datosSesion.email}`, tiposDeMensaje.info);
            }
        } catch (error) {
            lanzarMensaje(`Error al registrarse: ${error.message}`, tiposDeMensaje.error);
        }
    }

    const logear = async () => {
        try {
            const {data, error} = await supabaseConexion.auth.signInWithPassword({
                email: datosSesion.email,
                password: datosSesion.password,
                options: {
                    emailRedirectTo: "http://localhost:5173/"
                }
            });

            if(error) {
                throw error;
            }

        } catch (error) {
            lanzarMensaje(`Error al logearse: ${error.message}`, tiposDeMensaje.error);
        }
    }

    const cerrarSesion = async() => {
        try {
            await supabaseConexion.auth.signOut();
            quitarMensaje();
            navegar('/');
        } catch (error) {
            lanzarMensaje(`Error al cerrar sesión: ${error.message}`, tiposDeMensaje.error);
        }
    }


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
        actualizarEstadoSesion,
        registrar,
        logear,
        cerrarSesion,
        sesionIniciada,
        usuario,
    }

    return (
        <contextoSesion.Provider value={datosAExportar} >
            {children}
        </contextoSesion.Provider>
    );
                  
}

export default ProveedorSesion;
export { contextoSesion };