import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";

const Header = () => {
  const { sesionIniciada, cerrarSesion } = useContextoSesion();
  const {confirmarAccion} = useContextoMensajes()

  const navegar = useNavigate();

  const navegarInicio = () => {
    navegar("/");
  };

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
    <div className="contenedor-header">
      <div className="header-info" onClick={() => {
          navegarInicio();
        }}
      >
        <img src="./src/assets/order_9280764.png" alt="Logo de la página" />
        <h1>productos supabase</h1>
      </div>

      {sesionIniciada ? (
        <button
          onClick={() => {
            funCerradoSesion();
          }}
        >
          Cerrar Sesión
        </button>
      ) : (
        <Link to={"/login"}>Iniciar Sesión</Link>
      )}
    </div>
  );
};

export default Header;
