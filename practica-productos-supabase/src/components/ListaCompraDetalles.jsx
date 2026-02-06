import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import Producto from '../components/Producto.jsx';

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
        <div className="container-lista-compra-detalles">
            <h1>Lista de la compra: {lista?.nombre}</h1>
            {
                lista.productos && lista.produtos > 0 ? (
                    lista.productos.map((producto) => {
                        <Producto key={producto.id} value={producto}/>
                    })
                ) : ( <p>No hay productos añadidos en esta lista.</p>)
            }
            <div className="catalogo-productos">
                {/**Meter aqui los productos para que pueda el usuario añadirlos a su lista */}
            </div>   
        </div>
    )
}

export default ListaCompraDetalles;