import React from "react";
import Discente from "./Discente";
import './Matricula.css'

const Matricula = (props) => {
    const discentes = props.alumnos.discentes;
    return (
            <div className="matricula-container">    
                {
                    discentes.map((discente, i, a) => {
                        return <Discente
                            key={discente.id}
                            alumno = {discente}
                        >
                        </Discente>;
                    })
                }
            </div>
    );
}

export default Matricula;