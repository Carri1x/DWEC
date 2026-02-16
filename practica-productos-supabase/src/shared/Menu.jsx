import useContextoSesion from '../hooks/useContextoSesion.js';
import './Menu.css';
import {Link} from 'react-router-dom';

const Menu = () => {

    const { sesionIniciada, esAdmin } = useContextoSesion();

    return (
        <div className='contenedor-menu'>
            <Link to={'/'}>Inicio</Link>
            <Link to={'/listado-productos'}>Listado Productos</Link> 
            { 
                //Si es Admin pordá acceder a crear producto.
                esAdmin && 
                <Link to={'/crear-producto'}>Crear Producto</Link>
            }
            {   //Si tiene la sesión iniciada, tanto sea admin o no, podrá acceder a la lista de la compra.
                sesionIniciada && <Link to={`/lista-compra/`}>{esAdmin ? 'Listas de la compra':'Lista Compra'}</Link>
            }
        </div>
    );
}

export default Menu;