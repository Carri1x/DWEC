import './Login.css';
import useContextoSesion from '../hooks/useContextoSesion.js';

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
        </div>
    );
}

export default Login;