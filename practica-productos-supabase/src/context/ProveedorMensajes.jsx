import { createContext, useState } from "react";


const contextoMensajes = createContext();
const ProveedorMensajes = ({children}) => {
    const tiposDeMensaje = {
        ok: "ok",
        info: "info",
        error: "error",
        confirmar: "confirmar"
    }
    const tiempoInicial = 3;

    const [mensaje, setMensaje] = useState('');
    const [mensajeActivo, setMensajeActivo] = useState(false);
    const [tipoMensaje, setTipoMensaje] = useState(tiposDeMensaje.ok);
    const [tiempoActivo, setTiempoActivo] = useState(tiempoInicial);


    const insertarMensaje = (mensaje) => {
        setMensaje(mensaje);
    }

    const quitarMensaje = () => {
        setMensaje('');
        setTipoMensaje(tiposDeMensaje.ok);
        setTiempoActivo(tiempoInicial);
        setMensajeActivo(false);
    }

    const lanzarMensaje = (mensaje, tipo) => {
        if(tipo){
            setTipoMensaje(tipo);
        }
        insertarMensaje(mensaje);
        setMensajeActivo(true);
    }

    const cosasExportar = {
        mensaje,
        mensajeActivo,
        tipoMensaje,
        tiposDeMensaje,
        tiempoActivo,
        lanzarMensaje,
        quitarMensaje,
    }


    return (
        <contextoMensajes.Provider value={cosasExportar}>
            {children}
        </contextoMensajes.Provider>
    )
}
export default ProveedorMensajes;
export {contextoMensajes};