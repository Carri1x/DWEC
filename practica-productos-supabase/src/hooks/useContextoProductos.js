import { useContext } from "react";
import { contextoProductos } from "../context/ProveedorProductos.jsx";

const useContextoProductos = () => {

    const contexto = useContext(contextoProductos);
    
    if(!contexto){
        throw Error(`Este componenete no está dentro de <ProovedorProductos /> no puedes acceder a los datos.`);
    }

    return contexto;
}

export default useContextoProductos;