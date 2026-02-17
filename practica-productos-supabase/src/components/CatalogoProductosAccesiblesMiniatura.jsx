import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import ListadoProductosMiniatura from "./ListadoProductosMiniatura.jsx";

const CatalogoProductosAccesiblesMiniatura = () => {

  const {
    productosAccesibles,
    modoAddProductos,
  } = useContextoListaCompra()

    return (
      <>
        {
          //Aquí tenemos el catálogo de los productos que AÚN NO TIENE SELECCIONADOS EN SU LISTA DE LA COMPRA.
          modoAddProductos && productosAccesibles.length > 0 && (
            <div className="catalogo-productos">
              <ListadoProductosMiniatura value={productosAccesibles} />
            </div>
          )
        }
      </>
    );
}

export default CatalogoProductosAccesiblesMiniatura;