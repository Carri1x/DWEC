import './Register.css';
import useContextoSesion from '../hooks/useContextoSesion.js';
import { Link } from 'react-router-dom';
import Cargando from '../shared/Cargando.jsx';
import { useState } from 'react';
import useContextoMensajes from '../hooks/useContextoMensajes.js';
import ojoAbierto from '../assets/ojo-abierto.png';
import ojoTachado from '../assets/ojo-tachado.png';

/**
 * Este formulario actualiza el estado `datosSesion` en el ProveedorSesion con el que luego se registrará el usuario.
 * 
 * @returns Un formulario.
 */
const Register = () => {

    const { lanzarMensaje } = useContextoMensajes();

    const { cargando, mensajeCargando, registrar, actualizarEstadoSesion, limpiarContrasena } = useContextoSesion();

    /**
     * Variables y estados para comprobar que la contraseña que está metiendo el usuario es la que él realmente quiere
     */
    const plantillaContraseñas = {
        password: '',
        password2: '',
    }
    const [contraseñas, setContraseñas] = useState(plantillaContraseñas);
    const [error, setError] = useState(false);

    const [contraseñaVisible, setContraseñaVisible] = useState(false);
    const [contraseñaComprobacionVisible, setContraseñaComprobacionVisible] = useState(false);


    /**
     * Función que hace la lógica principal de registro con las validaciones de las contraseñas.
     * 
     * EN CASO DE QUE LAS CONTRASEÑAS COINCIDAN:
     * Se registrará al usuario.
     * 
     * EN CASO CONTRARIO:
     * Se informará al usuario y se quitarán los valores de las contraseñas. 
     * Tanto en contraseñas como en `datosSesion` en el ProveedorSesion.
     * 
     */
    const manejarRegistro = () => {
        // Si las contraseñas son válidas pasamos a registrar al usuario.
        if (contrasenasValidas()) {
            setError(false);
            registrar();
        } else {
            //Si no son válidas las contraseñas.
            lanzarMensaje('ERROR. Las contraseñas deben coincidir.', "error");
            setError(true);
            // Limpiamos la contraseña en `datosSesion` del proveedorSesion.
            limpiarContrasena();
            //Seteamos a cadena vacía las contraseñas.
            setContraseñas(plantillaContraseñas);
        }
    }


    /**
     * Función que va camabiando el estado de las contraseñas del usuario.
     * 
     * @param {Evnet} evento onChange en el formulario.
     */
    const cambiarEstadoContrasenaRegistro = (evento) => {
        const { name, value } = evento.target;
        setContraseñas({ ...contraseñas, [name]: value });
    }

    /**
     * Función que comprueba si las constraseñas de registro son iguales.
     * 
     * @returns {Boolean} Devuelve true si las contraseñas son iguales, false si no son iguales.
     */
    const contrasenasValidas = () => {
        const passw = contraseñas.password;
        const passw2 = contraseñas.password2;

        return passw === passw2;
    }

    return (
        <div className='contenedor-registrar'>
            {cargando && <Cargando contexto={mensajeCargando} />}
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
            <div className='contenedor-input-ojo'>
                <input type={ contraseñaVisible ? "text" : "password"} name="password" id="password" 
                    className={error && 'input-error'}
                    value={contraseñas.password} placeholder='Contraseña'
                    onChange={(evento) => {
                        //Cambiamos el estado en `datosSesion`del proveedorSesion.
                        actualizarEstadoSesion(evento);
                        //Cambiamos el estado de las contraseñas para hacer la comprobación.
                        cambiarEstadoContrasenaRegistro(evento);
                    }}
                />
                <img src={contraseñaVisible ? ojoAbierto : ojoTachado}
                    className='ojo-contraseña'
                    onClick={() => setContraseñaVisible(!contraseñaVisible)}
                    alt="Ojo"
                />
            </div>

            <label htmlFor="password2">Confirmar Contraseña: </label>
            <div className='contenedor-input-ojo'>
                <input type={contraseñaComprobacionVisible? "text": "password"} name="password2" id="password2" 
                    className={error && 'input-error'}
                    value={contraseñas.password2} placeholder='Confirma tu Contraseña'
                    onChange={(evento) => {
                        cambiarEstadoContrasenaRegistro(evento)
                    }}
                />
                <img src={contraseñaComprobacionVisible ? ojoAbierto : ojoTachado}
                    className='ojo-contraseña'
                    onClick={() => setContraseñaComprobacionVisible(!contraseñaComprobacionVisible)}
                    alt="Ojo"
                />
            </div>


            <button onClick={() => {
                manejarRegistro();
            }}
            >Registrarse</button>
        </div>
    );
}

export default Register;