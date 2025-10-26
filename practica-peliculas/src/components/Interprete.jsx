import React from 'react';
import './Interprete.css';

const Interprete = (props) => {
    const customAlt = `Foto de ${props.nombre}`;
  return (
    <>
        <div className='interprete-container'>
            <img src={props.foto} alt={customAlt} />
            <div className='interprete-name-biography'>
              <h3>{props.nombre}</h3>
              {props.children}
            </div>
        </div>
    </>
  );
}

export default Interprete;
