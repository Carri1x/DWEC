import { useEffect } from "react";
import useContextoAdmin from "../hooks/useContextoAdmin";
import ListasCompraMiniatura from "../components/ListasCompraMiniatura";

const PaginaAdminListaCompra = () => {

    const {
        usuarios,
        usuarioSeleccionado,
    } = useContextoAdmin();ç

    return (
        <div className="main-container-admin-lista-compra">
            <ListadoUsuariosMiniatua />
            {usuarioSeleccionado && <ListasCompraMiniatura />}

        </div>
    )
}

export default PaginaAdminListaCompra;