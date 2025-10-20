import React from 'react';
import './Pelicula.css';
import Taquilla from './Taquilla-component/Taquilla.jsx';
import Elenco from './Elenco-component/Elenco.jsx';

const Pelicula = (props) => {
    const {title, director,  movieListing, summary, dinero} = props;
    let alt = `Foto de la película ${title}`;
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
            <Taquilla  cantidad={dinero}/> 
            <Elenco  interpretes={props.children}/>
        </div>
    </>
  )
}
export default Pelicula;
