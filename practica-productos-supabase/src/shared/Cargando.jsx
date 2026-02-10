import './Cargando.css';
import gifCargando from '../assets/cargando.gif';

const Cargando = (props) => {
    const {contexto} = props;

    return (
        <div className="cargando">
            <img src={gifCargando} alt="Gif de Cargando"/>
            {contexto && <p>{contexto}</p>}
        </div>
    );
}

export default Cargando;