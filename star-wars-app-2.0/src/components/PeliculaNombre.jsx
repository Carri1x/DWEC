import './PeliculaNombre.css'

const PeliculaNombre = (props) => {
    const {title} = props;
    return (
        <div id={title} className='contenedor-pelicula-nombre'>
            {title}
        </div>
    );
}

export default PeliculaNombre;