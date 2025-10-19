import React, {useRef} from "react";

const Elenco = (props) => {
    const interpretes = props.interpretes;
    const elencoRef = useRef(null);

    const elencoToggle = () => {
        elencoRef.current.classList.toggle('invisible');
    }

    return (
        <>
            <button onClick={() => {
                elencoToggle();
            }}>Elenco</button>
            <div className="elenco-container" ref={elencoRef}>
                <h5>Intérpretes:</h5>
                {interpretes}
            </div>
        </>
    );
}

export default Elenco;