import './Pelicula.css';
import Discente from './Discente.jsx';
import { useEffect, useRef, useState } from 'react';
import {cambiarFechaFormatoEspanya} from '../js/util.js'
import { fetchDiscentes } from '../js/peticionesPeliculas.js';

const Pelicula = (props) => {
    const {title, opening_crawl, director, release_date, characters} = props.pelicula;
    /*Si voy a hacer un on click en cada película para enseñar los detalles de cada película 
        Se que no es la mejor opción pero delegando este evento en películas tendría que hacerlo con un forwardRef,
        son cosas que no hemos visto y aún no entiendo bien, sería copiar código por copiar. 
        Si en algún momento lo vemos en clase o me dices que lo estudie y lo implemente, lo haré encantado.
    */
    const detallesRef = useRef(null);
    const [discentes, setDiscentes] = useState([]);

    const mostrarDetalles = (evento) => {
        if(evento.target.classList.contains('contenedor-pelicula') || evento.target.classList.contains('titulo-pelicula')){
            //Aqui toggleo la visibilidad de los detalles de la pelicula.
            detallesRef.current.classList.toggle('invisible');
        }
    }
    
    const traerDiscentes = async () => {
        const discentesDB = await fetchDiscentes(characters);
        setDiscentes(discentesDB);
    }

    useEffect(() => {
        traerDiscentes();
    },[]);

    return (
        <div className='contenedor-pelicula' onClick={mostrarDetalles}>
            <h2 className='titulo-pelicula'>{title}</h2>
            <div className='detalles-pelicula invisible' ref={detallesRef}>
                <h3>Sinapsis: </h3>
                <p>{opening_crawl}</p>
                <h3>Director: <strong>{director}</strong></h3>
                <small>Fecha de lanzamiento: <strong>{cambiarFechaFormatoEspanya(release_date)}</strong></small>
                <h3>Discentes: </h3>
                {
                    discentes.length > 0 ? discentes.map((discente, index, array) => {
                        return <Discente key={index} discente={discente}/>
                    }): <p>Lo siento no se han encontrado los discentes</p>
                }
            </div>
        </div>
    );
}

export default Pelicula;