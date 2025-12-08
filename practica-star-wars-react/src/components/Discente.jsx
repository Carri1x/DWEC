import { useRef } from "react";
import { cambiarGeneroEspanya } from "../js/util";
import "./Discente.css"

const Discente = (props) => {
    //genero, altura, peso, color de pelo, color de ojos e imagen.
    const {name, gender, height, mass, hair_color, eye_color} = props.discente;
    const detallesRef = useRef(null);

    const mostrarDetalles = () => {
        //Aqui toggleo la visibilidad de los detalles.
        detallesRef.current.classList.toggle('invisible');
    }

    return (
        <div className="contenedor-discentes" onClick={mostrarDetalles}>
            <h3>{name}</h3>
            <div className="contenedor-detalles invisible" ref={detallesRef}>
                <p>Género: <strong>{cambiarGeneroEspanya(gender)}</strong></p>
                <p>Altura: <strong>{height}cm</strong></p>
                <p>Peso: <strong>{mass}kg</strong></p>
                <p>Color de pelo: <strong>{hair_color}</strong></p>
                <p>Color de ojos: <strong>{eye_color}</strong></p>
            </div>
        </div>
    );
}

export default Discente;