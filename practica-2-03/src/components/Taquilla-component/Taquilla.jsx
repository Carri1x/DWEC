import React, {useRef} from "react";
import { cambiarFormatoEspanya } from "../../librerias/util.js";
import './Taquilla.css';

const Taquilla = (props) => {
    const cantidad = props.cantidad;
    const dineroFormateado = cambiarFormatoEspanya(cantidad);
    const taquillaRef = useRef(null);

    const taquillaToggle = () => {
        taquillaRef.current.classList.toggle('invisible');
    }

    return (
        <>
            <div id='taquilla-container'>
                <button id='boton-taquilla' onClick={()=>{
                    taquillaToggle();
                }}>Taquilla</button>

                <div id='dinero-taquilla' ref={taquillaRef}>{dineroFormateado} €</div>
            </div>
        </>
    );
}

export default Taquilla;