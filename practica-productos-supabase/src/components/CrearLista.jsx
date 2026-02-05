import "./CrearLista.css";
import { useState } from "react";
import imagenMas from "../assets/mas.png";
import flechaBlanca from "../assets/flecha-blanca.png";
import useContextoListaCompra from "../hooks/useContextoListaCompra";

const CrearLista = () => {
  const [nombreLista, setNombreLista] = useState('');
  const [estaAbierto, setEstaAbierto] = useState(false);

  const {
    crearListaCompra
  } = useContextoListaCompra();

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
      if (evento.target.closest('.enunciado-crear-lista')) {
        enseñarOcultarSection();
      }
      if (evento.target.id === 'crear-lista') {
        //CREAMOS LA LISTA!!
        if (nombreLista) {
          console.log("object")
          crearListaCompra(nombreLista);
        } else {
          console.log(" 2")
          crearListaCompra();
        }
      }
    }}>
      <h2>Listas de la compra</h2>
      <div className="enunciado-crear-lista" >
        <h4>Crear nueva lista</h4>
        <img src={flechaBlanca} className={estaAbierto ? 'rotacion-noventa' : ''} alt="flecha blanca" />
      </div>
      {estaAbierto &&
        <section>
          <input
            type="text"
            name="nueva-lista"
            placeholder="Nombre de tu nueva lista"
            onChange={cambiarEstado}
          />
          <img id="crear-lista" src={imagenMas} alt="Icono de añadir" />
        </section>
      }
    </div>
  );
};
export default CrearLista;
