import React from 'react';
import './PeliculaDetalle.css';
import db from '../data/peliculas.json';
import { useParams } from 'react-router-dom';
import Contenedor from './Contenedor.jsx';
import Pelicula from './Pelicula.jsx';

const PeliculaDetalle = () => {
    const {titulo} = useParams();

    console.log(titulo);
    return (
        <>

            {db.peliculas.map((pelicula, i, a) => {
                if (pelicula.titulo === titulo) {
                    return (
                        <div className='pelicula-container' key={i}>
                            <Contenedor>
                                <Pelicula
                                    titulo = {pelicula.titulo}
                                    director = {pelicula.director}
                                    cartel = {pelicula.cartel}
                                    resumen = {pelicula.resumen}
                                    dinero = {pelicula.recaudacion}
                                    año = {pelicula.año}
                                >
                                    {pelicula.interpretes}
                                </Pelicula>
                            </Contenedor>
                        </div>
                    );
                }
            })?? `${titulo}, No se encuentra.`};
        </>
    )
}

export default PeliculaDetalle;
