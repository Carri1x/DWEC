import "./ListaCompraDetalles.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import Cargando from "../shared/Cargando.jsx";
import ListasCompraMiniatura from "../components/ListasCompraMiniatura.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import CalculoCantidadPrecio from "../components/CalculoCantidadPrecio.jsx";
import CatalogoProductosEnLista from "../components/CatalogoProductosEnLista.jsx";
import CatalogoProductosAccesiblesMiniatura from "../components/CatalogoProductosAccesiblesMiniatura.jsx";
import BotonModoAddProductos from "../components/BotonModoAddProductos.jsx";
import ListadoUsuariosMiniatura from "../components/ListadoUsuariosMiniatura.jsx";

const ListaCompraDetalles = () => {
    const { idLista } = useParams();

    const { sesionIniciada, esAdmin } = useContextoSesion();

    const {
        cargando,
        mensajeCargando,
        lista,
        cargarListaPorID,
    } = useContextoListaCompra();

    /**
     * Este useEffect es para traer/cargar las listas cuando se carga este componente.
     */
    useEffect(() => {
        //Si hay id de la lista a la que queremos solicitar la lista.
        if (idLista) {
            cargarListaPorID(idLista);
        }
    }, [idLista]);

    return (
        <div className="main-container-lista-compra-detalles">
            {cargando && <Cargando contexto={mensajeCargando} />}

            { //Si es ADMIN vemos el listado de los usuarios.
            esAdmin && <ListadoUsuariosMiniatura />} 
                {/*Si no es ADMIN y tiene la SESIÓN INICIADAD vemos las listas de la compra.*/} 
            {sesionIniciada && <ListasCompraMiniatura />}

            <div className="container-lista-compra-detalles">
                {lista && lista.nombre ? (
                    <>
                        <h1>Lista de la compra: {lista?.nombre}</h1>
                        {!esAdmin && <BotonModoAddProductos />}
                        <CatalogoProductosEnLista /> 
                        {!esAdmin && <CatalogoProductosAccesiblesMiniatura/>}
                        <CalculoCantidadPrecio/>
                    </>
                ) : (
                    esAdmin ?
                    <>
                        <p>Selecciona la lista de algún usuario</p>
                    </>:
                    <>
                        <p>No hay ninguna lista seleccionada.</p>
                        <small>Selecciona una lista de las que hay en la parte izquierda de tu pantalla</small>
                        <small>En caso de no haber ninunga puedes seleccionar la opción superior de crear una nueva.</small>
                    </>
                )}
            </div>
        </div>
    );
};

export default ListaCompraDetalles;
