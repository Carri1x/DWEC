import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = (props) => {
    const rutas = props.rutas;
    const tituloFiltro = props.titulo;
    return (
        <div className='contenedor-menu'>
            {
                tituloFiltro && <h4>{tituloFiltro}</h4> // Si existe tituloFiltro, muestra el h4 (Para que no se me olvide...).
            }
            {rutas.map((ruta) => {
                return <Link key={ruta.nombe} to={ruta.to}>{ruta.nombre}</Link>
            })}
        </div>
    )
}

export default Menu;
