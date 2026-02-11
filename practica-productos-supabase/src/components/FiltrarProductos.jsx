import { useState, useRef } from "react";
import useContextoProductos from "../hooks/useContextoProductos.js";
import "./Controles.css";

const FiltrarProductos = () => {
    const { filtrarProductos, borrarFiltroProductos } = useContextoProductos();
    // Este estado `filro` es el nombre por el que va a querer filtrar los productos. Ej= uva (uva riquisima), uv (uva riquisima), manz (manzana)...
    const [filtro, setFiltro] = useState('');
    //Este estado `opcionFiltrado` es la columna por la que va a querer el usuario filtrar.
    const [opcionFiltrado, setOpcionFiltrado] = useState('nombre');
    // Este useRef() se usa solamente para borrar el valor del filtro que ha querido ejecutar el usuario.
    const refFiltro = useRef();

    /**
     * Función que se encarga de cambiar el estado del filtro 
     * y la opción de filtrado cada vez que el usuario escriba en el input 
     * o cambie la opción de filtrado.
     * 
     * @param {Event} evento 
     */
    const cambiarEstado = (evento) => {
        const { name, value } = evento.target;
        if (name === 'opcion-filtro') {
            setOpcionFiltrado(value);
        } else {
            setFiltro(value);
        }
    }

    /**
     * Función que borra el filtro aplicado, tanto en el estado del componente como en el contexto de productos, 
     * para que se muestren todos los productos.
     * 
     */
    const borrarFiltro = () => {
        borrarFiltroProductos();
        setFiltro('');
        refFiltro.current.value = '';
    }

    return (
        <div className="control-group">
            <h3>Filtrar por</h3>
            <div className="flex-row">
                <select name="opcion-filtro" className="input-custom" style={{width: 'auto'}} onChange={cambiarEstado}>
                    <option value="nombre">Nombre</option>
                    <option value="peso">Peso</option>
                    <option value="precio">Precio</option>
                </select>

                <input 
                    type="text" 
                    className="input-custom" 
                    placeholder='Escriba para filtrar...'
                    ref={refFiltro}
                    style={{flex: 1}}
                    onChange={cambiarEstado} 
                />
                
                <button className="btn-primary" onClick={() => filtrarProductos(filtro, opcionFiltrado)}>
                    Filtrar
                </button>

                {filtro.length > 0 && (
                    <button className="btn-primary btn-secondary" onClick={borrarFiltro}>
                        Limpiar
                    </button>
                )}
            </div>
        </div>
    )
}

export default FiltrarProductos;