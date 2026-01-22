import './Register.css';
import useContextoSesion from '../hooks/useContextoSesion.js';
import {useState} from 'react';

const Register = () => {
    const {registrar, actualizarEstadoSesion, mensajeSesion} = useContextoSesion();

    const formularioInicial = {
        email: "",
        password: ""
    }
    
    const [formulario, setFormulario] = useState(formularioInicial)


    const actualizarFormulario = (evento) => {
        const { name, value } = evento.target;
        setFormulario({...formulario, [name]: value});
    }

    const ejecutarRegistro = () => {

    }

    return (
        <div className='contenedor-registrar'>
            <h2>Regístrate</h2>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" id="email" placeholder='Tu email'
                onChange={(evento) => {
                    actualizarEstadoSesion(evento);
                    actualizarFormulario(evento);
                }}
            />

            <label htmlFor="password">Contraseña: </label>
            <input type="password" name="password" id="password" placeholder='Contraseña'
                onChange={(evento) => {
                    actualizarEstadoSesion(evento);
                    actualizarFormulario(evento);
                }}
            />

            <button onClick={() => {
                registrar()
            }}>Registrarse</button>
        </div>
    );
}

export default Register;