import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion";

const MenuProductos = () => {

    const { sesionIniciada } = useContextoSesion();
    return(
        <div className="contenedor-menu">
            
        </div>
    );
};

export default MenuProductos;