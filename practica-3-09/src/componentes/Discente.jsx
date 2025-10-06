import React from "react";
import './Discente.css';

const Discente = (props) => {
    const {id, nombre, apellidos, curso, aficiones, comida} = props.alumno;
    return (  
            <div className="discente-container">
                <h3>{apellidos}, {nombre}</h3>
                <h4>Curso: {curso}</h4>
                <p>Aficiones: </p>
                <ul>
                    {
                        aficiones.map((aficion, i, a) => {
                            return <li key={i}>{aficion}</li>;
                        })
                    }
                </ul>
                <p>Comida favorita: {comida}</p>
            </div>    
    );
}

export default Discente;