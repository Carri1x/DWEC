import './EditarProducto.css';
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";
import useContextoProductos from "../hooks/useContextoProductos.js";
import { Link } from "react-router-dom";
import { comprobarCambiosEditados } from "../libraries/forms.js";
import { erroresFormulario } from "../libraries/forms.js";
import Cargando from '../shared/Cargando.jsx';

const EditarProducto = () => {
    const { sesionIniciada } = useContextoSesion();
    const { idProducto } = useParams();
    const {
        cargando,
        mensajeCargando,
        productos,
        editarProducto,
    } = useContextoProductos();
    const [productoEditar, setProductoEditar] = useState(null);
    const [formulario, setFormulario] = useState(null);
    const [erroresForm, setErroresForm] = useState({});
    const formRef = useRef(null);

    /**
     * Función que se encarga de cambiar el estado del formulario cada vez que el usuario escriba en alguno de los campos del formulario.
     * 
     * @param {Event} evento 
     */
    const cambiarEstadoFormulario = (evento) => {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    /**
     * Cuando se cargue el componente, se buscará el producto a editar 
     * en el contexto de productos,
     * utilizando el idProducto obtenido de los parámetros de la URL.
     */
    useEffect(() => {
        const productoEditar = productos.find((producto) => producto.id.toString() === idProducto);
        setProductoEditar(productoEditar);
        if(formulario === null){
            setFormulario(productoEditar);
        }
    }, []);

    return (
        <>
            {
                !sesionIniciada ? ( //Exactamente si no tiene la sesión iniciada tendrá que logearse...
                    <>
                        <p>Para acceder a este apartado debes logearte primero</p>
                        <Link to={"/login"} className="btn-link">
                            Iniciar sesión
                        </Link>
                    </>
                ) :  //En cambio, si tiene la sesión iniciada podrá editar un producto...
                    (
                        <div className="editar-producto-container">
                            {cargando && <Cargando contexto={mensajeCargando}/> }
                            <h2>Editar Producto</h2>
                            <button onClick={() => {setFormulario(productoEditar)}}>Resetear producto</button>
                            <form ref={formRef}>
                                <label htmlFor="nombre">Nombre: </label>
                                <input
                                    type="text"
                                    name='nombre'
                                    value={`${formulario?.nombre || ''}`}
                                    placeholder='Nombre del producto'
                                    onChange={cambiarEstadoFormulario}
                                />
                                {erroresForm.nombre && (
                                    <div className="mensaje-error">{erroresForm.nombre}</div>
                                )}

                                <label htmlFor="precio">Precio: </label>
                                <input
                                    type="text"
                                    name='precio'
                                    value={`${formulario?.precio || ''}`}
                                    placeholder='Precio del producto'
                                    onChange={cambiarEstadoFormulario}
                                />
                                {erroresForm.precio && (
                                    <div className="mensaje-error">{erroresForm.precio}</div>
                                )}

                                <label htmlFor="peso">Peso: </label>
                                <input
                                    type="text"
                                    name='peso'
                                    value={`${formulario?.peso || ''}`}
                                    placeholder='Peso del producto'
                                    onChange={cambiarEstadoFormulario} />
                                {erroresForm.peso && (
                                    <div className="mensaje-error">{erroresForm.peso}</div>
                                )}

                                <label htmlFor="imagen">Imagen URL: </label>
                                <input
                                    type="text"
                                    name='imagen'
                                    value={`${formulario?.imagen || ''}`}
                                    placeholder='Url/imagen del producto'
                                    onChange={cambiarEstadoFormulario}
                                />
                                {erroresForm.imagen && (
                                    <div className="mensaje-error">{erroresForm.imagen}</div>
                                )}

                                <label htmlFor="descripcion">Descripción: </label>
                                <textarea
                                    name='descripcion'
                                    rows="5"
                                    cols="50"
                                    value={`${formulario?.descripcion || ''}`}
                                    placeholder='Descripción del producto'
                                    onChange={cambiarEstadoFormulario}
                                ></textarea>

                                <button type="submit" className="btn btn-primary btn-block" onClick={(evento) => {
                                    // ----------------------------------- VALIDACIÓN FORMULARIO Y ENVÍO -----------------------------------
                                    evento.preventDefault();
                                    const erroresValidacion = erroresFormulario(formRef.current);
                                    if (Object.keys(erroresValidacion).length > 0) {
                                        setErroresForm(erroresValidacion);
                                    } else {
                                        if (comprobarCambiosEditados(productoEditar, formulario)) {
                                            editarProducto(formulario);
                                            formRef.current.reset();
                                            setErroresForm({});
                                        }
                                    }
                                }}>Guardar cambios</button>
                            </form>
                        </div>
                    )
            }

        </>

    )
};

export default EditarProducto;