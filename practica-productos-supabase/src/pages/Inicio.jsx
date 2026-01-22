import './Inicio.css';
import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";

const Inicio = () => {

    const { sesionIniciada, cerrarSesion } = useContextoSesion();

    return (
        <div className="contenedor-inicio">
            <h1>Inicio</h1>
            <h3>¡¡¡Esta página podrás encontrar los mejores pedidos que hay en la historia de los feos!!!</h3>
            {
                !sesionIniciada ? (
                    <div className="contenedor-iniciar-registrar-sesion">
                        <p> ¡¡Inicia sesión o registrate para comprar!! :3,  Feo</p>
                        <Link to={'/login'} className="btn-link">
                            Iniciar sesión
                        </Link>
                        <p>¿No tienes una cuenta? <Link to={'/register'} >
                            Regístrate
                        </Link></p>
                    </div>
                ) :
                (
                    <div>
                        <p>¡¡Ya estás activo!! ¿¿Quieres cerrar la sesión??</p>
                        <button onClick={() => {
                            cerrarSesion();
                        }}>Cerrar sesión</button>
                    </div>
                )
            }

        </div>
    );
};

export default Inicio;