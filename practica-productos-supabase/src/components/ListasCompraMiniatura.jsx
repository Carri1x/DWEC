import "./ListasCompraMiniatura.css";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import ListaCompraMiniatura from "./ListaCompraMiniatura.jsx";
import CrearLista from "./CrearLista.jsx";
import { useNavigate } from "react-router-dom";
import Cargando from "../shared/Cargando.jsx";
const ListasCompraMiniatura = () => {
  const {
    cargando,
    listasCompra,
    borrarListaPorID,
   } = useContextoListaCompra();
  const navegar = useNavigate();

  return (
    <div
      className="container-lista-compra"
      onClick={(evento) => {
        //EVENTO que nos llevará a VISUALIZAR LA LISTA que se le haya clicado.
        if (evento.target.closest(".container-lista")) {
          const idLista = evento.target.closest(".container-lista").id;
          navegar(`/lista-compra/${idLista}`);
          return;
        }
        //EVENTO de BORRAR LISTA que se haya clicado.
        if (evento.target.closest(".container-lista") && evento.target.tagName === 'IMG') { // CONDICIÓN: Si está dentro del div.container-lista Y es la imagen papelera.
          const idLista = evento.target.closest(".container-lista").id;
          borrarListaPorID(idLista);
        }
      }}
    >
      {cargando && <Cargando contexto={'Borrando lista...'}/>}
      <h2>Listas de la compra</h2>
      <CrearLista />
      <div className='container-listas' >
        {listasCompra && listasCompra.length > 0 ? (
          listasCompra.map((lista) => {
            return <ListaCompraMiniatura key={lista.id} value={lista}/>;
          })
        ) : (
          <p>No hay ninguna lista de la compra creada.</p>
        )}
      </div>
    </div>
  );
};

export default ListasCompraMiniatura;
