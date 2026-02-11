import "./ListaCompraDetalles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useContextoListaCompra from "../hooks/useContextoListaCompra.js";
import useContextoProductos from "../hooks/useContextoProductos.js";
import ListadoProductosMiniatura from "../components/ListadoProductosMiniatura.jsx";
import ProductoMiniatura from "../components/ProductoMiniatura.jsx";
import useContextoMensajes from "../hooks/useContextoMensajes.js";
import Cargando from "../shared/Cargando.jsx";
import ListasCompraMiniatura from "../components/ListasCompraMiniatura.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import { formatearMonedaEspanya, formatearPesoEspanya } from "../libraries/libreria.js";

const ListaCompraDetalles = () => {
    const { idLista } = useParams();

    const { sesionIniciada } = useContextoSesion();

    const { productos } = useContextoProductos();

    const {
        cargando,
        mensajeCargando,
        lista,
        cargarListaPorID,
        borrarProductoDeLista

    } = useContextoListaCompra();

    const { confirmarAccion } = useContextoMensajes();

    const [modoAddProductos, setModoAddProductos] = useState(false);
    const [hayProductosAñadir, setHayProductosAñadir] = useState(true);
    const [productosAccesibles, setProductosAccesibles] = useState([]);
    //Estos estados tienen que ver con el total, tanto cantidad, como coste y el peso de toda la lista del usuario.
    const [cantidadTotalProductos, setCantidadTotalProductos] = useState(0);
    const [costeTotalProductos, setCosteTotalProductos] = useState(0);
    const [pesoTotalProductos, setPesoTotalProductos] = useState(0);

    const calcularCestaUsuario = () => {
        //Si no hay productos en la lista no hacemos la operación.
        if (!lista.productos) return;
        //--------------------------------------- CÁLCULO CANTIDAD TOTAL PRODUCTOS --------------------------------
        //Sacamos la cantidad total de los productos de la lista.
        const cantidad = lista.productos.reduce((acum, producto) => {
            return acum + producto.cantidad;
        }, 0); // NOTA RECORDATORIO: Si no ponemos este cero en la primera iteración acum será igual a un producto por lo tanto será [object Object]+segundoValor.

        setCantidadTotalProductos(cantidad);

        //--------------------------------------- CÁLCULO PRECIO TOTAL PRODUCTOS --------------------------------
        const precio = lista.productos.reduce((acum, producto) => {
            return acum + (producto.precio * producto.cantidad);
        }, 0); // NOTA RECORDATORIO: Si no ponemos este cero en la primera iteración acum será igual a un producto por lo tanto será [object Object]+segundoValor.
        setCosteTotalProductos(precio);

        //--------------------------------------- CÁLCULO PESO TOTAL PRODUCTOS --------------------------------
        const peso = lista.productos.reduce((acum, producto) => {
            return acum + (producto.peso * producto.cantidad);
        }, 0); // NOTA RECORDATORIO: Si no ponemos este cero en la primera iteración acum será igual a un producto por lo tanto será [object Object]+segundoValor.
        setPesoTotalProductos(peso);
    }

    const evitarProductosRepetidosEnAmbasListas = () => {

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
        // Opcional: Ocultar el botón AÑADIR PRODUCTOS si ya no quedan más productos por añadir.
        setHayProductosAñadir(filtrados.length > 0);
    }


    /**
     * Este useEffect va a calcular el TOTAL DE LOS PRODUCTOS que tiene el usuario, el TOTAL DEL PRECIO y el TOTAL DEL PESO.
     */
    useEffect(() => {
        calcularCestaUsuario();
    });

    /**
     * Este useEffect es para ir borrando los productos de la lista general ya que tiene esos prodcutos añadidos en la lista presonal.
     */
    useEffect(() => {
        // Verificamos que tengamos tanto los productos generales como los de la lista.
        if (productos && lista?.productos) {
            evitarProductosRepetidosEnAmbasListas();
        }
        // IMPORTANTE: Ponemos las dependencias para que solo se ejecute
        // cuando cambien los productos del catálogo o los de la lista del usuario.
    }, [productos, lista.productos]);

    /**
     * Este useEffect es para traer/cargar las listas cuando se carga este componente.
     */
    useEffect(() => {
        //Si hay id de la lista a la que queremos solicitar la lista.
        if (idLista) {
            cargarListaPorID(idLista);
        }
    }, [idLista]);

    return (
        <div
            className="main-container-lista-compra-detalles"
            onClick={async (evento) => {
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
            {cargando && <Cargando contexto={mensajeCargando} />}
            {sesionIniciada && <ListasCompraMiniatura />}
            <div className="container-lista-compra-detalles">
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
                                    {modoAddProductos ? "Terminar selección" : "Añadir productos"}
                                </button>
                            )
                        }
                        { // -------------------------------------------- ZONA PRODUCTOS QUE TIENE EL USUARIO EN LA LISTA -----------------------------------------------
                            lista.productos && lista.productos.length > 0 ? (
                                <div className="lista-productos-compra-miniatura">
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
                            )}
                        {
                            //Aquí tenemos el catálogo de los productos que AÚN NO TIENE SELECCIONADOS EN SU LISTA DE LA COMPRA.
                            modoAddProductos && (
                                productosAccesibles.length > 0 && (
                                    <div className="catalogo-productos">
                                        <ListadoProductosMiniatura value={productosAccesibles} />
                                    </div>
                                )
                            )
                        }

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
                {
                    cantidadTotalProductos !== 0 &&
                    <div className="total-cantida-precio-lista">
                        <p>Total productos: {cantidadTotalProductos}</p>
                        <p>Total peso: {formatearPesoEspanya(pesoTotalProductos)} kg</p>
                        <p>Total precio: {formatearMonedaEspanya(costeTotalProductos)}</p>
                        { //En caso de que el peso sea mayor que 10 kg pasaremos a avisar al usuario para que traiga su coche por el peso excesivo. 
                            pesoTotalProductos >= 10 &&
                            <div className="aviso-peso-elevado">
                                <p>El peso es muy elevado, recomendamos venir en coche para recoger su compra.</p>
                            </div>
                        }
                    </div>
                }
            </div>



        </div>
    );
};

export default ListaCompraDetalles;
