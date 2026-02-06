import { useState } from 'react';

const ListaCompra = (props) => {
    const {id, nombre, created_at} = props.value;

    return (
        <div 
            id={id} 
            className={`container-lista ${animar ? 'animacion-clic' : ''}`} 
            /* Cuando la animación termina, reseteamos el estado para poder repetirla */
            onAnimationEnd={() => setAnimar(false)}
        >
            <div className="lista-nombre">
                <p>{nombre}</p>
                <img src={papelera} alt="Papelera" />
            </div>
            <small>Creada el día: {formatearFechaHoraSupabase(created_at)}</small>
        </div>
    );
};
export default ListaCompra;