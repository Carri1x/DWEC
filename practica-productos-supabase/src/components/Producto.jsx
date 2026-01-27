import './Producto.css';

const Producto = (props) => {
    const { nombre, peso, precio, imagen, descripcion } = props.value;
    return (
        <div className="producto-card">
            <h3>{nombre}</h3>
            <img src={imagen} alt={`Imagen de ${nombre}`} />
            <p>Peso: {peso} kg</p>
            <p>Precio: {precio}€</p>
            <p>{descripcion}</p>
        </div>
    );
}

export default Producto;