import React, {useRef} from "react";
import { cambiarFormatoEspanya } from "../../librerias/util.js";
import './Taquilla.css';

const Taquilla = (props) => {
    const cantidad = props.cantidad; //Obtengo la cantidad de dinero pasada como prop
    const dineroFormateado = cambiarFormatoEspanya(cantidad); //Formateo el dinero al formato español.
    const taquillaRef = useRef(null); //Referencia al contenedor de la taquilla.

    //Función para mostrar/ocultar la taquilla.
    const taquillaToggle = () => {
        taquillaRef.current.classList.toggle('invisible');
    }

    return (
        <>
            <div id='taquilla-container'>
                <button className="bttn" onClick={()=>{
                    taquillaToggle(); //Muestro/oculto la taquilla.
                }}>Taquilla</button>

                <div className='dinero-taquilla invisible' ref={taquillaRef}>{dineroFormateado} €</div>
            </div>
        </>
    );
}

export default Taquilla;