import { Outlet } from "react-router-dom";
import FiltrarProductos from '../components/FiltrarProductos.jsx';
import OrdenarProductos from "../components/OrdenarProductos.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import MensajeFlotante from "../shared/MensajeFlotante.jsx";
import useContextoProductos from "../hooks/useContextoProductos.js";

const PaginaProductos = () => {
  const { sesionIniciada } = useContextoSesion();
  const { mensajeProductos, eliminarMensajeProductos } = useContextoProductos();
  return (
    <>
      {mensajeProductos && ( /*Aquí manejamos el mensaje de error de los productos, no se si es buena práctica. Pero es la mejor que tengo. */
        <MensajeFlotante
          mensaje={mensajeProductos}
          funcion={eliminarMensajeProductos}
        />
      )}
      <Outlet />
    </>
  );
};

export default PaginaProductos;
