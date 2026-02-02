import useContextoSesion from '../hooks/useContextoSesion.js';
import './Menu.css';
import {Link} from 'react-router-dom';

const Menu = () => {

    const { sesionIniciada } = useContextoSesion();

    return (
        <div className='contenedor-menu'>
            <Link to={'/'}>Inicio</Link>
            <Link to={'/sup/listado-productos'}>Listado Productos</Link> 
            { sesionIniciada && 
                <>
                    <Link to={'/sup/crear-producto'}>Crear Producto</Link>
                    <Link to={'/sup/listas-compra'}>Lista Compra</Link>
                </>
            }
        </div>
    );
}

export default Menu;