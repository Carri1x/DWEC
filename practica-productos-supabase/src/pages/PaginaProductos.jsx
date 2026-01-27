import ProveedorProductos from "../context/ProovedorProductos";
import { Outlet } from "react-router-dom";
import FiltrarProductos from '../components/FiltrarProductos.jsx';
import OrdenarProductos from "../components/OrdenarProductos.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";

const PaginaProductos = () => {
  const {sesionIniciada} = useContextoSesion();
  return (
    <>
        <ProveedorProductos>
          {
            sesionIniciada && (
            <div className="controles-container">
              <FiltrarProductos />
              <OrdenarProductos />
            </div>)
          }
          <Outlet/>
        </ProveedorProductos>
    </>
  );
};

export default PaginaProductos;
