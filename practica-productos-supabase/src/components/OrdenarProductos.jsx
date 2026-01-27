import { useState } from "react";
import useContextoProductos from "../hooks/useContextoProductos";
import "./Controles.css";

const OrdenarProductos = () => {
    const {ordenarProductos} = useContextoProductos();
    const [columnaOrdenado, setColumnaOrdenado] = useState('nombre');
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