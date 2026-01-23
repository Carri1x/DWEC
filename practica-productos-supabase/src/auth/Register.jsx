import './Register.css';
import useContextoSesion from '../hooks/useContextoSesion.js';
import { Link } from 'react-router-dom';

const Register = () => {
    const {registrar, actualizarEstadoSesion} = useContextoSesion();

    return (
        <div className='contenedor-registrar'>
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

            <button onClick={() => {
                registrar()
            }}>Registrarse</button>
        </div>
    );
}

export default Register;