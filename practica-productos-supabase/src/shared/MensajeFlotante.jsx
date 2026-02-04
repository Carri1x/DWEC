import { useState, useEffect } from "react";
import './MensajeFlotante.css';
import useContextoMensajes from "../hooks/useContextoMensajes";

const MensajeFlotante = () => {
    const {
        mensaje,
        tiempoActivo,
        tipoMensaje,
        quitarMensaje,
    } = useContextoMensajes();
    const [progreso, setProgreso] = useState(tiempoActivo);
    // Hacemos un intervalo para la barra progreso.
    // Se empieza a hacer cuando el componente se monta.
    useEffect(() => {
        const intervalo = setInterval(() => {
            setProgreso( num => {
                if(num <= 0){
                    clearInterval(intervalo);
                        /*
                            ¿Por qué hago esto? = setTimeout de la funcion que paso por props 
                            Cuando el componente llega al final o se desmonta, intenta ejecutar funcion().
                            React dice: "¡Espera! Todavía estoy renderizando este componente, 
                            no me pidas que cambie el estado de otro ahora mismo".
                            La Solución: setTimeout(..., 0) le dice al navegador: "Espera a que React termine lo que está haciendo (renderizar) y,
                            en cuanto tengas un hueco libre (milisegundos después), ejecuta esta función".
                        */
                        setTimeout(()=>{
                            quitarMensaje();
                        },10);
                    return 0;
                }
                return num - 10;
            });
        },10);

        /*
        Esto ha sido idea de la IA me ha dicho que elimine el intervalo para cuando se haya desmontado
            el componente así evitaré que se esté ejecutando de forma innecesaria cuando el componente está.
        Es un seguro de "vida" para el navegador jejeje. 
        */
        return () => clearInterval(intervalo);
    },[])
    return(
        <>
            <div className={`mensaje-flotante tipo-${tipoMensaje}`}>
                {mensaje}
                <progress min={0} max={tiempoActivo} value={progreso}></progress>
            </div>
        </>
    );
}

export default MensajeFlotante;