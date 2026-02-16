import './Producto.css';
import useContextoSesion from "../hooks/useContextoSesion.js";
import { Link } from "react-router-dom";
import { formatearPesoEspanya, formatearMonedaEspanya } from '../libraries/libreria.js';

const Producto = (props) => {
    const { esAdmin } = useContextoSesion();
    const { id, nombre, peso, precio, imagen, descripcion } = props.value;
    return (
        <div className="producto-card">
            <h3>{nombre}</h3>
            {imagen && <img src={imagen} alt={`Imagen de ${nombre}`} />}
            <p>Peso: {formatearPesoEspanya(peso)} kg</p>
            <p>Precio: {formatearMonedaEspanya(precio)}</p>
            <p>{descripcion}</p>
            {   //Si tiene la sesión iniciada puede acceder a eliminar y editar productos.
                esAdmin && 
                <>
                    <button className='btn' data-tipo="eliminar-producto" data-id={id}>Eliminar</button>
                    <button className='btn' data-tipo="editar-producto" data-id={id}>Editar</button>
                </> 
            }

        </div>
    );
}

export default Producto;