import './Pelicula.css';
import { useNavigate } from 'react-router-dom';

const Pelicula = (props) => {
    const {title, director,  movieListing, summary, dinero, fechaCreacion} = props;
    let alt = `Foto de la película ${title}`;
    let navegar = useNavigate();

  return (
    <>
        <div className='pelicula-container' onClick={() => {
            navegar(`/pelicula/${title}`);
        }}>
            <img src={movieListing} alt={alt} />
            <h3>{title}</h3>
            <p>{fechaCreacion}</p>
        </div>
    </>
  )
}
export default Pelicula;
