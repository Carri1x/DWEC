import useContextoListaCompra from "../hooks/useContextoListaCompra.js";


const BotonModoAddProductos = () => {

    const {
        productosAccesibles,
        modoAddProductos,
        cambiarModoAddProductos,
    } = useContextoListaCompra()

    return (
      <>
        {
          //Aquí en caso de que no hayan más productos para seleccionar en <ListadoProductosMiniatura /> borraremos el botón para que no ocupe espacio innecesario.
          //Si no hay productos accesibles es que no hay productos por añadir.
          productosAccesibles.length > 0 && (
            <button
              onClick={() => {
                cambiarModoAddProductos(!modoAddProductos);
              }}
            >
              {modoAddProductos ? "Terminar selección" : "Añadir productos"}
            </button>
          )
        }
      </>
    );
}

export default BotonModoAddProductos;