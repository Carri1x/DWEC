import "./ListasCompra.css";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import ListaCompra from "../components/ListaCompra.jsx";
import CrearLista from "./CrearLista.jsx";
import { useNavigate } from "react-router-dom";

const ListasCompra = () => {
  const { listasCompra } = useContextoListaCompra();
  const navegar = useNavigate();

  return (
    <div
      className="container-lista-compra"
      onClick={(evento) => {
        //Evento que nos llevará a visualizar la lista que se le haya clicado.
        if (evento.target.closest("container-lista")) {
          const idLista = evento.target.dataset.id;
          navegar(`/sup/lista-compra/${idLista}`);
        }
      }}
    >
      <h2>Listas de la compra</h2>
      <CrearLista />
      <div className="container-listas">
        {listasCompra && listasCompra.length > 0 ? (
          listasCompra.map((lista) => {
            return <ListaCompra key={lista.id} value={lista} />;
          })
        ) : (
          <p>No hay ninguna lista de la compra creada.</p>
        )}
      </div>
    </div>
  );
};

export default ListasCompra;
