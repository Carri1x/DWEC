import "./ListaCompraDetalles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import useContextoProductos from "../hooks/useContextoProductos";
import ListadoProductosMiniatura from "./ListadoProductosMiniatura.jsx";
import ProductoMiniatura from "./ProductoMiniatura.jsx";
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import Cargando from "../shared/Cargando.jsx";
import ListasCompraMiniatura from "./ListasCompraMiniatura.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";

const ListaCompraDetalles = () => {
  const { idLista } = useParams();

  const {sesionIniciada} = useContextoSesion();

  const { productos } = useContextoProductos();

  const { 
    cargando,
    lista,
    cargarListaPorID, 
    borrarProductoDeLista 

  } = useContextoListaCompra();

  const { confirmarAccion } = useContextoMensajes();

  const [modoAddProductos, setModoAddProductos] = useState(false);
  const [hayProductosAñadir, setHayProductosAñadir] = useState(true);
  const [productosAccesibles, setProductosAccesibles] = useState([]);

  useEffect(() => {
    // Verificamos que tengamos tanto los productos generales como los de la lista.
    if (productos && lista?.productos) {
      //Filtramos el catálogo global.
      const filtrados = productos.filter((pGeneral) => {
        // Buscamos si el producto del catálogo ya existe en la lista personal.
        const yaEstaEnLista = lista.productos.some(
          (pLista) => pLista.id === pGeneral.id,
        );

        // Si NO está en la lista (!yaEstaEnLista), lo mantenemos en "Accesibles".
        return !yaEstaEnLista;
      });

      setProductosAccesibles(filtrados);

      // Opcional: Ocultar el botón si ya no quedan más productos por añadir.
      setHayProductosAñadir(filtrados.length > 0);
    }

    // IMPORTANTE: Ponemos las dependencias para que solo se ejecute
    // cuando cambien los productos del catálogo o los de tu lista.
  }, [productos, lista.productos]);

  useEffect(() => {
    console.log("ListaCompraDetalles: la esta liando");
    //Si hay id de la lista a la que queremos solicitar la lista.
    if (idLista) {
      cargarListaPorID(idLista);
    }
  }, [idLista]);

  return (
    <div
      className="container-lista-compra-detalles"
      onClick={async (evento) => {
        if (
          evento.target.closest(".container-producto-miniatura") &&
          evento.target.classList.contains("boton-borrar-producto")
        ) {
          //Como es el contenedor principal de este producto el que tiene el id, es entonces porqué lo buscamos en ese elemento que tiene cerca el evento.target.
          const idProducto = evento.target.closest(
            ".container-producto-miniatura",
          ).id;
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
        {cargando && <Cargando/>}
        {sesionIniciada && <ListasCompraMiniatura />}
      {lista && lista.nombre ? (
        <>
          <h1>Lista de la compra: {lista?.nombre}</h1>
          {
            //Aquí en caso de que no hayan más productos para seleccionar en <ListadoProductosMiniatura /> borraremos el botón para que no ocupe espacio innecesario.
            hayProductosAñadir && (
              <button
                onClick={() => {
                  setModoAddProductos(!modoAddProductos);
                }}
              >
                {" "}
                {modoAddProductos ? "Terminar selección" : "Añadir productos"}
              </button>
            )
          }
          {lista.productos && lista.productos.length > 0 ? (
            lista.productos.map((producto) => {
              return (
                <ProductoMiniatura
                  key={producto.id}
                  value={producto}
                  idLista={lista.id}
                />
              );
            })
          ) : (
            <p>No hay productos añadidos en esta lista.</p>
          )}
          <div className="catalogo-productos">
            {
              //Aquí tenemos el catálogo de los productos que AÚN NO TIENE SELECCIONADOS EN SU LISTA DE LA COMPRA.
              modoAddProductos && (
                <ListadoProductosMiniatura value={productosAccesibles} />
              )
            }
          </div>
        </>
      ) : (
        <>
          <p>No hay ninguna lista seleccionada.</p>
          <small>
            Selecciona una lista de las que hay en la parte izquierda de tu
            pantalla.
          </small>
          <small>
            En caso de no haber ninunga puedes seleccionar la opción superior de
            crear una nueva.
          </small>
        </>
      )}
    </div>
  );
};

export default ListaCompraDetalles;
