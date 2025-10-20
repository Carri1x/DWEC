import React, {useRef} from "react";

const Elenco = (props) => {
    //Obtengo los intérpretes pasados como props
    const interpretes = props.interpretes;
    const elencoRef = useRef(null); //Referencia al contenedor del elenco.

    //Función para mostrar/ocultar el elenco.
    const elencoToggle = () => {
        elencoRef.current.classList.toggle('invisible');
    }

    return (
        <>
            <button className="bttn" onClick={() => {
                elencoToggle(); //Muestro/oculto el elenco.
            }}>Elenco</button>
            <div className="elenco-container invisible" ref={elencoRef}>
                <h5>Intérpretes:</h5>
                {interpretes}
            </div>
        </>
    );
}

export default Elenco;