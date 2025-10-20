import React from 'react';
import './Interprete.css';

const Interprete = (props) => {
    const customAlt = `Foto de ${props.name}`;
  return (
    <>
        <div className='interprete-container'>
            <img src={props.photo} alt={customAlt} />
            <div className='interprete-name-biography'>
              <h3>{props.name}</h3>
              {props.children}
            </div>
        </div>
    </>
  );
}

export default Interprete;
