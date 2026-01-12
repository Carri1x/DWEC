import './Disco.css';

const Disco = (props) => {
    const {id, nombre, caratula, grupoInterprete, año, genero, localizacion, prestado} = props.disco;
    /**
     * ¿Por qué estoy usando dataset? Me parece más limpio. Puedo manejarlo fácilmente a la hora de usarlo en la delegación de eventos.
     *  
     */
    return(
        <div className='container-disco'>
            <h3>{nombre}</h3>
            {caratula && (<img src={caratula} alt={`Caratula del disco ${nombre}`} />)}
            <p>{grupoInterprete}</p>
            {genero && <strong>{genero}</strong>}
            {localizacion && <p>{localizacion}</p>}
            {prestado && <strong>{prestado}</strong>}
            {año && <small>{año}</small>}
            <div>
                <button className='borrar-disco' data-id={id} >Borrar Disco</button>
                <button className='editar-disco' data-id={id} >Editar Disco</button>
            </div>
        </div>
    );
}

export default Disco;