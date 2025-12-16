import './PersonajeNombre.css';

const PersonajeNombre = (props) => {
    const {nombre} = props;

    return (
        <div className='contenedor-personaje-nombre'>
            {nombre}
        </div>
    );
}

export default PersonajeNombre;