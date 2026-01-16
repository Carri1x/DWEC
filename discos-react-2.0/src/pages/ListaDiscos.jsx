import { useEffect, useState, useContext, use } from "react";
import {
  filtroDiscos,
} from "../libraries/forms.js";
import Disco from "../components/Disco.jsx";
import MensajeFlotante from "../components/MensajeFlotante.jsx";
import './ListaDiscos.css';
import { contextoDiscos } from '../context/ProveedorDiscos.jsx';
import { useNavigate } from "react-router-dom";
import Cargando from "../components/Cargando.jsx";
import MensajeAceptarCancelar from "../components/MensajeAceptarCancelar.jsx";


const ListaDiscos = () => {
  const { discos, borrarDiscoPorID } = useContext(contextoDiscos);
  const [discosTemp, setDiscosTemp] = useState([]);
  const [discosFiltrados, setDiscosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState("");

  //VARIABLES DE MENSAJE FLOTANTE.
  //Estado que cambia si es visible o no el componente MENSAJEFLOTANTE...
  const [esVisible, setEsVisible] = useState(false);
  //Estado que cambia el mensaje del componente MENSAJEFLOTANTE...
  const [mensaje, setMensaje] = useState("");
  //Estado que cambia el color del componente MENSAJEFLOTANTE... 
  const [estado, setEstado] = useState("");

  //VARIABLES DE MENSAJE ACEPTAR CANCELAR.
  //Estado que enseña el mensaje si quiere eliminar o no el disco que se ha seleccionado
  const [aceptaEliminarDisco, setAceptaEliminarDisco] = useState(false);
  //ID del disco que se va a querer eliminar.
  const [idDiscoEliminar, setIdDiscoEliminar] = useState('');
  const navegar = useNavigate();

  const cambiarEstado = (evento) => {
    if (evento.target.tagName === "INPUT") {
      const { value } = evento.target;
      setFiltro(value);
    }
  };

  const filtarDiscos = () => {
    const discosFilt = discos.filter((disco) => filtroDiscos(disco, filtro))
    setDiscosFiltrados(discosFilt);

  };

  const limpiarFiltro = () => {
    setFiltro('');
    setDiscosFiltrados([])
  };
  //Función para mostrar mensajes flotantes.
  const mostrarMensaje = (mensaje, estadoAccion) => {
    let estado = 'warning';
    if (estadoAccion) {
      estado = 'success';
    }
    //Mostramos el mensaje pasado como parámetro durante 3 segundos.
    setEstado(estado);
    setMensaje(mensaje);
    setEsVisible(true);
    setTimeout(() => {
      setEsVisible(false);
    }, 3000);
  }

  const borrarDisco = async () => {
    try {
      await borrarDiscoPorID(idDiscoEliminar);
      mostrarMensaje(`Disco borrado correctamente`, true);
    } catch (error) {
      console.log(error)
      mostrarMensaje(`Error al borrar el disco`, false);
    }
  }

  useEffect(() => {
    setDiscosTemp(discos);
  }, [discos]);

  return (
    <div className="container-lista-discos">
      <h1>Lista de discos</h1>
      {esVisible && <MensajeFlotante mensaje={mensaje} estado={estado} />}
      {
        aceptaEliminarDisco && <MensajeAceptarCancelar mensaje={"¿Quieres eliminar el disco?"} 
        botonIzq={() => {
          borrarDisco();
          //Quitamos el componente <MensajeAceptarCancelar /> para que no se quede estático en la pantalla...
          setAceptaEliminarDisco(false);
          }
        } 
        botonDer={() => {setAceptaEliminarDisco(false)}}/>
      }


      <div className="container-filtro">
        <span>Filtrar por: </span>
        <input
          type="text"
          name="filtro"
          placeholder="Escribe lo que quieras encontrar..."
          onChange={cambiarEstado}
        />
        <button onClick={filtarDiscos}>Filtrar</button>
        <button onClick={limpiarFiltro}>Limpiar filtro</button>
      </div>

      <div className="container-discos" onClick={async (evento) => {
        //Delegación de eventos para borrar y editar discos.
        if (evento.target.classList.contains('editar-disco')) {
          //Si se ha hecho click en el botón de editar disco navegamos a la ruta de editar disco.
          navegar(`/editar-disco/${evento.target.dataset.id}`);
        }
        if (evento.target.classList.contains('borrar-disco')) {
          //EN EL COMPONENTE <MensajeAceptarEliminar/> estarán las funciones de eliminar o no eliminar.
          setAceptaEliminarDisco(true);
          //Cambiamos el id del disco que se va a querer eliminar. Este id lo usa la función de borrarDisco().
          setIdDiscoEliminar(evento.target.dataset.id);
        }
      }}>

        {
          !discos ? <Cargando contexto={"la lista de discos"}/> :
            (
              //Si hay discos filtrados lo sustituimos por todos los discos.
              discosFiltrados.length > 0 ? 
              (
                discosFiltrados.map((disco) => (
                  <Disco
                    key={disco.id}
                    disco={disco}
                  />
                ))
              ) : //Si no hay discos filtrados, enseñamos todos los discos del State general.
                discosTemp ? 
                (
                  discosTemp.map((disco) => (
                    <Disco
                      key={disco.id}
                      disco={disco}
                    />
                  ))
                ) : 
                (
                  //En cambio si no hay ningún disco guardado, procedemos a avisar al usuario con este div.
                  <div>No hay discos guardados por ahora.</div>
                )
            )
        }
      </div>
    </div>
  );
};

export default ListaDiscos;
