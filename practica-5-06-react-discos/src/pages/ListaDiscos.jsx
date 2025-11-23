import { useEffect, useState } from "react";
import { getAllDiscos } from "../libraries/forms.js";
import Disco from '../components/Disco.jsx';

const ListaDiscos = () => {

    const [discos, setDiscos] = useState();

    const borrarDisco = (evento) => {
        //En caso de que no sea un botón es porque no ha presionado el botón de borrar disco. Salimos de la función.
        if(evento.target.tagName !== 'BUTTON') return;
        console.log(evento.target.parentElement)
    }
 
    useEffect(()=>{
        const discoss = getAllDiscos();
        console.log("se está ejecutando"+ discoss)
        setDiscos(getAllDiscos());
    },[]);

    return(
        <div className="container-lista-discos">
            <h1>Lista de discos</h1>
            <div className="container-discos" onClick={borrarDisco}>
                {
                    discos ? 
                        (discos.map(disco => <Disco key={disco.uuid} disco={disco}/>)) : 
                        (<div>No hay discos guardados por ahora.</div>)   
                }
            </div>
        </div>
    );
}

export default ListaDiscos;