import './Register.css';
import useContextoSesion from '../hooks/useContextoSesion.js';
import { Link } from 'react-router-dom';
import Cargando from '../shared/Cargando.jsx';

/**
 * Este formulario actualiza el estado `datosSesion` en el ProveedorSesion con el que luego se registrará el usuario.
 * 
 * @returns Un formulario.
 */
const Register = () => {
    const {cargando, mensajeCargando, registrar, actualizarEstadoSesion} = useContextoSesion();

    const comprobarContrasena = (evento) => {

    }

    return (
        <div className='contenedor-registrar'>
            {cargando && <Cargando contexto={mensajeCargando}/>}
            <small><Link to={'/login'}>Ya tengo una cuenta</Link></small>
            <h2>Regístrate</h2>

            <label htmlFor="nombre">Nombre: </label>
            <input type="text" name="nombre" id="nombre" placeholder='Tu nombre'
                onChange={(evento) => {
                    actualizarEstadoSesion(evento)
                }}
            />

            <label htmlFor="email">Email: </label>
            <input type="text" name="email" id="email" placeholder='Tu email'
                onChange={(evento) => {
                    actualizarEstadoSesion(evento);
                }}
            />

            <label htmlFor="password">Contraseña: </label>
            <input type="password" name="password" id="password" placeholder='Contraseña'
                onChange={(evento) => {
                    actualizarEstadoSesion(evento);
                }}
            />
            <label htmlFor="password">Confirmar Contraseña: </label>
            <input type="password" name="password" id="password" placeholder='Confirma tu Contraseña'
                onCahnge={(evento) => {

                }}
            />

            <button onClick={() => {
                registrar()
            }}>Registrarse</button>
        </div>
    );
}

export default Register;