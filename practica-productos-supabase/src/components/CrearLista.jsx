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

  /**
   * Función que se encarga de mostrar u ocultar la sección de creación de lista, 
   * dependiendo de su estado actual.
   * 
   * Si la sección está abierta, se cerrará. Si está cerrada, se abrirá.
   */
  const enseñarOcultarSeccion = () => {
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
      // Si el usuario hace click en cualquier parte de la sección de creación de lista, se cerrará la sección.
      if (evento.target.closest('.enunciado-crear-lista')) {
        enseñarOcultarSeccion();
      }
      /* Si el usuario hace click en el botón de crear lista (imagen "más"), 
       se creará la lista con el nombre indicado (si no se ha indicado ningún nombre, 
       se creará la lista con un nombre por defecto). 
      */
      if (evento.target.id === 'crear-lista') {
        // Si el nombre de la lista no está vacío, 
        // se creará la lista con ese nombre. 
        // Si está vacío, se creará la lista con un nombre por defecto.
        if (nombreLista) {
          crearListaCompra(nombreLista);
        } else {
          crearListaCompra();
        }
        // Después de crear la lista, se cerrará la sección de creación de lista y se reseteará el formulario.
        formRef.current.reset();
        setEstaAbierto(false);
      }
    }}>
      <div className="enunciado-crear-lista" >
        <h4>Crear nueva lista</h4>
        {/*Si está abierto mostramos la flecha hacia abajo, si no, la flecha hacia la derecha.*/}
        <img src={flechaBlanca} className={estaAbierto ? 'rotacion-noventa' : ''} alt="flecha blanca" />
      </div>
      {/*Si está abierto, mostraremos el formulario.*/}
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
