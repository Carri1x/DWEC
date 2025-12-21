import { useContext } from 'react';
import './ListaNaves.css';
import { contextoPersonajes } from '../context/ProveedorPersonajes';
import Nave from './Nave.jsx';

const ListaNaves = () => {

    const {navesPersonaje} = useContext(contextoPersonajes);

    return (
        <div className='contenedor-lista-vehiculos'>
            <h4>Naves espaciales que pilota: </h4>
            {
                navesPersonaje.map((nave) => {
                    return <Nave key={nave.name} nave={nave}/>;
                })
            }
        </div>
    );
};

export default ListaNaves;