import ListasCompraMiniatura from "../components/ListasCompraMiniatura.jsx";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import ProductoMiniatura from "../components/ProductoMiniatura.jsx";
import ListadoUsuariosMiniatura from "../components/ListadoUsuariosMiniatura.jsx";

const PaginaAdminListaCompra = () => {

    const {
        usuarioSeleccionado,
        lista,
    } = useContextoListaCompra();

    return (
      <div className="main-container-admin-lista-compra">
        <ListadoUsuariosMiniatura />
        {usuarioSeleccionado && <ListasCompraMiniatura />}
        {lista.productos &&
            lista.productos.length > 0 ? (
          
          lista.productos.map((producto) => {
            return (
              <ProductoMiniatura
                key={producto.id}
                value={producto}
                //No pasamos el id de la lista porque no vamos a querer cambiar ninguna cantidad de ningún producto.
              />
            );
          })
        ) : (
          <p>No hay ninguna lista seleccionada.</p>
        )}
      </div>
    );
}

export default PaginaAdminListaCompra;