import { useContext } from "react";
import { contextoListaCompra } from "../context/ProveedorListaCompra.jsx";

const useContextoListaCompra = () => {

    const contexto = useContext(contextoListaCompra);

    if(!contexto) {
        throw Error('ERROR. Debe estar dentro del Proovedor ListaCompra para poder acceder al contexto ListaCompra.');
    }

    return contexto;
}

export default useContextoListaCompra;