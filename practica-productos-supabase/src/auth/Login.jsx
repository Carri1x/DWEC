import './Login.css';
import useContextoSesion from '../hooks/useContextoSesion.js';
import { Link } from 'react-router-dom';

/**
 * Este formulario actualiza el estado `datosSesion` en el ProveedorSesion con el que luego se logeara el usuario.
 * 
 * @returns Un formulario.
 */
const Login = () => {

    const {logear, actualizarEstadoSesion} = useContextoSesion();

    return (
        <div className='contenedor-login'>
            <h2>Inicia sesión</h2>
            <label htmlFor="email">Email:</label>
            <input type="email" name='email' id='email' placeholder='Inserte su email para logearse.'
                onChange={(evento) => {
                    actualizarEstadoSesion(evento);
                }}
            />

            <label htmlFor="password">Contraseña: </label>
            <input type="password" name="password" id="password" placeholder='Inserte la contraseña.'
                onChange={(evento) => {
                    actualizarEstadoSesion(evento);
                }}
            />

            <button onClick={() => {
                logear();
            }}>Iniciar sesión</button>
            <small><Link to={'/register'}>No tengo ninguna cuenta creada</Link></small>
        </div>
    );
}

export default Login;