import './ListaCompraMiniatura.css';
import { useState } from "react";
import papelera from '../assets/papelera.png';
import {formatearFechaHoraSupabase} from '../libraries/libreria.js';
import useContextoSesion from '../hooks/useContextoSesion.js';

const ListaCompraMiniatura = (props) => {
    const {esAdmin} = useContextoSesion()
    //He querido hacer una animación en css, en cambio tanto probar me he dado cuenta que la mejor opción es hacer un estado de animación.
    const [animar, setAnimar] = useState(false);
    const {id, nombre, created_at} = props.value;

    return (
        <div 
            id={id} 
            className={`container-lista ${animar ? "animacion-clic": ""}`} 
            onClick={() => setAnimar(true)}
            //En cuanto haya acabado la animación se ejecutará que se ha acabado la animación y el estado animación será falso. Por lo tanto la clase animacion-clic se quitará.
            onAnimationEnd={() => setAnimar(false)}
        >
            <div className="lista-nombre">
                <p>{nombre}</p>
                { //Si no es admin podrá eliminar la lista de la compra.
                    !esAdmin && <img src={papelera} className='papelera' alt="Papelera" />
                }
            </div>
            <small>Creada el día: {formatearFechaHoraSupabase(created_at)}</small>
        </div>
    );
};
export default ListaCompraMiniatura;