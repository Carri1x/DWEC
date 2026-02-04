import './MensajeAceptarCancelar.css';
import useContextoMensajes from '../hooks/useContextoMensajes.js';

const MensajeAceptarCancelar = (props) => {
    const {
        mensaje,
        lanzarMensaje,
        quitarMensaje,

    } = useContextoMensajes();
    const { mensajeProps, botonIzq, botonDer } = props;

    return (
        <div className="overlay-confirmacion">
            <div className="contenedor-mensaje-aceptar-cancelar">
                <p className="mensaje-texto">{mensaje}</p>
                <div className="contenedor-botones-mensaje">
                    <button className="btn-confirmar" onClick={() => {
                        botonIzq();

                    }}>Aceptar</button>
                    <button className="btn-cancelar" onClick={() => {
                        quitarMensaje();
                    }}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default MensajeAceptarCancelar;