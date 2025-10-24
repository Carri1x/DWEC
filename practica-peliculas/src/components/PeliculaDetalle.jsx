import React from 'react';
import './PeliculaDetalle.css';
import db from '../data/peliculas.json';
import { useParams } from 'react-router-dom';

const PeliculaDetalle = () => {
    const {tituloParametro} = useParams();
    return (
        <>

            {db.peliculas.map((pelicula) => {
                if (pelicula.titulo === tituloParametro) {
                    return (
                        <div className='pelicula-detalle-container'>
                            <h2>{pelicula.titulo}</h2>
                            <div className='pelicula-main'>
                                <img src={pelicula.cartel} alt={`Cartel de la película ${pelicula.titulo}`} />
                                <div className='pelicula-info'>
                                    <h4>Director: {pelicula.director}</h4>
                                    <p>{pelicula.resumen}</p>
                                </div>
                            </div>
                            <div className='pelicula-buttons'>
                                <Taquilla cantidad={pelicula.recaudacion} />
                                <Elenco interpretes={pelicula.interpretes} />
                            </div>
                        </div>
                    );
                }
            })?? `${tituloParametro}, No se encuentra.`}
        </>
    )
}

export default PeliculaDetalle;
