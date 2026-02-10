import useContextoSesion from '../hooks/useContextoSesion.js';
import './Menu.css';
import {Link} from 'react-router-dom';

const Menu = () => {

    const { sesionIniciada } = useContextoSesion();

    return (
        <div className='contenedor-menu'>
            <Link to={'/'}>Inicio</Link>
            <Link to={'/sup/lyp/listado-productos'}>Listado Productos</Link> 
            { 
                //Si tiene la sesión iniciada pordá acceder a crear producto y lista de la compra.
            sesionIniciada && 
                <>
                    <Link to={'/sup/crear-producto'}>Crear Producto</Link>
                    <Link to={`/sup/lyp/lista-compra/`}>Lista Compra</Link>
                </>
            }
        </div>
    );
}

export default Menu;