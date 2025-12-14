import './PeliculaNombre.css'

const PeliculaNombre = (props) => {
    const {title, idPelicula} = props;
    return (
        <div id={idPelicula} className='contenedor-pelicula-nombre'>
            {title}
        </div>
    );
}

export default PeliculaNombre;