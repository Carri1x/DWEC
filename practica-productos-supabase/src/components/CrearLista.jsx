import "./CrearLista.css";
import { useState, useRef } from "react";
import imagenMas from "../assets/mas.png";
import useContextoListaCompra from "../hooks/useContextoListaCompra";

const CrearLista = () => {
  const sectionRef = useRef(null);
  const [nombreLista, setNombreLista] = useState('');

  const {
    crearListaCompra
  } = useContextoListaCompra();
  
  /**
   * Enseñamos la sección , un input para el nombre y un botón de añadir, para crear lista y así que ocupe en este caso, menos espacio.
   */
  const enseñarOcultarSection = () => {
    sectionRef.current.classList.toggle('ocultar')
  }

  /**
   * Cambiamos el valor del nombre de la lista por cada letra que pulse el usuario.
   * 
   * @param {Event} evento 
   */
  const cambiarEstado = (evento) => {
    const {value} = evento.target;
    setNombreLista(value);
  }

  return (
    <div className="funcion-crear-lista" onClick={(evento) => {
      if(evento.target.tagName === 'H4'){
        enseñarOcultarSection();
      }
      if(evento.target.tagName === 'BUTTON'){
        //CREAMOS LA LISTA!!
        if(nombreLista) {
          crearListaCompra(nombreLista);
        } else {
          crearListaCompra();
        }
      }
    }}>
      <h4>Crear nueva lista</h4>
      <section ref={sectionRef}>
        <input
          type="text"
          name="nueva-lista"
          placeholder="Nombre de tu nueva lista"
          onChange={cambiarEstado}
        />
        <button>
          <img src={imagenMas} alt="Icono de añadir" />
        </button>
      </section>
    </div>
  );
};
export default CrearLista;
