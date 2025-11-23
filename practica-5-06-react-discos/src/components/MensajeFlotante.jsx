import { useState, useEffect } from "react";
import './MensajeFlotante.css';

const MensajeFlotante = (props) => {
    const {mensaje, estado} = props;
    const maxProgreso = 3000;
    const [progreso, setProgreso] = useState(maxProgreso);

    console.log('El estado de mensaje flotante: '+estado)
    // Hacemos un intervalo para la barra progreso.
    // Se empieza a hacer cuando el componente se monta.
    useEffect(() => {
        const intervalo = setInterval(() => {
            /*
            Aquí me estaba funcionando mal porque usaba progreso (en vez de NUM) y cada vez me lo reseteaba a 3000 o no hacía bien el cálculo de la resta,
                era algo parecido a lo asíncrono, hacía la operación cuando le daba la gana.
            Lo que he descubierto es que si pasas por parámetro una variable coge el valor del estado (progreso en este caso).
            Permíte de esta forma operar bien y que hagas la operación que necesites controladamente. 
            */
            setProgreso( num => {
                if(num <= 0){
                    clearInterval(intervalo);
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
            <div className={`mensaje-flotante ${estado}`}>
                {mensaje}
                <progress min={0} max={maxProgreso} value={progreso}></progress>
            </div>
        </>
    );
}

export default MensajeFlotante;