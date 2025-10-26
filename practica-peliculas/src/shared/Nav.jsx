import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className='navegacion'>
        <Link to='/'>Inicio</Link>
        <Link to='/contacto'>Contacto</Link>
        <Link to='/peliculas'>Peliculas</Link>
        <Link to='/interpretes'>Interpretes</Link>
        <Link to='/galeria'>Galería Carteles</Link>
        <Link to='/acerca-de'>About us</Link>
    </nav>
  )
}

export default Nav;