import './IconoUsuario.css'
import { Link } from 'react-router-dom';
import iconoUsuarioDefault from '../assets/icono-usuario.png';
import useContextoMensajes from '../hooks/useContextoMensajes.js';
import useContextoSesion from '../hooks/useContextoSesion.js';
import {  useState } from 'react';


const IconoUsuario = () => {
    const {sesionIniciada, cerrarSesion,  perfil} = useContextoSesion();
    const {confirmarAccion} = useContextoMensajes();

    const [funcionesVisibles, setFuncionesVisibles] = useState(false);

    /**
       * Función que habilita la posibilidad de cerrar la sesión.
       *
       * IMPORTANTE: (Esta función confirmarAccion() enseña un mensaje parecido a confim() de JVanilla que aparece por pantalla)
       * - Si acepta el mensaje se cerrará la sesión.
       * - Si no acepta el mensaje no cerrará sesión.
       * --- PD: En ambas opciones/acciones se quitará el mensaje que aparece por pantalla.
       */
    const funCerradoSesion = async () => {
        const acepta = await confirmarAccion(`¿Estás seguro que quieres cerrar la sesión?`);
        if (acepta) {
            cerrarSesion();
        }
    };
    
    return (
        <>
            <div className="icono-usuario">
                <img src={ perfil && perfil.avatar_url ? perfil.avatar_url : iconoUsuarioDefault} alt="Icono" 
                    onClick={() => {setFuncionesVisibles(!funcionesVisibles)}}
                />

                {funcionesVisibles &&
                    <div className='icono-funciones'>
                        {sesionIniciada ? (
                            <>
                                <button
                                    onClick={() => {
                                        funCerradoSesion();
                                    }}
                                >
                                    Cerrar Sesión
                                </button>

                                <Link to={`/perfil`}>Ver Perfil <b>{perfil && perfil.nombre_completo && `${perfil.nombre_completo}`}</b></Link>
                            </>
                        ) : (
                            <Link to={"/login"}>Iniciar Sesión</Link>
                        )}

                    </div>
                }
            </div>
        </>
    )
}

export default IconoUsuario;