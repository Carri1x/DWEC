import './PeliculaMiniatura.css';
import { useNavigate } from 'react-router-dom';

const PeliculaMiniatura = (props) => {
    const {titulo, director, cartel, resumen, recaudacion, año} = props;
    let alt = `Foto de la película ${titulo}`;
    let navegar = useNavigate();

  return (
    <>
        <div className='pelicula-container' onClick={() => {
            navegar(`/pelicula/${titulo}`);
        }}>
            <img src={cartel} alt={alt} />
            <h3>{titulo}</h3>
            <p>{año}</p>
        </div>
    </>
  )
}
export default PeliculaMiniatura;
