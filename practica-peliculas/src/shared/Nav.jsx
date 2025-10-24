import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import PeliculaMiniatura from '../components/PeliculaDetalle';

const Nav = () => {
  return (
    <nav className='navegacion'>
        <Link to='/'>Inicio</Link>
        <Link to='/contacto'>Contacto</Link>
        <Link to='/peliculas'>Peliculas</Link>
        <Link to='/interpretes'>Interpretes</Link>
        <Link to='/acerca-de'>About us</Link>
    </nav>
  )
}

export default Nav;