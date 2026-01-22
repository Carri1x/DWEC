import React, { useContext } from "react";
import {contextoSesion} from '../context/ProveedorSesion.jsx';

const useContextoSesion = () => {

    const contexto = useContext(contextoSesion);

    if (!contexto) {
        throw Error('Este componente no está dentro de <ProovedorSesion />, el hook debe utilizarse dentro, no puedes acceder a los datos solicitados...');
    }

    return contexto;
}

export default useContextoSesion;