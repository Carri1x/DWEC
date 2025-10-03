import React, { useState } from "react";

const ContadorLimite = () => {
    const iniciador = 0;
    let [contador, setContador] = useState(iniciador);
    //Creo una variable Vegeta para cambiar los estados de los botones.
    const [prohibidoIncrementar, setProhibidoIncrementar] = useState(false);
    const [prohibidoDecrementar, setProhibidoDecrementar] = useState(true);

    /**
     * Función para incrementar el contador.
     */
    const incrementar = () => {
        //Si no está prohibido incrementar entrará dentro del if.
        if(!prohibidoIncrementar){
            contador += 1;
            setContador(contador);
        }
        //Dependiendo del valor del contador asignaremos un estado al boton incrementar.
        actualizarPermisos();
    }
    
    /**
     * Función para decrementar el contador.
     */
    const decrementar = () => {
        //Si no está prohibido decrementar entrará dentro del if.
        if(!prohibidoDecrementar){
            contador -= 1;
            setContador(contador);
        }
        //Dependiendo del valor del contador asignaremos un estado al boton decrementar.
        actualizarPermisos();
    }

    //Función para actualizar los permisos de ambos botones.
    const actualizarPermisos = () => {
        //Si el contador es diez o mayor denegaremos el permiso del botón incrementar.
        if(contador > 9){
            setProhibidoIncrementar(true);
        }
        //Si el cero o menor que nueve admitiremos incremento.
        if(contador >= 0 && contador < 9){
            setProhibidoIncrementar(false);
        }
        //Si el contador es mayor que cero o igual que diez admitiremos incrementar.
        if (contador > 0 && contador <= 10){
            setProhibidoDecrementar(false);
        }
        //Si el contador es menor que uno denegaremos decrementar.
        if(contador < 1){
            setProhibidoDecrementar(true);
        }
    }


    return (
        <>
            <h2>Contador: {contador}</h2>

            <button onClick={() => {
                incrementar()
            }}
            disabled={prohibidoIncrementar}
            >
                Incrementar
            </button>
            
            <button onClick={() => {
                decrementar()
            }}
            disabled={prohibidoDecrementar}
            >
                Decrementar
            </button>
        </>
    );
}

export default ContadorLimite;