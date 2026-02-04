import { createContext, useState } from "react";
import MensajeAceptarCancelar from "../shared/MensajeAceptarCancelar";
import MensajeFlotante from "../shared/MensajeFlotante";


const contextoMensajes = createContext();
const ProveedorMensajes = ({children}) => {
    const tiposDeMensaje = {
        ok: "ok",
        info: "info",
        error: "error",
        confirmar: "confirmar"
    }
    const tiempoInicial = 3000; //Tiempo en milisegundos que estará activo el mensaje por defecto (3 segundos).

    const [mensaje, setMensaje] = useState('');
    const [mensajeActivo, setMensajeActivo] = useState(false);
    const [tipoMensaje, setTipoMensaje] = useState(tiposDeMensaje.ok);
    const [tiempoActivo, setTiempoActivo] = useState(tiempoInicial);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState({
        activo: false,
        mensaje: ""
    })
    // Usamos useRef para guardar la función "resolver" de la promesa.
    // Esto es lo que nos permite "guardar" la espera hasta que el usuario haga click.
    const resolverConfirmacion = useRef(null);
    /**
     * Esta es la función mágica que usaremos en los componentes.
     * Devuelve una Promesa que se resuelve a TRUE o FALSE. Entonces el código esperará con ASYNC/AWAIT a el usuario para que de a ACEPTAR o CANCELAR.
     */
    const confirmarAccion = (mensajeTexto) => {
        setMensajeConfirmacion({
            activo: true,
            mensaje: mensajeTexto
        });

        return new Promise((resolver) => {
            // Guardamos la función 'resolve' en la referencia para llamarla luego
            resolverConfirmacion.current = resolver;
        });
    };
    /**
     * Función interna que llaman los botones del modal
     */
    const manejarRespuesta = (respuesta) => {
        // 1. Cerramos el modal
        setMensajeConfirmacion({ ...mensajeConfirmacion, activo: false });
        
        // 2. Si existe una promesa pendiente, la resolvemos con true o false
        if (resolverConfirmacion.current) {
            resolverConfirmacion.current(respuesta);
            resolverConfirmacion.current = null; // Limpiamos
        }
    };

    const quitarMensaje = () => {
        setMensaje('');
        setTipoMensaje(tiposDeMensaje.ok);
        setTiempoActivo(tiempoInicial);
        setMensajeActivo(false);
    }

    const lanzarMensaje = (mensaje, tipo) => {
        if(tipo){
            setTipoMensaje(tipo);
            //Si el mesnaje es tipo error y tiene el tiempo inicial cambiamos el tiempo a 5s para que la persona pueda leer el error más tranquila.
            if(tipo === 'error' && tiempoActivo === 3000){
                mensajeTiempoActivo(5000);
            }
        }
        setMensaje(mensaje);
        setMensajeActivo(true);
    }
    
    const mensajeTiempoActivo = (nuevoTiempo) => {
        if(isNaN(nuevoTiempo) || nuevoTiempo < 0) {
            //Si el tiempo no es un número o es menor que 0, se resetea al tiempo inicial.
            //Un caso sería si no se quiere insertar el tipo de tiempo, se supone que se inserta undefined = 3s.
            nuevoTiempo = tiempoInicial; 
        }
        setTiempoActivo(nuevoTiempo);
    }

    const cosasExportar = {
        mensaje,
        mensajeActivo,
        tipoMensaje,
        tiposDeMensaje,
        tiempoActivo,
        lanzarMensaje,
        quitarMensaje,
        mensajeTiempoActivo,
        confirmarAccion,
    }


    return (
        <contextoMensajes.Provider value={cosasExportar}>
            {children}
            {/*Me ha sugerido la IA que maneje los mensajes globales desde aquí... 
            La verdad me parece bastante bien porque si solo tienes que centrarte en insertar el mensaje, no también en añadir el componente <Mensaje /> que va a manejar esos mensajes.
            Tenía un monton de estados y funciones para exportar y manejar. Con la idea que me ha dado he reducido la cantidad de cosas exportadas y solo hay que insertar el mensaje en confirmarAccion(mensaje) y lanzarMensajeFlotante(mensaje)
            */}
            { mensajeActivo && <MensajeFlotante /> }
            { mensajeConfirmacion.activo && 
                <MensajeAceptarCancelar mensaje={mensajeConfirmacion.mensaje} 
                    botonIzq={() => {manejarRespuesta(true)}} 
                    botonDer={() => {manejarRespuesta(false)}}/> 
            }

        </contextoMensajes.Provider>
    )
}
export default ProveedorMensajes;
export {contextoMensajes};