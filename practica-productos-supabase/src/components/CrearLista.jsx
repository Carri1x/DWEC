import "./CrearLista.css";
import { useState, useRef } from "react";
import imagenMas from "../assets/mas.png";
import flechaBlanca from "../assets/flecha-blanca.png";
import useContextoListaCompra from "../hooks/useContextoListaCompra";

const CrearLista = () => {
  const {
    crearListaCompra
  } = useContextoListaCompra();

  const [nombreLista, setNombreLista] = useState('');
  const [estaAbierto, setEstaAbierto] = useState(false);
  const formRef = useRef();

  const enseñarOcultarSection = () => {
    setEstaAbierto(!estaAbierto);
  }

  /**
   * Cambiamos el valor del nombre de la lista por cada letra que pulse el usuario.
   * 
   * @param {Event} evento 
   */
  const cambiarEstado = (evento) => {
    const { value } = evento.target;
    setNombreLista(value);
  }

  return (
    <div className="funcion-crear-lista" onClick={(evento) => {
      evento.preventDefault();
      if (evento.target.closest('.enunciado-crear-lista')) {
        enseñarOcultarSection();
      }
      if (evento.target.id === 'crear-lista') {
        if (nombreLista) {
          crearListaCompra(nombreLista);
        } else {
          crearListaCompra();
        }
        formRef.current.reset();
        setEstaAbierto(false);
      }
    }}>
      <div className="enunciado-crear-lista" >
        <h4>Crear nueva lista</h4>
        <img src={flechaBlanca} className={estaAbierto ? 'rotacion-noventa' : ''} alt="flecha blanca" />
      </div>
      {estaAbierto &&
        <form ref={formRef}>
          <input
            type="text"
            name="nueva-lista"
            placeholder="Nombre de tu nueva lista"
            onChange={cambiarEstado}
          />
          <img id="crear-lista" src={imagenMas} alt="Icono de añadir" />
        </form>
      }
    </div>
  );
};
export default CrearLista;
