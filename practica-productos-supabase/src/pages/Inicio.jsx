import "./Inicio.css";
import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";

const Inicio = () => {
  const { sesionIniciada, cerrarSesion } = useContextoSesion();
  const { confirmarAccion } = useContextoMensajes();

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
    <div className="contenedor-inicio">
      <h1>Inicio</h1>
      <h3>
        ¡¡¡Esta página podrás encontrar los mejores pedidos que hay en la
        historia de los feos!!!
      </h3>
      {!sesionIniciada ? (
        <div className="contenedor-iniciar-registrar-sesion">
          <p> ¡¡Inicia sesión o registrate para comprar!! :3, Feo</p>
          <Link to={"/login"} className="btn-link">
            Iniciar sesión
          </Link>
          <p>
            ¿No tienes una cuenta? <Link to={"/register"}>Regístrate</Link>
          </p>
        </div>
      ) : (
        <div>
          <p>Ya estás activo, ¿quieres cerrar la sesión?</p>
          <button
            onClick={() => {
              funCerradoSesion();
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Inicio;
