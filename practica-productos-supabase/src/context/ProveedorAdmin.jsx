import { createContext, useEffect, useState } from "react"
import useContextoAdmin from "../hooks/useContextoAdmin.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";

const contextoAdmin = createContext();
const ProveedorAdmin = ({children}) => {
    const {
        lanzarMensaje,
        tiposDeMensaje,
    } = useContextoMensajes();

    const {
        cargarUsuariosAPI,
    } = useContextoAdmin();

    const [usuarios, setUsuarios] = useState();
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});


    /**
     * Función que carga todos los usuarios de la aplicación.
     */
    const cargarUsuarios = async() => {
        try {
            const usuarios = await cargarUsuariosAPI();
            setUsuarios(usuarios);
        } catch (error) {
            lanzarMensaje(`CargarUsuarios: ${error.message}`, tiposDeMensaje.error);
        }
    }

    useEffect(() => {
        cargarUsuarios();
    }, []);

    useEffect(() => {
        console.log("Hacer el usuarioSeleccionado cargarListas compra");
        cargarListasCompra(usuarioSeleccionado.id);
    }, [usuarioSeleccionado]);

    const cosasAExportar = {
        usuarios,
        usuarioSeleccionado,
    }

    return (
        <contextoAdmin.Provider value={cosasAExportar}>
            {children}
        </contextoAdmin.Provider>
    )
}

export {contextoAdmin};
export default ProveedorAdmin;