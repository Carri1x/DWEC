import './ListadoProductos.css';
import { useState, useRef } from 'react';
import useContextoProductos from '../hooks/useContextoProductos.js';
import Producto from './Producto.jsx';
import Cargando from '../shared/Cargando.jsx';
import { filtrarObjeto } from '../libraries/libreria.js';
import FiltrarProductos from './FiltrarProductos.jsx';

const ListadoProductos = () => {
    const { productos, cargando, productosFiltrados } = useContextoProductos();
    const totalProductos = productos?.length || 0;
    const costeTotal = productos?.reduce((acumulador, producto) => acumulador + (Number(producto.precio) || 0), 0) || 0;


    return (
        <div className="listado-container">
            <FiltrarProductos />
            {
                //Si hay productos filtrados los enseñamos.
                productosFiltrados.length > 0 ? (
                    <div className='productos-grid'>
                        {
                            productosFiltrados.map((producto) => {
                                return <Producto key={producto.id} value={producto} />
                            })
                        }
                    </div>
            ) : ( //En caso de que no haya ningún filtro, enseñamos todos los productos.
                    cargando ? <Cargando contexto="productos..." /> : (
                        //Si está cargando, muestro el componente de cargando, si no, muestro los productos.
                        <div className="productos-grid">
                            { //Si hay productos, los mapeo, si no muestro mensaje de que no hay productos...
                                productos && productos.length > 0 ? (
                                    productos.map((producto) => (
                                        <Producto key={producto.id} value={producto} />
                                    ))
                                ) : (
                                    <p>No hay productos guardados aún.</p>)}
                        </div>
                    )
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
}

export default ListadoProductos;