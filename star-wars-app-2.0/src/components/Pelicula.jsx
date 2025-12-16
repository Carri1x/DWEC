import { useState, useEffect, useContext } from 'react';
import './Pelicula.css';
import { contextoPeliculas } from '../context/ProveedorPeliculas.jsx';
import ProveedorPersonajes from '../context/ProveedorPersonajes.jsx';
import { cambiarFechaFormatoEspanya } from '../libraries/util.js';
import ListaPersonajes from './ListaPersonajes.jsx';

const Pelicula = (props) => {
    const { idPeliculaSeleccionada } = props;
    const [pelicula, setPelicula] = useState({});
    const {peliculasCntxt} = useContext(contextoPeliculas);

    /**
     * Busca una película, en el contextoPelículas, que se haya seleccionado para enseñarla al usuario con todos sus detalles.
     * 
     * @param {String} id que determina que película va a mostrarse por pantalla. 
     * @returns Devuelve la Película que ha seleccionado el usuario en el listado de películas.
     */
    const buscarPeliculaSeleccionada = (id) => {
        return peliculasCntxt.find((peli) => {
            return peli.episode_id == id;
        })
    }


    /**
     * Cuando se haya seleccionado el id pasaremos a ejecutar el la renovación del estado película.
     */
    useEffect(() => {
        const peliculaAMostrar = buscarPeliculaSeleccionada(idPeliculaSeleccionada);
        setPelicula(peliculaAMostrar);
        //Si no hacía una dependencia en idPeliculaSeleccionada no cambiaba de película...
    }, [idPeliculaSeleccionada]);

    return (
        <div className='contenedor-pelicula'>
            <h2 className='titulo-pelicula'>{pelicula.title}</h2>
            <h3>Sinapsis: </h3>
            <p>{pelicula.opening_crawl}</p>
            <h3>Director: <strong>{pelicula.director}</strong></h3>
            <small>Fecha de lanzamiento: <strong>{cambiarFechaFormatoEspanya(pelicula.release_date)}</strong></small>
            <h3>Personajes: </h3>
            {   
                <ProveedorPersonajes urlPersonajes={pelicula.characters}>
                    <ListaPersonajes />
                </ProveedorPersonajes>
            }
        </div>
    );

}

export default Pelicula;