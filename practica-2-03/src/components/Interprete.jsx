import React from 'react';
import './Interprete.css';

const Interprete = (props) => {
    const customAlt = `Foto de ${props.name}`;
  return (
    <>
        <div className='interprete-container'>
            <img className='interprete-img' src={props.photo} alt={customAlt} />
            <h6>{props.name}</h6>
            {props.children}
        </div>
    </>
  );
}

export default Interprete;
