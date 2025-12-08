import './Peliculas.css';
import { useEffect, useState } from 'react';
import Pelicula from './Pelicula.jsx';
import { fetchPeliculas } from '../js/peticionesPeliculas.js';
import Cargando from './Cargando.jsx';

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState([]);

    const traerPeliculas = async () => {
        const peliculasDB = await fetchPeliculas();
        setPeliculas(peliculasDB);
    }

    useEffect(() => {
        traerPeliculas();
    },[]);

    return (
        <div className='contenedor-peliculas'>
            {peliculas ?
            peliculas.map((pelicula) => (
                <Pelicula key={pelicula.episode_id} pelicula={pelicula} />
            )) : <Cargando contexto="peliculas de Star Wars"/>}
        </div>
    );
}

export default Peliculas;