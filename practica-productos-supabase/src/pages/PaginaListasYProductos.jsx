
import ListasCompraMiniatura from "../components/ListasCompraMiniatura.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import { Outlet } from "react-router-dom";

const PaginaListasYProductos = () => {
    const {sesionIniciada} = useContextoSesion()

    return (
        <div className="listado-productos-container">
            {sesionIniciada && <ListasCompraMiniatura/>}
            <Outlet /> 
        </div>
    )
}

export default PaginaListasYProductos;