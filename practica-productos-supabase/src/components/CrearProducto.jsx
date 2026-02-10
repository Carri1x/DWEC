import './CrearProducto.css';
import { useRef, useState } from "react";
import useContextoSesion from "../hooks/useContextoSesion.js";
import { Link } from "react-router-dom";
import useContextoProductos from "../hooks/useContextoProductos.js";
import { erroresFormulario } from "../libraries/forms.js";

const CrearProducto = () => {

    const {
        sesionIniciada
    } = useContextoSesion();
    const {
        cambiarEstadoNuevoProducto,
        crearProducto,
    } = useContextoProductos();

    const [erroresForm, setErroresForm] = useState({});
    const formRef = useRef(null);

    /**
     * Función que se encarga de validar el formulario de creación de producto, 
     * utilizando la función erroresFormulario que hemos creado en la carpeta libraries.
     * IMPORTANTE: 
     * - Esta función setea los errores en el estado del componente para poder mostrarlos en el formulario.
     * 
     * @param {Object} formulario 
     * @returns Si el formulario es válido, devuelve true. Si no, devuelve false.
     */
    const formularioValido = (formulario) => {
        const errores = erroresFormulario(formulario);
        setErroresForm(errores);
        //Si errores tiene atributos es porque HAY ERRORES! si no hay errores (return (0===0) true) el FORMULARIO ES VÁLIDO.
        return Object.keys(errores).length === 0;
    }


    return (
        <>
            <div className="crear-producto-container">
                {
                    !sesionIniciada ? ( //Exactamente si no tiene la sesión iniciada tendrá que logearse...
                        <>
                            <p>Para acceder a este apartado debes logearte primero</p>
                            <Link to={"/login"} className="btn-link">
                                Iniciar sesión
                            </Link>
                        </>
                    ) : (  //En cambio, si tiene la sesión iniciada podrá crear un producto...
                        <>
                            <h1>Crea el nuevo producto...</h1>
                            <form ref={formRef} className="formulario-producto">

                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input type="text" name="nombre" id="nombre" placeholder="Ej: Peras Feas"
                                        onChange={cambiarEstadoNuevoProducto}
                                        // Añadimos clase condicional si hay error para pintar el borde rojo
                                        className={erroresForm.nombre ? 'input-error' : ''}
                                    />
                                    {erroresForm.nombre && (
                                        <div className="mensaje-error">{erroresForm.nombre}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="precio">Precio (€):</label>
                                    <input type="text" name="precio" id="precio" placeholder="Ej: 0,25"
                                        onChange={cambiarEstadoNuevoProducto}
                                        className={erroresForm.precio ? 'input-error' : ''}
                                    />
                                    {erroresForm.precio && (
                                        <div className="mensaje-error">{erroresForm.precio}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="peso">Peso (Kg):</label>
                                    <input type="text" name="peso" id="peso" placeholder="Ej: 0,5"
                                        onChange={cambiarEstadoNuevoProducto}
                                        className={erroresForm.peso ? 'input-error' : ''}
                                    />
                                    {erroresForm.peso && (
                                        <div className="mensaje-error">{erroresForm.peso}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="imagen">Url de la imagen:</label>
                                    <input type="text" name="imagen" id="imagen" placeholder="https://ejemplo.com/PerasFeas.jpg"
                                        onChange={cambiarEstadoNuevoProducto}
                                        className={erroresForm.imagen ? 'input-error' : ''}
                                    />
                                    {erroresForm.imagen && (
                                        <div className="mensaje-error">{erroresForm.imagen}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción del producto:</label>
                                    <textarea
                                        name="descripcion" id="descripcion" rows="5" cols="50"
                                        placeholder="Escribe aquí los detalles del producto..."
                                        onChange={cambiarEstadoNuevoProducto}
                                    ></textarea>
                                </div>

                                {/* Añadida clase 'btn btn-primary' y 'btn-block' */}
                                <button type="button" className="btn btn-primary btn-block" onClick={(evento) => {
                                    evento.preventDefault();
                                    if (formularioValido(formRef.current)) {
                                        crearProducto();
                                        formRef.current.reset();
                                        setErroresForm({});
                                    }
                                }}>Crear producto</button>
                            </form>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default CrearProducto;