import Menu from "./Menu.jsx";
import './Header.css';

const Header = () => {
    const rutas = [
        {
            to:'/',
            nombre:'Inicio'
        },
        {
            to:'/insertar-disco',
            nombre:'Insertar discos'
        },
        {
            to:'/lista-discos',
            nombre:'Lista de discos'
        }
        
    ];
    
    return (
        <div className="contenedor-header">
            <h1>D-libr-iscos 2ºDAW</h1>
            <div className="contenedor-menu">
                <Menu rutas={rutas}/>
            </div>
        </div>
    );
}

export default Header;