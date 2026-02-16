import { useContext } from "react";
import contextoAdmin from "../context/ProveedorAdmin.jsx";


const useContextoAdmin = () => {
    const contexto = useContext(contextoAdmin);

    if(!contexto) throw Error('Lo siento para usar el contexto de administrador debes estár dentro del proovedor.')

    return contexto;
}

export default useContextoAdmin;