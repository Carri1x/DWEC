import { useContext, useEffect, useState } from 'react';
import './DetallesPersonaje.css';
import { contextoPersonajes } from '../context/ProveedorPersonajes.jsx';
import { cambiarGeneroEspanya, cambiarFormatoFechaNacimiento } from '../libraries/util.js';
import ListaVehiculos from './ListaVehiculos.jsx';
import ListaNaves from './ListaNaves.jsx';

const DetallesPersonaje = () => {

    const { personajeSeleccionado,
        vehiculosPersonaje,
        cargarVehiculosPersonaje,
        vaciarVehiculosPersonaje,
        navesPersonaje,
        cargarNavesPersonaje
        } = useContext(contextoPersonajes);

    const [mostrarVehiculos, setMostrarVehiculos] = useState(false);

    useEffect(() => {
        if (!personajeSeleccionado) {
            vaciarVehiculosPersonaje();
            setMostrarVehiculos(false);
            return;
        }

        if (personajeSeleccionado.vehicles.length === 0) {
            vaciarVehiculosPersonaje();
            return;
        }

        cargarVehiculosPersonaje(personajeSeleccionado.vehicles);
        cargarNavesPersonaje(personajeSeleccionado.starships)
        return () => {
            setMostrarVehiculos(false);
        };
    }, [personajeSeleccionado]);

    return (
        <div className='contenedor-detalles-personaje'>
            {
                personajeSeleccionado ?
                    <div>
                        <p>Nombre: {personajeSeleccionado.name}</p>
                        <p>Altura: {personajeSeleccionado.height}</p>
                        <p>Peso: {personajeSeleccionado.mass}</p>
                        <p>Género: {cambiarGeneroEspanya(personajeSeleccionado.gender)}</p>
                        <p>Color de pelo: {personajeSeleccionado.hair_color}</p>
                        <p>Color de piel: {personajeSeleccionado.eye_color}</p>
                        <p>Cumpleaños: {cambiarFormatoFechaNacimiento(personajeSeleccionado.birth_year)}</p>
                        <button onClick={() => setMostrarVehiculos((mostrarVehiculos) => {
                            return !mostrarVehiculos;
                        })}>
                            Pilota
                        </button>
                        {mostrarVehiculos && (
                            <div className="contenedor-vehiculos-naves">
                                {
                                    vehiculosPersonaje.length > 0
                                        ? <ListaVehiculos />
                                        : <p>No pilota ningún vehículo.</p>
                                }
                                {
                                    navesPersonaje.length > 0
                                        ? <ListaNaves />
                                        : <p>No pilota ninguna nave espacial.</p>
                                }
                            </div>
                        )}

                    </div>
                    : <p>Selecciona un personaje para ver sus detalles.</p>
            }
        </div>
    );
}

export default DetallesPersonaje;