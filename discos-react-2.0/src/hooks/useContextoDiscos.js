import React, {useContext} from "react";
import { contextoDiscos } from "../context/ProveedorDiscos.jsx";


const useContextoDiscos = () => {

    const contexto = useContext(contextoDiscos);

    if(!contexto) {
        throw Error('El hook useDiscentes debe ser utilizado dentro de <ProveedorDiscentes>');
    }

    return contexto;
}

export default useContextoDiscos;