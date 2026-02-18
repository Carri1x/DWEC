import './Login.css';
import useContextoSesion from '../hooks/useContextoSesion.js';
import { Link } from 'react-router-dom';
import Cargando from '../shared/Cargando.jsx';
import { useState } from 'react';
import ojoAbierto from '../assets/ojo-abierto.png';
import ojoTachado from '../assets/ojo-tachado.png';

/**
 * Este formulario actualiza el estado `datosSesion` en el ProveedorSesion con el que luego se logeara el usuario.
 * 
 * @returns Un formulario.
 */
const Login = () => {

    const {cargando, mensajeCargando, logear, actualizarEstadoSesion} = useContextoSesion();

    const [contrasenaVisible, setContrasenaVisible] = useState(false);

    return (
      <div
        className="contenedor-login"
        onKeyDown={(evento) => {
          if (evento.key === "Enter") {
            logear();
          }
        }}
      >
        {cargando && <Cargando contexto={mensajeCargando} />}
        <h2>Inicia sesión</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Inserte su email para logearse."
          onChange={(evento) => {
            actualizarEstadoSesion(evento);
          }}
        />

        <label htmlFor="password">Contraseña: </label>
        <div className='contenedor-input-ojo'>
          <input
            type={contrasenaVisible ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Inserte la contraseña."
            onChange={(evento) => {
              actualizarEstadoSesion(evento);
            }}
          />
          <img src={contrasenaVisible ? ojoAbierto : ojoTachado} 
            className='ojo-contraseña'  
            onClick={() => {setContrasenaVisible(!contrasenaVisible)}}
            alt="Ojo" 
          />
        </div>

        <button
          onClick={() => {
            logear();
          }}
        >
          Iniciar sesión
        </button>
        <small>
          <Link to={"/register"}>No tengo ninguna cuenta creada</Link>
        </small>
      </div>
    );
}

export default Login;