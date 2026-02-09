import './ListadoProductosMiniatura.css';
import ProductoMiniatura from "./ProductoMiniatura";
import useContextoListaCompra from '../hooks/useContextoListaCompra';

/**
 * Componente que proporciona los productos que tiene accesibles el usuario para añadir en su lista de la compra.
 * 
 * @param {Object} props 
 * @returns Devuelve el listado de los productos que tiene accesibles el usuario para añadir en su lista de la compra.
 */
const ListadoProductosMiniatura = (props) => {

    const productosAccesibles = props.value;

    const {
        lista,
        añadirProducto,
    } =useContextoListaCompra();

    return(
        <section className="section-listado-productos-miniatura"
            onClick={(evento) => {
                /*Al ser este el apartado del listado de los productos que tiene por insertar en su lista de la compra.
                    En el momento que el usuario pinche en la foto(añadir) se añadirá este producto en su lista, 
                    ahora este producto formará parte de <ListaCompraDetalles/>,
                    que dentro tiene otros <ProductoMiniatura/> los cuales ahora tienen cantidad y se verán de otra forma.  
                */
                if(evento.target.closest('.container-producto-miniatura') && evento.target.tagName === 'IMG') {
                    //Escogemos el ID del producto que se ha seleccionado.
                    const idProducto = evento.target.closest('.container-producto-miniatura').id;
                    //Y lo añadimos a la lista que tiene ya pre-seleccionada.
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