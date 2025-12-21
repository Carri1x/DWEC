import './ListaPersonajes.css';
import { useContext } from "react";
import { contextoPersonajes } from "../context/ProveedorPersonajes.jsx";
import PersonajeNombre from "./PersonajeNombre.jsx";


const ListaPersonajes = () => {

    const {personajesCntxt ,cambiarPersonajeSeleccionado} = useContext(contextoPersonajes);


    return (
        <div className="contenedor-lista-personajes" onClick={(evento) => {
            const nombrePersonaje = evento.target.innerText;
            cambiarPersonajeSeleccionado(nombrePersonaje);
        }}>
            <h2>Listado personajes</h2>
            {
                personajesCntxt ?
                    personajesCntxt.map((personaje, i, a) => {
                        return <PersonajeNombre key={i} nombre={personaje.name}/>
                    }) 
                    : <p>No se han encontrado personajes de esta película.</p> 
            }
        </div>
    );
}

export default ListaPersonajes;