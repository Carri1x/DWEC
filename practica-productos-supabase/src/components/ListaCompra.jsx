import './ListaCompra.css';
import { useState } from "react";
import papelera from '../assets/papelera.png';
import {formatearFechaHoraSupabase} from '../libraries/libreria.js';

const ListaCompra = (props) => {
    const [animar, setAnimar] = useState(false);
    const {id, nombre, created_at} = props.value;

    return (
        <div 
            id={id} 
            className={`container-lista ${animar ? "animacion-clic": ""}`} 
            onClick={() => setAnimar(true)}
            onAnimationEnd={() => setAnimar(false)}
        >
            <div className="lista-nombre">
                <p>{nombre}</p>
                <img src={papelera} alt="Papelera" />
            </div>
            <small>Creada el día: {formatearFechaHoraSupabase(created_at)}</small>
        </div>
    );
};
export default ListaCompra;