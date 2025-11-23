import './Disco.css';

const Disco = (props) => {
    const {nombre, caratula, grupoInterprete, año, genero, localizacion, prestado} = props.disco;
    return(
        <div className='container-disco'>
            <h3>{nombre}</h3>
            {caratula && (<img src={caratula} alt={`Caratula del disco ${nombre}`} />)}
            <p>{grupoInterprete}</p>
            {genero && <strong>{genero}</strong>}
            {localizacion && <p>{localizacion}</p>}
            {prestado && <strong>{prestado}</strong>}
            {año && <small>{año}</small>}
            <button className='boton-borrar-disco'>Borrar Disco</button>
        </div>
    );
}

export default Disco;