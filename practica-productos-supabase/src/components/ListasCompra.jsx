import "./ListasCompra.css";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import ListaCompra from "../components/ListaCompra.jsx";
import CrearLista from "./CrearLista.jsx";
import { useNavigate } from "react-router-dom";

const ListasCompra = () => {
  const { listasCompra } = useContextoListaCompra();
  const navegar = useNavigate();
  const [animar, setAnimar] = useState(false);

  return (
    <div
      className="container-lista-compra"
      onClick={(evento) => {
        //EVENTO que nos llevará a VISUALIZAR LA LISTA que se le haya clicado.
        if (evento.target.closest(".container-lista")) {
          setAnimar(true);
          const idLista = evento.target.closest(".container-lista").id;
          navegar(`/sup/lyp/lista-compra/${idLista}`);
        }
        //EVENTO de BORRAR LISTA que se haya clicado.
        if (evento.target.closest(".container-lista") && evento.target.tagName === 'IMG') { // CONDICIÓN: Si está dentro del div.container-lista Y es la imagen papelera.
          const idLista = evento.target.closest(".container-lista").id;
          borrarLista(idLista);
        }
      }}
      onAnimationEnd={() }
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
