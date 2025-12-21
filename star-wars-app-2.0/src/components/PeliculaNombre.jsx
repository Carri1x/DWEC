import './PeliculaNombre.css'

const PeliculaNombre = (props) => {
    const {title, idPelicula, peliculaSeleccionada} = props;
    return (
        <div id={idPelicula} className={`contenedor-pelicula-nombre ${idPelicula == peliculaSeleccionada ? 'activa' : ''}`}>
            {title}
        </div>
    );
}

export default PeliculaNombre;