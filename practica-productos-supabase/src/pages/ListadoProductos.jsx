import "./ListadoProductos.css";
import { useState, useEffect } from "react";
import useContextoProductos from "../hooks/useContextoProductos.js";
import Producto from "../components/Producto.jsx";
import Cargando from "../shared/Cargando.jsx";
import FiltrarProductos from '../components/FiltrarProductos.jsx';
import OrdenarProductos from "../components/OrdenarProductos.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import { useNavigate } from "react-router-dom";
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import ListasCompraMiniatura from "../components/ListasCompraMiniatura.jsx";

const ListadoProductos = () => {
  const { sesionIniciada } = useContextoSesion();
  const { confirmarAccion } = useContextoMensajes();
  const {
    cargando,
    mensajeCargando,
    productos,
    productosFiltrados,
    eliminarProducto,
  } = useContextoProductos();
  const [totalProductos, setTotalProductos] = useState(0);
  const [costeTotal, setCosteTotal] = useState(0);
  const navegar = useNavigate()

  /** -------------------------------------- EFECT CALCULO TOTAL PRODUCTOS Y COSTE TOTAL --------------------------------------
   * Cada vez que cambie los estados de productos y productos filtrados se harán los calculos de coste total y conteo total de productos.
   */
  useEffect(() => {
    if (productosFiltrados.length > 0) {
      setTotalProductos(productosFiltrados?.length || 0);
      setCosteTotal(productosFiltrados?.reduce((acumulador, producto) => acumulador + (Number(producto.precio) || 0), 0) || 0)

    } else {
      setTotalProductos(productos?.length || 0);
      setCosteTotal(productos?.reduce((acumulador, producto) => acumulador + (Number(producto.precio) || 0), 0,) || 0,);
    }
  }, [productos, productosFiltrados]); // ------------------------------------ END EFECT CALCULO TOTAL PRODUCTOS Y COSTE TOTAL ------------------------------------

  return (
      <div className="listado-container" onClick={async (evento) => {
        if (evento.target.tagName !== 'BUTTON') return;
        const idProducto = evento.target.dataset.id;

        if (evento.target.dataset.tipo === 'editar-producto') { //--------------------------------- APARTADO EDITAR PRODUCTO -----------------------------------
          navegar(`/editar-producto/${idProducto}`); //Navegamos a la página de editar producto.
        } //--------------------------------------------------------------------------------------- END APARTADO EDITAR PRODUCTO -------------------------------
        //------------------------------------------------------------------------------------------------------------------------------------------------------
        if (evento.target.dataset.tipo === 'eliminar-producto') { //--------------------------------- APARTADO ELIMINAR PRODUCTO -------------------------------
          const producto = productos.find((prod) => prod.id.toString() === idProducto);

          const usuarioAcepta = await confirmarAccion(`¿Quieres eliminar ${producto?.nombre} de la lista de productos?`);

          if (usuarioAcepta) {
            await eliminarProducto(producto.id)
          }

        } //---------------------------------------------------------------------------------------- END APARTADO ELIMINAR PRODUCTO ------------------------------

      }}>
        <h1>Productos</h1>
        {cargando && <Cargando contexto={mensajeCargando} />}
        {sesionIniciada && <ListasCompraMiniatura />}
        {sesionIniciada && (
          <div className="controles-container">
            <FiltrarProductos />
            <OrdenarProductos />
          </div>)
        }
        {
          // -------------------------------- LISTADO PRODUCTOS --------------------------------
          //Si hay productos filtrados los enseñamos. FILTRADO PRODUCTOS.
          productosFiltrados.length > 0 ? (
            <div className="productos-grid">
              {productosFiltrados.map((producto) => {
                return <Producto key={producto.id} value={producto} />;
              })}
            </div>
          ) : //En caso de que no haya ningún filtro, enseñamos todos los productos. NO HAY PRODUCTOS FILTRADOS.
             (
              //Muestro los productos.
              <div className="productos-grid">
                {
                  //Si hay productos, los mapeo, si no muestro mensaje de que no hay productos...
                  productos && productos.length > 0 ? (
                    productos.map((producto) => (
                      <Producto key={producto.id} value={producto} />
                    ))
                  ) : (
                    //Aquí como no ha habido productos ni en PRODUCTOS FILTRADOS ni en PRODUCTOS tengo que decir que no hay productos.
                    <p>No hay productos guardados aún.</p>
                  )
                }
              </div>
            )
      /* -----------------------------------END LISTADO PRODUCTOS ----------------------------------- */}

        {/* Div de información productos abajo del todo. */}
        {productos && productos.length > 0 && (
          <div className="resumen-fijo">
            <div className="resumen-item">
              <span>Total Productos</span>
              <strong>{totalProductos}</strong>
            </div>
            <div className="resumen-item">
              <span>Precio medio</span>
              <strong>{costeTotal.toFixed(2)}€</strong>
            </div>
          </div>
        )}
      </div>
  );
};

export default ListadoProductos;
