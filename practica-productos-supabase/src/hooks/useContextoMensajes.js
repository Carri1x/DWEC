import { useContext } from "react"
import { contextoMensajes } from "../context/ProveedorMensajes.jsx";

const useContextoMensajes = () => {

    const contexto = useContext(contextoMensajes);

    if(!contexto) {
        throw Error('ERROR. Los mensajes solo pueden usarse dentro de <ProveedorMensajes>.');
    }

    return contexto;
}

export default useContextoMensajes;