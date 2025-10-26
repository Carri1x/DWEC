import './Galeria.css';
import db from '../data/peliculas.json';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../shared/Menu.jsx';
const Galeria = () => {
    const localizacion = useLocation();
    //Si es la ruta base quiero que me muestre todas las fotos.
    //Si no es la ruta base quiero que me muestre el componente del filtro que estamos aplicando en Outlet.
    //Por eso uso useLocation().
    const esRutaGaleria = localizacion.pathname === '/galeria'; 
    const navegar = useNavigate();
    //Lo que hago con estas rutas es hacer un componente dinámico Menú, con su estilo ya predefinido.
    const rutas =[
                    {
                        to:"/galeria/titulo",
                        nombre:"Título"
                    },
                    {
                        to:"/galeria/interprete",
                        nombre:"Intérprete"
                    },
                    {
                        to:"/galeria/director",
                        nombre:"Director"
                    },
                    {
                        to:"/galeria",
                        nombre:"Quitar filtro"
                    }
                ];
    return (
        <>
            <Menu titulo='Filtrar por: ' rutas={rutas}/>  
            {
            esRutaGaleria ? //Si es la ruta base quiero que me muestre todas las fotos.
            db.peliculas.map((pelicula, i, a) => {
                return <img 
                            key={i} 
                            src={pelicula.cartel} 
                            className='galeria-img'
                            onClick={()=>{
                                navegar(`/pelicula/${pelicula.titulo}`); //¿Por qué no? jajaja. 
                            }}
                            alt={`Cartel de la película ${pelicula.titulo}`} />;
            })
            : //Si no es la ruta base quiero que me muestre el componente del filtro que estamos aplicando en Outlet.
            <Outlet />
            }
        </>
    );
}

export default Galeria;

/* Me he cansado ya de hacer esto y darles estilo... A partir de ahora usaré el componente Menu.jsx para los menús internos.
    Alomejor no lo uso y lo he hecho para nada, pero bueno, ya lo tengo hecho. Puede servirme para otra cosa.
<nav> 
    <Link to='/galeria/titulo' >Título</Link>
    <Link to='/galeria/interprete'>Intérprete</Link>
    <Link to='/galeria/director'>Director</Link>
    <Link to='/galeria'>Quitar filtro</Link>
</nav>
*/