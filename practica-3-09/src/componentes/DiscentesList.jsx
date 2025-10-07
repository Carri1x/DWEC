import React from "react";
import Discente from './Discente';
import './DiscentesList.css';

const DiscentesList = (props) => {
    const discentes = props.discentes;
    const funDesmatricular = props.funcionDesmatricular;
    return (
        <>
            <div className="discentes-list-container">
                {
                    discentes.map((discente, i, a) => {
                        return <Discente
                            key={discente.id}
                            alumno={discente}
                            funcionDesmatricular = {funDesmatricular}
                        >
                        </Discente>;
                    })
                }
            </div>
        </>
    );
}

export default DiscentesList;