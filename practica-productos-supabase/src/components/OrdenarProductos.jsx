import { useState } from "react";
import useContextoProductos from "../hooks/useContextoProductos";
import "./Controles.css";

const OrdenarProductos = () => {
    const {ordenarProductos} = useContextoProductos();
    //Este estado `columnaOrdenado` cambiará en caso de que el usuario use el HTMLElementSelect para cambiar por la opción que quiere ordenar.
    const [columnaOrdenado, setColumnaOrdenado] = useState('nombre');
    //Este estado cambiará cada vez que se clica en el botón, para identificar como va a querer ordenar el usuario. 
    const [ascendente, setAscendente] = useState(true);

    return (
        <div className="control-group">
            <h3>Ordenar por</h3>
            <div className="flex-row">
                <select className="input-custom" style={{width: 'auto'}} onChange={(e) => setColumnaOrdenado(e.target.value)}>
                    <option value="nombre">Nombre</option>
                    <option value="peso">Peso</option>
                    <option value="precio">Precio</option>
                </select>

                <button className="btn-primary btn-outline" onClick={() => setAscendente(!ascendente)}>
                    {ascendente ? 'Ascendente' : 'Descendente'}
                </button>

                <button className="btn-primary" onClick={() => ordenarProductos(columnaOrdenado, ascendente)}>
                    Aplicar Orden
                </button>
            </div>
        </div>
    )
}

export default OrdenarProductos;