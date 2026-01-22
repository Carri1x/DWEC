import { createContext, useEffect, useState } from "react";
import { supabaseConexion } from "../supabase/Supabase.js";
import { useNavigate } from 'react-router-dom';


const contextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
    const datosSesionIniciales = {
        email: "",
        password: ""
    }
    const mensajeInicial = "";

    const [datosSesion, setDatosSesion] = useState(datosSesionIniciales);
    const [usuario, setUsuario] = useState({});
    const [sesionIniciada, setSesionIniciada] = useState(false);
    const [mensajeSesion, setMensajeSesion] = useState(mensajeInicial);

    const navegar = useNavigate();

    const actualizarEstadoSesion = (evento) => {
        const {name, value} = evento.target;
        setDatosSesion({...datosSesion, [name]: value});
    }

    const registrar = async () => {
        console.log(datosSesion)
        try {
            const { data, error } = await supabaseConexion.auth.signUp({
                email: datosSesion.email,
                password: datosSesion.password
            });
            console.log(data)
            console.log(error)

            if(error) {
                throw error;
            } else {
                setMensajeSesion(`Verifica la cuenta a través del correo proporcionado: ${datosSesion.email}`);
            }
        } catch (error) {
            setMensajeSesion(`Error al registrarse: ${error.message}`);
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
            setMensajeSesion(`Error al logearse: ${error.message}`)
        }
    }

    const cerrarSesion = async() => {
        try {
            await supabaseConexion.auth.signOut();
            setMensajeSesion(mensajeInicial);
            navegar('/');
        } catch (error) {
            setMensajeSesion(`Error al cerrar sesión: ${error.message}`);
        }
    }

    const obtenerUsuario = async() => {
        try {
            const {data, error} = await supabaseConexion.auth.getUser();
            
            if(error) {
                throw error;
            }

            setUsuario(data.user);
            setMensajeSesion(mensajeInicial);
        } catch (error) {
            setMensajeSesion(`Error al obtener el usuario: ${error.message}`);
        }
    }

    const eliminarMensajeSesion = () => {
        setMensajeSesion(mensajeInicial);
    }

    useEffect(() => {

        try {
            const suscripcion = supabaseConexion.auth.onAuthStateChange( 
                (event, session) => {
                    if(session) {
                        //NAVEGAREMOS AL LISTADO DE LA COMPRA
                        navegar('/listado-productos');
                        setSesionIniciada(true);
                        obtenerUsuario();
                    } else {
                        navegar('/');
                        setSesionIniciada(false);
                    }
                }
            );
        } catch (error) {
            
        }
    }, []);

    const datosAExportar = {
        actualizarEstadoSesion,
        registrar,
        logear,
        cerrarSesion,
        obtenerUsuario,
        sesionIniciada,
        usuario,
        mensajeSesion,
        eliminarMensajeSesion
    }

    return (
        <contextoSesion.Provider value={datosAExportar} >
            {children}
        </contextoSesion.Provider>
    );
}

export default ProveedorSesion;
export { contextoSesion };