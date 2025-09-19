import React from 'react';
import './Pelicula.css';

const Pelicula = (props) => {
  let alt = `Foto de la pelicula ${props.title}`;

  console.log(props)
  return (
    <>
        <div className='pelicula-container'>
            <div className='pelicula-caracteristicas'>
              <h2>{props.title}</h2>
              <h5>Director: {props.director}</h5>
              <img src={props.movieListing} alt={alt}></img>
            </div>
            <div className='pelicula-interpretes'>
              <p>{props.summary}</p>
              <h5>Intérpretes:</h5>
                {props.children}  
            </div>
        </div>
    </>
  )
}

export default Pelicula;
