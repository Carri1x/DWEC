import React from 'react';

const Pelicula = (props) => {
  return (
    <>
        <div className='pelicula-container'>
            <h2>{props.title}</h2>
            <h5>Director: {props.director}</h5>
            <div className='interpretes'>
                <h5>Intérpretes:</h5>
                {props.children}
            </div>
        </div>
    </>
  )
}

export default Pelicula;
