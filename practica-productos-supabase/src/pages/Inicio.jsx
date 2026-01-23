import "./Inicio.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";
import MensajeAceptarCancelar from "../shared/MensajeAceptarCancelar.jsx";

const Inicio = () => {
  const { sesionIniciada, cerrarSesion } = useContextoSesion();

  const [solicitudCerrarSesion, setSolicitudCerrarSesion] = useState(false);

  const activarCerradoSesion = () => {
    setSolicitudCerrarSesion(true);
  };

  const denegarCerradoSesion = () => {
    setSolicitudCerrarSesion(false);
  };

  return (
    <div className="contenedor-inicio">
      {solicitudCerrarSesion && (
        <MensajeAceptarCancelar
          mensaje={"¿Estás seguro que quieres cerrar la sesión?"}
          botonIzq={() => {
            cerrarSesion();
            //Quitamos el mensaje de aceptar cancelar, si no se queda estático en la pantalla...
            setSolicitudCerrarSesion(false);
          }}
          botonDer={denegarCerradoSesion}
        />
      )}
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
              activarCerradoSesion();
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
