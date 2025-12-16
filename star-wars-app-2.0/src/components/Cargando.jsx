import './Cargando.css';
import gifCargando from '../assets/cargando.gif';

const Cargando = (props) => {
    const {contexto} = props;

    return (
        <div className="contenedor-cargando">
            <img src={gifCargando} alt="Gif de Cargando"/>
            <p>Cargando {contexto}</p>
        </div>
    );
}

export default Cargando;