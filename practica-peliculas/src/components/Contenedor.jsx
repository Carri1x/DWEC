import React, { Children } from 'react';
import './Contenedor.css';

const Contenedor = (props) => {
  return (
    <div className='contenedor'>
        {props.children}
    </div>
  )
}

export default Contenedor;
