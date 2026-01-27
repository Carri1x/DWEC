import { useState, useRef } from "react";
import useContextoProductos from "../hooks/useContextoProductos.js";
import "./Controles.css";

const FiltrarProductos = () => {
    const { filtrarProductos, borrarFiltroProductos } = useContextoProductos();
    const [filtro, setFiltro] = useState('');
    const [opcionFiltrado, setOpcionFiltrado] = useState('nombre');
    const refFiltro = useRef();

    const cambiarEstado = (evento) => {
        const { name, value } = evento.target;
        if (name === 'opcion-filtro') {
            setOpcionFiltrado(value);
        } else {
            setFiltro(value);
        }
    }

    const borrarFiltro = () => {
        borrarFiltroProductos();
        setFiltro('');
        refFiltro.current.value = '';
    }

    /**
     * Yo le pido el css a la IA y ahora me esta encapsulando todo lo que yo hago con algunos divs etc y me hace algunas mejoras si son necesarias
     * Si veo que no me gustan le dan por el cu... entonces me ha gustado la de cambiar estado, no ponerle el callback (evento) => {funcion(evento)}si no... dejarlo así y no me parece mal. Lo veo más limpio. 
     * 
     * Lo de style={{flex: 1}} se lo ha sacado de la chistera pero me flipa lo que hace... parece que no pero algunas cositas están guay...
     * en <OrdenarProductos me ha hehco lo mismo y me ha tocado cosas de código y lo he dejado como me lo ha dado... Simplemente me lo ha dejado más limpio y está bien.
     */

    return (
        <div className="control-group">
            <h3>Filtrar por</h3>
            <div className="flex-row">
                <select name="opcion-filtro" className="input-custom" style={{width: 'auto'}} onChange={cambiarEstado}>
                    <option value="nombre">Nombre</option>
                    <option value="peso">Peso</option>
                    <option value="precio">Precio</option>
                </select>

                <input 
                    type="text" 
                    className="input-custom" 
                    placeholder='Escriba para filtrar...'
                    ref={refFiltro}
                    style={{flex: 1}}
                    onChange={cambiarEstado} 
                />
                
                <button className="btn-primary" onClick={() => filtrarProductos(filtro, opcionFiltrado)}>
                    Filtrar
                </button>

                {filtro.length > 0 && (
                    <button className="btn-primary btn-secondary" onClick={borrarFiltro}>
                        Limpiar
                    </button>
                )}
            </div>
        </div>
    )
}

export default FiltrarProductos;