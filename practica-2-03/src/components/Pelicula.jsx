import React from 'react';
import './Pelicula.css';

const Pelicula = (props) => {
  let alt = `Foto de la pelicula ${props.title}`;

  console.log(props)
  return (
    <>
        <div className='pelicula-container'>
            <h2>{props.title}</h2>
            <h5>Director: {props.director}</h5>
            <img src={props.movieListing} alt={alt}></img>
            <div className='interpretes'>
                {props.children}
                <h5>Intérpretes:</h5>
            </div>
        </div>
    </>
  )
}

export default Pelicula;
