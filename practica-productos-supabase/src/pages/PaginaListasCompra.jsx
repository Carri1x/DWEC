import useContextoSesion from "../hooks/useContextoSesion.js"
import ListaCompraDetalles from "./ListaCompraDetalles";

const PaginaListasCompra = () =>  {

    const {esAdmin} = useContextoSesion();

    return (
        <>
            {esAdmin ? <p>Aquí iria lista compra usuarios... en teoria</p> : <ListaCompraDetalles />}
        </>
    )
}
export default PaginaListasCompra;