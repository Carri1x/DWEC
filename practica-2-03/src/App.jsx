import './App.css'
import { Link, Router } from 'react-router-dom';
import Rutas from './Router/Rutas.jsx';

function App() {

  return (
    <>
      <nav className='navegacion'>
        <Link to='/'>Inicio</Link>
        <Link to='/contacto'>Contacto</Link>
        <Link to='/peliculas'>Peliculas</Link>
        <Link to='/acerca-de'>Acerca de</Link>
      </nav>

      <Rutas />
    </>
  );
}

export default App;
