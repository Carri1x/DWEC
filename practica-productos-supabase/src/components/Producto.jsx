import './Producto.css';
import useContextoSesion from "../hooks/useContextoSesion.js";
import { Link } from "react-router-dom";

const Producto = (props) => {
    const { sesionIniciada } = useContextoSesion();
    const { id, nombre, peso, precio, imagen, descripcion } = props.value;
    return (
        <div className="producto-card">
            <h3>{nombre}</h3>
            {imagen && <img src={imagen} alt={`Imagen de ${nombre}`} />}
            <p>Peso: {peso} kg</p>
            <p>Precio: {precio}€</p>
            <p>{descripcion}</p>
            {
                sesionIniciada ? <>
                    <button className='btn' data-tipo="eliminar-producto" data-id={id}>Eliminar</button>
                    <button className='btn' data-tipo="editar-producto" data-id={id}>Editar</button>
                </> : <Link to='/login'><small>Inicia sesión si quieres acceder a los controles de los productos.</small></Link>
            }

        </div>
    );
}

export default Producto;