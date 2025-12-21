import './Vehiculo.css';

const Nave = (props) => {
    const {name, model, manufacturer, cost_in_credits, max_atmosphering_speed, passengers, starship_class, MGLT} = props.nave;

    return (
        <div className='contenedor-vehículo'>
            <h4>{name}</h4>
            <p>Modelo: {model}</p>
            <p>Tipo de nave espacial: {starship_class}</p>
            <p>Fabricante: {manufacturer}</p>
            <p>Coste: {cost_in_credits}</p>
            <p>Velocidad máxima: {max_atmosphering_speed}</p>
            <p>Velocidad sublumínica: {MGLT}</p>
            <p>Pasajeros: {passengers}</p>
        </div>
    );
};

export default Nave;