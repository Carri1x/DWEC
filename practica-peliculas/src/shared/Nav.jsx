import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className='navegacion'>
        <Link to='/'>Inicio</Link>
        <Link to='/contacto'>Contacto</Link>
        <Link to='/peliculas'>Peliculas</Link>
        <Link to='/acerca-de'>Acerca de</Link>
    </nav>
  )
}

export default Nav;