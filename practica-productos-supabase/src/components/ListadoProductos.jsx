import "./ListadoProductos.css";
import { useState, useRef, useEffect } from "react";
import useContextoProductos from "../hooks/useContextoProductos.js";
import Producto from "./Producto.jsx";
import Cargando from "../shared/Cargando.jsx";

const ListadoProductos = () => {
  const { productos, cargando, productosFiltrados } = useContextoProductos();
  const [totalProductos, setTotalProductos] = useState(0);
  const [costeTotal, setCosteTotal] = useState(0);

  /**
   * Cada vez que cambie los estados de productos y productos filtrados se harán los calculos de coste total y conteo total de productos.
   */
  useEffect(() => {
    if (productosFiltrados.length > 0) {
        setTotalProductos(productosFiltrados?.length || 0);
        setCosteTotal(productosFiltrados?.reduce((acumulador, producto) => acumulador + (Number(producto.precio) || 0), 0) || 0)

    } else {
        setTotalProductos(productos?.length || 0);
        setCosteTotal(
        productos?.reduce((acumulador, producto) => acumulador + (Number(producto.precio) || 0),0,) || 0,);
    }
  }, [productos, productosFiltrados]);

  return (
    <div className="listado-container">
      {
        //Si hay productos filtrados los enseñamos. FILTRADO PRODUCTOS.
        productosFiltrados.length > 0 ? (
          <div className="productos-grid">
            {productosFiltrados.map((producto) => {
              return <Producto key={producto.id} value={producto} />;
            })}
          </div>
        ) : //En caso de que no haya ningún filtro, enseñamos todos los productos. NO HAY PRODUCTOS FILTRADOS
        //PRIMERO COMPROBAMOS SI ESTÁ CARGANDO...
        cargando ? (  
          <Cargando contexto="productos..." /> //Si está cargando, muestro el componente de cargando
        ) : (
          //Si no, muestro los productos.
          <div className="productos-grid">
            {
              //Si hay productos, los mapeo, si no muestro mensaje de que no hay productos...
              productos && productos.length > 0 ? (
                productos.map((producto) => (
                  <Producto key={producto.id} value={producto} />
                ))
              ) : (
                <p>No hay productos guardados aún.</p>
              )
            }
          </div>
        )
      }

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
