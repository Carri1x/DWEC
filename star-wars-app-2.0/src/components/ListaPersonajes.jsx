import { useContext } from "react";
import { contextoPersonajes } from "../context/ProveedorPersonajes.jsx";
import PersonajeNombre from "./PersonajeNombre.jsx";


const ListaPersonajes = () => {

    const {personajes} = useContext(contextoPersonajes);

    console.log(personajes)

    return (
        <div className="contenedor-lista-personajes">
            <h2>Listado personajes</h2>
            {
                personajes > 0 ?
                    personajes.map((personaje, i, a) => {
                        return <PersonajeNombre key={i} nombre={personaje.name}/>
                    }) 
                    : <p>No se han encontrado personajes de esta película.</p> 
            }
        </div>
    );
}

export default ListaPersonajes;