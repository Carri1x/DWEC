import { useEffect, useState,useContext, use } from "react";
import {
  filtroDiscos,
} from "../libraries/forms.js";
import Disco from "../components/Disco.jsx";
import MensajeFlotante from "../components/MensajeFlotante.jsx";
import './ListaDiscos.css';
import {contextoDiscos} from '../context/ProveedorDiscos.jsx';
import { useNavigate } from "react-router-dom";


const ListaDiscos = () => {
  const {discos, borrarDisco} = useContext(contextoDiscos);
  const [discosTemp, setDiscosTemp] = useState([]);
  const [discosFiltrados, setDiscosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [esVisible, setEsVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const estado = "disco-no-guardado";
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

  useEffect(() => {
    setDiscosTemp(discos);
  }, [discos]);

  return (
    <div className="container-lista-discos">
      <h1>Lista de discos</h1>
      {esVisible && <MensajeFlotante mensaje={mensaje} estado={estado} />}
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
        if(evento.target.classList.contains('editar-disco') ){
          //Si se ha hecho click en el botón de editar disco navegamos a la ruta de editar disco.
          navegar(`/editar-disco/${evento.target.dataset.id}`);
        }
        if(evento.target.classList.contains('borrar-disco')){
          //Si se ha hecho click en el botón de borrar disco procedemos a borrar el disco.
          await borrarDisco(evento.target.dataset.id);
        }
      }}>

        {
          //Si hay discos filtrados lo sustituimos por todos los discos.
          discosFiltrados.length > 0 ? (
            discosFiltrados.map((disco) => (
              <Disco
                key={disco.id}
                disco={disco}
              />
            ))
          ) : //Si no hay discos filtrados, enseñamos todos los discos del State general.
          discosTemp ? (
            discosTemp.map((disco) => (
              <Disco
                key={disco.id}
                disco={disco}
              />
            ))
          ) : (
            //En cambio si no hay ningún disco guardado, procedemos a avisar al usuario con este div.
            <div>No hay discos guardados por ahora.</div>
          )
        }
      </div>
    </div>
  );
};

export default ListaDiscos;
