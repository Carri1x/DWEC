import { useContext, useState, useEffect } from 'react';
import './ListaPeliculas.css';
import { contextoPeliculas } from '../context/ProveedorPeliculas.jsx';
import PeliculaNombre from './PeliculaNombre.jsx';
import Cargando from './Cargando.jsx';

const ListaPeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const {peliculasCntxt} = useContext(contextoPeliculas);

    useEffect(() => {
        //Cargamos el contexto de las películas en el estado películas.
        setPeliculas(peliculasCntxt);
    },[peliculasCntxt]);

    return(
        <div className='contenedor-pelicula-nombres'>
            {
                peliculas.length > 0 ? peliculas.map((pelicula, i, a) => {
                    return <PeliculaNombre key={i} title={pelicula.title} idPelicula={pelicula.episode_id}/>
                }) : <Cargando contexto={"películas"}/> //Si no hay películas en el peliculasState mostramos el conponente cargando... 
            }
        </div>
    );
}
export default ListaPeliculas;