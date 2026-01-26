import './Header.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useContextoSesion from '../hooks/useContextoSesion.js';
import MensajeAceptarCancelar from './MensajeAceptarCancelar.jsx';

const Header = () => {

    const { sesionIniciada, cerrarSesion } = useContextoSesion();

    const navegar = useNavigate();
    const [ solicitudCerrarSesion, setSolicitudCerrarSesion] = useState(false);

    const activarCerradoSesion = () => {
        setSolicitudCerrarSesion(true);
    }

    const denegarCerradoSesion = () => {
        setSolicitudCerrarSesion(false);
    }

    const navegarInicio = () => {
        navegar('/');
    }


    return (
        <div className='contenedor-header'>
            { solicitudCerrarSesion && <MensajeAceptarCancelar mensaje={'¿Estás seguro que quieres cerrar la sesión?'} botonIzq={() => {
                cerrarSesion();
                //Quitamos el mensaje de aceptar cancelar, si no se queda estático en la pantalla...
                setSolicitudCerrarSesion(false);
            }} botonDer={denegarCerradoSesion}/> }
            <div className='header-info' onClick={() => {navegarInicio()}}>
                <img src="./src/assets/order_9280764.png" alt="Logo de la página" />
                <h1>productos supabase</h1>
            </div>
            
            { sesionIniciada ? (
                <button onClick={() => {
                    activarCerradoSesion();
                }}>Cerrar Sesión</button>
            ):(
                <Link to={'/login'}>Iniciar Sesión</Link>
            )}
        </div>
    );
}

export default Header;