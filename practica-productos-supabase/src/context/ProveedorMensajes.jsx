import { createContext, useState, useRef } from "react";
import MensajeAceptarCancelar from "../shared/MensajeAceptarCancelar";
import MensajeFlotante from "../shared/MensajeFlotante";


const contextoMensajes = createContext();
const ProveedorMensajes = ({children}) => {
    /**
     * IMPORTANTE:
     * Aquí vamos a manejar todos los mensajes globales de la aplicación, 
     * tanto los mensajes flotantes (MensajeFlotante) como los mensajes de confirmación (MensajeAceptarCancelar).
     * 
     * Para los mensajes flotantes, tenemos la función lanzarMensaje(mensaje, tipo) 
     * que se encarga de mostrar el mensaje flotante con el mensaje y el tipo indicado. 
     * El tipo puede ser "ok", "info", "error" o "confirmar". 
     * El mensaje se mostrará durante un tiempo determinado (por defecto 3 segundos), 
     * que se puede cambiar con la función mensajeTiempoActivo(tiempo).
     */
    const tiposDeMensaje = {
        ok: "ok",
        info: "info",
        error: "error",
        confirmar: "confirmar"
    }
    const tiempoInicial = 3000; //Tiempo en milisegundos que estará activo el mensaje por defecto (3 segundos).

    const [mensaje, setMensaje] = useState(''); //Este es el mensaje que se mostrará en el componente MensajeFlotante, se setea con la función lanzarMensaje.
    const [mensajeActivo, setMensajeActivo] = useState(false); //Este estado controla si el mensaje está activo o no, es decir, si se muestra o no el componente MensajeFlotante. Se setea a true en la función lanzarMensaje y a false en la función quitarMensaje.
    const [tipoMensaje, setTipoMensaje] = useState(tiposDeMensaje.ok); //Este estado controla el tipo de mensaje que se mostrará en el componente MensajeFlotante, se setea con la función lanzarMensaje. Por defecto es "ok", pero puede ser "info", "error" o "confirmar".
    const [tiempoActivo, setTiempoActivo] = useState(tiempoInicial); //Este estado controla el tiempo que estará activo el mensaje, se setea con la función mensajeTiempoActivo. Por defecto es 3000 milisegundos (3 segundos), pero se puede cambiar a cualquier otro tiempo en milisegundos.
    /**
     * IMPORTANTE:
     * Este estado controla el mensaje y la activación del modal de confirmación, que se muestra cuando el usuario tiene que confirmar una acción.
     * - activo: controla si el modal de confirmación está activo o no, es decir, si se muestra o no el componente MensajeAceptarCancelar.
     * - mensaje: es el mensaje que se mostrará en el componente MensajeAceptarCancelar, se setea con la función confirmarAccion. Por ejemplo: "¿Estás seguro de que quieres eliminar este producto?".
     * 
     * El modal de confirmación tiene dos botones, uno para aceptar y otro para cancelar. Cuando el usuario hace click en uno de los botones, se llama a la función manejarRespuesta, que se encarga de cerrar el modal y resolver la promesa que se creó en la función confirmarAccion con el valor true o false dependiendo de si el usuario aceptó o canceló la acción.
     * 
     */
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState({
        activo: false,
        mensaje: ""
    }) 
    // Usamos useRef para guardar la función "resolver" de la promesa.
    // Esto es lo que nos permite "guardar" la espera hasta que el usuario haga click.
    const resolverConfirmacion = useRef(null);
    /**
     * Esta es la función mágica que usaremos en los componentes.
     * 
     * IMPORTANTE:
     * - Devuelve una Promesa que se resuelve a TRUE o FALSE. 
     * - Entonces el código esperará con ASYNC/AWAIT (@async) a el usuario para que de a ACEPTAR o CANCELAR.
     * 
     * En el momento que el usuario pulse uno de los botones, se cerrará el modal y se resolverá la promesa con el valor true o false dependiendo de si el usuario aceptó o canceló la acción.
     * Entonces al hacer "await confirmarAccion('¿Estás seguro de que quieres eliminar este producto?')" 
     * el código se detendrá hasta que el usuario pulse uno de los botones, 
     * y luego continuará con el valor true o false dependiendo de la respuesta del usuario.
     */
    const confirmarAccion = (mensajeTexto) => {
        setMensajeConfirmacion({
            activo: true,
            mensaje: mensajeTexto
        });

        return new Promise((resolver) => {
            // Guardamos la función 'resolver' en la referencia para llamarla luego.
            resolverConfirmacion.current = resolver;
        });
    };
    /**
     * Función interna que llaman los botones del modal.
     * 
     * IMPORTANTE:
     * - Esta función se encarga de cerrar el modal de confirmación y resolver la promesa que se creó en la función confirmarAccion con el valor true o false dependiendo de si el usuario aceptó o canceló la acción.
     * - El botón de aceptar llamará a esta función con el valor true, y el botón de cancelar con el valor false.
     * - Al resolver la promesa, el código que estaba esperando con "await confirmarAccion(...)" continuará su ejecución con el valor true o false dependiendo de la respuesta del usuario.
     * 
     * @param {Boolean} respuesta El valor que se usará para resolver la promesa, true si el usuario aceptó la acción, false si el usuario canceló la acción.
     */
    const manejarRespuesta = (respuesta) => {
        // 1. Cerramos el modal
        setMensajeConfirmacion({ ...mensajeConfirmacion, activo: false });
        
        // 2. Si existe una promesa pendiente, la resolvemos con true o false.
        // Este resolverConfirmación es la referencia a la función "resolver" de la promesa que se creó en confirmarAccion, y que se guardó en esta referencia para poder llamarla luego.
        if (resolverConfirmacion.current) {
            resolverConfirmacion.current(respuesta);
            resolverConfirmacion.current = null; // Limpiamos.
        }
    };

    /**
     * Función que se encarga de quitar el mensaje flotante, reseteando los estados relacionados con el mensaje.
     * 
     * IMPORTANTE:
     * - Setea el mensaje a vacío .
     * - El tipo de mensaje a "ok" (por defecto).
     * - El tiempo activo al tiempo inicial (3 segundos).
     * - El mensajeActivo a false para ocultar el mensaje flotante.
     */
    const quitarMensaje = () => {
        setMensaje('');
        setTipoMensaje(tiposDeMensaje.ok);
        setTiempoActivo(tiempoInicial);
        setMensajeActivo(false);
    }

    /**
     * Función que se encarga de lanzar un mensaje flotante, recibiendo el mensaje y el tipo de mensaje como parámetros.
     * IMPORTANTE:
     * - El mensaje se mostrará durante un tiempo determinado (por defecto 3 segundos), que se puede cambiar con la función mensajeTiempoActivo(tiempo).
     * - El tipo de mensaje puede ser "ok", "info", "error" o "confirmar". Si no se especifica, por defecto será "ok".
     * - Si el tipo de mensaje es "error" y el tiempo activo es el tiempo inicial (3 segundos), se cambiará el tiempo a 5 segundos para que la persona pueda leer el error más tranquila.
     * 
     * @param {String} mensaje 
     * @param {String, tipoDeMensaje} tipo El tipo de mensaje que se quiere mostrar, puede ser "ok", "info", "error" o "confirmar". Si no se especifica, por defecto será "ok".
     */
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
    
    /**
     * Función que se encarga de cambiar el tiempo que estará activo el mensaje. 
     * Si el nuevo tiempo no es un número o es menor que 0, se resetea al tiempo inicial (3 segundos/3000 milisegundos).
     * 
     * @param {Number} nuevoTiempo 
     */
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
            {/*Manejo los mensajes globales desde aquí... 
                Desde aquí controlo si se muestra el mensaje flotante o el mensaje de confirmación, 
                dependiendo de los estados que se han definido para cada uno.

                Este caso es bueno porque si quiero mostrar un mensaje desde cualquier parte de la aplicación, 
                no tengo que preocuparme por el lugar donde se muestra, se que directamente tengo que venir a este proveedor de mensajes 
                y editar el mensajeFlotante o el mensajeConfirmación, y el proveedor se encargará de mostrarlo en la pantalla.
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