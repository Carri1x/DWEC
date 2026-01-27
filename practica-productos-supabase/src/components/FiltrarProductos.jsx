import { useState, useRef } from "react";
import useContextoProductos from "../hooks/useContextoProductos.js";

const FiltrarProductos = () => {

    const { filtrarProductos, borrarFiltroProductos } = useContextoProductos();
    const [filtro, setFiltro] = useState('');
    const [opcionFiltrado, setOpcionFiltrado] = useState('');
    const refFiltro = useRef();
    const refSelect = useRef();

    const cambiarEstado = (evento) => {
        const { name, value } = evento.target;
        if (name === 'opcion-filtro') {
            setOpcionFiltrado(value);
        } else {
            setFiltro(value);
        }
    }

    /**
     * Borramos todos los rastros de filtro que hayan quedado.
     * Tanto el en contexto/proovedor como en el estado de filtro que manejamos aquí.
     */
    const borrarFiltro = () => {
        borrarFiltroProductos();
        setFiltro('')
        refFiltro.current.value = '';
    }


    return (
        <>
            <h3>Filtrar por:</h3>
            <select name="opcion-filtro" ref={refSelect} onChange={(evento) => {
                cambiarEstado(evento);
            }}>
                <option value="nombre">Nombre</option>
                <option value="peso">Peso</option>
                <option value="precio">Precio</option>
            </select>

            <input type="text" placeholder='Escriba para filtrar...'
                ref={refFiltro}
                onChange={(evento) => {
                    cambiarEstado(evento)
                }} />
            {/*Botones del control de filtrado... */}
            <button onClick={() => { filtrarProductos(filtro, opcionFiltrado) }}>Filtrar</button>
            {filtro.length > 0 && (<button onClick={() => { borrarFiltro() }}>Borrar Filtro</button>)}


        </>
    )
}

export default FiltrarProductos;