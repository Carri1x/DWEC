import React from "react";
import './Discente.css';

const Discente = (props) => {
    const {id, nombre, apellidos, curso, aficiones, comida} = props.alumno;
    const funcionDesmatricular = props.funcionDesmatricular;
    return (  
            <div className="discente-container">
                <h3>{apellidos}, {nombre}</h3>
                <h4>Curso: {curso}</h4>
                <p>Id: {id}</p>
                <p>Aficiones: </p>
                <ul>
                    {
                        aficiones.map((aficion, i, a) => {
                            return <li key={i}>{aficion}</li>;
                        })
                    }
                </ul>
                <p>Comida favorita: {comida}</p>
                <button onClick={() => {
                    funcionDesmatricular(id);
                }}>Desmatricular</button>
            </div>    
    );
}

export default Discente;