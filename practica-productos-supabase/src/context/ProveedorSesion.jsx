import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import useSesionAPI from "../hooks/useSesionAPI.js";


const contextoSesion = createContext();

const ProveedorSesion = ({ children }) => {

    const {
        tiposDeMensaje,
        lanzarMensaje,
    } = useContextoMensajes();

    const {
        cargando,
        registrarUsuarioAPI,
        logearUsuarioAPI,
        cerrarSesionAPI,
        usuarioSuscripcion,
    } = useSesionAPI()

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

    const cerrarSesion = async() => {
        try {
            const data = cerrarSesionAPI();
            navegar('/');
            return data;
        } catch (error) {
            lanzarMensaje(`Error al cerrar sesión: ${error.message}`, tiposDeMensaje.error);
        }
    }


    useEffect(() => {
        try {
            const suscripcion = usuarioSuscripcion(
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
                });
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