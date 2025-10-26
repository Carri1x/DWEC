import './Pelicula.css';
import Taquilla from './Taquilla.jsx';
import Elenco from './Elenco.jsx';

const Pelicula = (props) => {
    const {titulo, director, cartel, resumen, dinero, año} = props;
    let alt = `Foto de la película ${titulo}`;

    return (
        <div className='pelicula-container'>
            <h2>{titulo}</h2>
            <div className='pelicula-main'>
                <img src={cartel} alt={alt} />
                <div className='pelicula-info'>
                    <h4>Director: {director}</h4>
                    <p>{resumen}</p>
                    <strong>Año: {año}</strong>
                </div>
                
            </div>
            <div className='pelicula-buttons'>
                <Taquilla cantidad={dinero} />
                <Elenco interpretes={props.children} />
            </div>
        </div>
    );
}

export default Pelicula;
