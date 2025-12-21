import { useContext } from 'react';
import './ListaVehiculos.css';
import { contextoPersonajes } from '../context/ProveedorPersonajes.jsx';
import Vehiculo from './Vehiculo.jsx';

const ListaVehiculos = () => {
    const {vehiculosPersonaje} = useContext(contextoPersonajes);

    return (
        <div className='contenedor-lista-vehiculos'>
            <h4>Vehículos que pilota: </h4>
            {
                vehiculosPersonaje.map((vehiculo) => {
                    return <Vehiculo key={vehiculo.name} vehiculo={vehiculo}/> 
                })
            }
        </div>
    )
}

export default ListaVehiculos;