import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import useContextoSesion from "../hooks/useContextoSesion.js";
import ProductoMiniatura from "./ProductoMiniatura.jsx";

const CatalogoProductosEnLista = () => {
    const {
      esAdmin,
    } = useContextoSesion()
    const {
        lista,
        borrarProductoDeLista,
    } = useContextoListaCompra();

    const {
        confirmarAccion,
    } = useContextoMensajes();

  return (
    <>
      {
        lista.productos && lista.productos.length > 0 ? (
          <div className="lista-productos-compra-miniatura"
            onClick={async (evento) => {
              //Si es administrador no puede borrar productos.
              if(esAdmin) return;
                if (evento.target.closest(".container-producto-miniatura") &&
                    evento.target.classList.contains("boton-borrar-producto")) {
                    //Como es el contenedor principal de este producto el que tiene el id, es entonces porqué lo buscamos en ese elemento que tiene cerca el evento.target.
                    const idProducto = evento.target.closest(".container-producto-miniatura").id;
                    //Buscamos el produto a borrar para simplemente mencionarlo en el mensaje de confirmación ===>> confirmarAccion('.....${nombreDelProducto}');
                    const productoABorrar = lista.productos.find(
                        (p) => p.id === idProducto,
                    );
                    const borradoConfirmado = await confirmarAccion(
                        `¿Estás seguro que quieres eliminar el producto: ${productoABorrar.nombre}, de la lista: ${lista.nombre}?`,
                    );
                    //Si el usuario ha confirmado de que si quiere borrar el producto se procederá a eliminarlo.
                    if (borradoConfirmado) {
                        await borrarProductoDeLista(lista.id, idProducto);
                    }
                }
            }}
          >
            {lista.productos.map((producto) => {
              return (
                <ProductoMiniatura
                  key={producto.id}
                  value={producto}
                  idLista={lista.id}
                />
              );
            })}
          </div>
        ) : (
          <p>No hay productos añadidos en esta lista.</p>
        )
      }
    </>
  );
};

export default CatalogoProductosEnLista;
