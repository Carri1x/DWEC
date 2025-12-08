import './Cargando.css';

const Cargando = (props) => {
    const {contexto} = props;

    return (
        <div className="contenedor-cargando">
            <img src="./assets/cargando.gif" alt="Cargando" />
            <p>Cargando {contexto}</p>
        </div>
    );
}

export default Cargando;