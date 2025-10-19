import React from 'react';
import './Pelicula.css';
import Taquilla from './Taquilla-component/Taquilla.jsx';
import Elenco from './Elenco-component/Elenco.jsx';

const Pelicula = (props) => {
    const {title, director,  movieListing, summary, dinero} = props;
    let alt = `Foto de la pelicula ${title}`;
  return (
    <>
        <div className='pelicula-container'>
            <h2>{title}</h2>
            <div className='pelicula-main'>
                <img src={movieListing} alt={alt} />
                <div className='pelicula-info'>
                    <h4>Director: {director}</h4>
                    <p>{summary}</p>
                </div>
            </div>
            <Taquilla cantidad={dinero}/>
            <Elenco interpretes={props.children}/>
        </div>
    </>
  )
}
/*
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
*/ 
export default Pelicula;
