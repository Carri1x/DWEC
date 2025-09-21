import React from 'react';
import './Interprete.css';

const Interprete = (props) => {
    const customAlt = `Foto de ${props.name}`;
  return (
    <>
        <div className='interprete-container'>
            <img src={props.photo} alt={customAlt} />
            <div className='interprete-name-biography'>
              <h4>{props.name}</h4>
              {props.children}
            </div>
        </div>
    </>
  );
}

export default Interprete;
