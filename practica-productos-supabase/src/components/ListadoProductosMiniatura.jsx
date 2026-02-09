import './ListadoProductosMiniatura.css';
import ProductoMiniatura from "./ProductoMiniatura";
import useContextoListaCompra from '../hooks/useContextoListaCompra';

const ListadoProductosMiniatura = (props) => {

    const productosAccesibles = props.value;

    const {
        lista,
        añadirProducto,
    } =useContextoListaCompra();

    return(
        <section className="section-listado-productos-miniatura"
            onClick={(evento) => {
                if(evento.target.closest('.container-producto-miniatura') && evento.target.tagName === 'IMG') {
                    const idProducto = evento.target.closest('.container-producto-miniatura').id;
                    añadirProducto(lista.id, idProducto);
                }
            }}
        >
            {productosAccesibles ? productosAccesibles.map((producto)=> {
                return <ProductoMiniatura key={producto.id} value={producto}/>
            }) : <p>No hay productos accesibles.</p>}
        </section>
    )
}

export default ListadoProductosMiniatura;