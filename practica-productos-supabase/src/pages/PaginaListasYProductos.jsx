
import ListasCompra from "../components/ListasCompra.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import { Outlet } from "react-router-dom";

const PaginaListasYProductos = () => {
    const {sesionIniciada} = useContextoSesion()

    return (
        <div className="listado-productos-container">
            {sesionIniciada && <ListasCompra/>}
            <Outlet /> 
        </div>
    )
}

export default PaginaListasYProductos;