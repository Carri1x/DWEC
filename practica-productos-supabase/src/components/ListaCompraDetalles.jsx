import { useParams } from "react-router-dom";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import { useEffect } from "react";

const ListaCompraDetalles = () => {
    const {idLista} = useParams();
    const { 
        lista,
        cargarListaPorID
    } = useContextoListaCompra();

    useEffect(() => {
        cargarListaPorID(idLista);
    }, [idLista])

    return (
        <>
            <p>{lista.nombre}</p>  
        </>
    )
}

export default ListaCompraDetalles;