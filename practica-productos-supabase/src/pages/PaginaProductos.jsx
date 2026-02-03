import { Outlet } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";
import MensajeFlotante from "../shared/MensajeFlotante.jsx";
import useContextoProductos from "../hooks/useContextoProductos.js";
import ListasCompra from "../components/ListasCompra.jsx";

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
      { sesionIniciada && <ListasCompra />}
      <Outlet />
    </>
  );
};

export default PaginaProductos;
