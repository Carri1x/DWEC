import './Vehiculo.css';

const Vehiculo = (props) => {
    const {name, model, manufacturer, cost_in_credits, max_atmosphering_speed, passengers, vehicle_class} = props.vehiculo;

    return (
        <div className='contenedor-vehículo'>
            <h4>{name}</h4>
            <p>Modelo: {model}</p>
            <p>Tipo de vehículo: {vehicle_class}</p>
            <p>Fabricante: {manufacturer}</p>
            <p>Coste: {cost_in_credits}</p>
            <p>Velocidad máxima: {max_atmosphering_speed}</p>
            <p>Pasajeros: {passengers}</p>
        </div>
    )
}

export default Vehiculo;