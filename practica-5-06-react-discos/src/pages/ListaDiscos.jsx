import { useEffect, useState } from "react";
import {
  comprobarCompatibilidadLocalStorage,
  filtroDiscos,
  getAllDiscos,
  removeDiscoByUuid,
} from "../libraries/forms.js";
import Disco from "../components/Disco.jsx";
import MensajeFlotante from "../components/MensajeFlotante.jsx";
import './ListaDiscos.css'

const ListaDiscos = () => {
  const [discos, setDiscos] = useState();
  const [discosFiltrados, setDiscosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [esVisible, setEsVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const estado = "disco-no-guardado";

  const borrarDisco = (disco) => {
    if (!confirm(`Estas seguro que quieres eliminar el disco ${disco.nombre}.`))
      return;
    //En caso de que no sea un botón es porque no ha presionado el botón de borrar disco. Salimos de la función.
    const discos = removeDiscoByUuid(disco.uuid);
    setEsVisible(true); //Se muestra el mensaje de que se ha eliminado el disco.
    setMensaje(`El disco ${disco.nombre} se ha eliminado correctamente.`); // Mandamos el mensaje de éxito en la eliminación del disco.
    setTimeout(() => {
      setEsVisible(false);
    }, 3000);
    setDiscos(discos);
  };

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
    comprobarCompatibilidadLocalStorage();
    setDiscos(getAllDiscos());
  }, []);

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
      <div className="container-discos">
        {
          //Si hay discos filtrados lo sustituimos por todos los discos.
          discosFiltrados.length > 0 ? (
            discosFiltrados.map((disco) => (
              <Disco
                key={disco.uuid}
                disco={disco}
                borrarDisco={() => borrarDisco(disco)}
              />
            ))
          ) : //Si no hay discos filtrados, enseñamos todos los discos del State general.
          discos ? (
            discos.map((disco) => (
              <Disco
                key={disco.uuid}
                disco={disco}
                borrarDisco={() => borrarDisco(disco)}
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
