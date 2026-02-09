import './ListaCompraDetalles.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import useContextoProductos from "../hooks/useContextoProductos";
import ListadoProductosMiniatura from "./ListadoProductosMiniatura.jsx";
import ProductoMiniatura from "./ProductoMiniatura.jsx";

const ListaCompraDetalles = () => {
    const {idLista} = useParams();
    const {
        productos,
    } = useContextoProductos();
    const { 
        lista,
        cargarListaPorID
    } = useContextoListaCompra();

    const [modoAddProductos, setModoAddProductos] = useState(false);
    const [hayProductosAñadir, setHayProductosAñadir] = useState(true);
    const [productosAccesibles, setProductosAccesibles] = useState([])

    useEffect (() => {
        // Verificamos que tengamos tanto los productos generales como los de la lista.
    if (productos && lista?.productos) {
        
        //Filtramos el catálogo global.
        const filtrados = productos.filter(pGeneral => {
            // Buscamos si el producto del catálogo ya existe en la lista personal.
            const yaEstaEnLista = lista.productos.some(pLista => pLista.id === pGeneral.id);
            
            // Si NO está en la lista (!yaEstaEnLista), lo mantenemos en "Accesibles".
            return !yaEstaEnLista;
        });

        setProductosAccesibles(filtrados);
        
        // Opcional: Ocultar el botón si ya no quedan más productos por añadir.
        setHayProductosAñadir(filtrados.length > 0);
    }
    
    // IMPORTANTE: Ponemos las dependencias para que solo se ejecute
    // cuando cambien los productos del catálogo o los de tu lista.
}, [productos, lista.productos]);


    useEffect(() => {
        cargarListaPorID(idLista);
    }, [idLista])

    return (
        <div className="container-lista-compra-detalles">
            <h1>Lista de la compra: {lista?.nombre}</h1>
            { hayProductosAñadir && <button onClick={() => {
                setModoAddProductos(!modoAddProductos);
            }}> {modoAddProductos? 'Terminar':'Añadir productos' }</button>}
            {
                lista.productos && lista.productos.length > 0 ? (
                    lista.productos.map((producto) => {
                        return <ProductoMiniatura key={producto.id} value={producto} idLista={lista.id}/>
                    })
                ) : ( <p>No hay productos añadidos en esta lista.</p>)
            }
            <div className="catalogo-productos">
                {modoAddProductos && <ListadoProductosMiniatura value={productosAccesibles} />}
            </div>
        </div>
    )
}

export default ListaCompraDetalles;