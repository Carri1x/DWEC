import "./EditarDisco.css";
import { useParams } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import {
    camposEditados,
    contieneErrores,
    validarInput
} from "../libraries/forms.js";
import Cargando from "../components/Cargando.jsx";
import useContextoDiscos from "../hooks/useContextoDiscos.js";
import MensajeFlotante from "../components/MensajeFlotante.jsx";
import { useNavigate } from "react-router-dom";

const EditarDisco = () => {
    const formInicial = {
        nombre: "",
        caratula: "",
        grupoInterprete: "",
        año: "",
        genero: "",
        localizacion: "",
        prestado: false
    };
    const {
        buscarDiscoPorId,
        editarDiscoParcial,
        editarDiscoCompleto
    } = useContextoDiscos();

    const { id } = useParams();
    const [discoEditar, setDiscoEditar] = useState({});
    const [formulario, setFormulario] = useState(formInicial);
    const formRef = createRef(null);
    const [errores, setErrores] = useState({});
    const [disabled, setDisabled] = useState(true);

    const navegar = useNavigate();

    //Control del mensaje flotante
    const [mensaje, setMensaje] = useState('');
    const [mensajeEsVisible, setMensajeEsVisible] = useState(false);


    const cambiarEstado = (evento) => {
        const { name, value, type, checked } = evento.target;
        setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value });
    };

    const buscarDisco = async () => {
        try {
            const disco = await buscarDiscoPorId(id);
            if (disco) {
                setDiscoEditar(disco);
                setFormulario(disco);
            }
        } catch (error) {
            setMensajeEsVisible(true);
            setMensaje("EditarDisco.buscarDisco: No se ha encontrado el disco.");
        }
    };

    const editarDisco = () => {
        const cambios = camposEditados(discoEditar, formulario);
        try {
            /*
             * Si no hay cambios mostramos un mensaje flotante indicándolo.
             */
            if (Object.keys(cambios).length === 0) {
                setMensajeEsVisible(true);
                setMensaje('No han habido cambios en el disco');
            } else if (Object.keys(cambios).length < Object.keys(discoEditar).length) {
                /* Si solo se han cambiado pocos valores mandamos la petición PATCH.
                 * En cambio, si tienen el mismo tamaño de atributos hacemos la petición PUT
                 * que se carga todos los valores.
                 */
                editarDiscoParcial(id, cambios)
            } else {
                editarDiscoCompleto(id, cambios);
            }
            setMensaje('El disco se ha modificado correctamente.');
            setMensajeEsVisible(true);
            navegar('/lista-discos');
        } catch (error) {
            setMensajeEsVisible(true);
            setMensaje(error.message || "EditarDisco.editarDisco: Error al editar el disco.");
        }
    };

    /**
     * Buscamos el disco que queremos editar en la base de datos.
     */
    useEffect(() => {
        buscarDisco();
    }, []);

    /**
     * Cuando se ha traído el disco a editar, asignamos al estado formulario los datos del disco principal.
     */
    useEffect(() => {
        setFormulario({ ...discoEditar });
    }, [discoEditar]);

    useEffect(() => {
        if (!formulario || !discoEditar) return;

        // Comprobamos si hay errores
        const hayErrores = contieneErrores(errores);

        // Comprobamos si hay cambios comparando objeto contra objeto.
        // Usamos una comparación some, para saber si algo ha cambiado en el formulario y el discoAEditar.
        const hayCambios = Object.keys(formulario).some(
            (atributo) => formulario[atributo] !== discoEditar[atributo]
        );

        setDisabled(hayErrores || !hayCambios);
    }, [formulario, errores, discoEditar]);


    /**
     * Porqué pongo en el value de cada input formulario.loquesea || '' ?
     * Porque si no, al principio cuando el estado formulario está a null o vacío
     * React se queja de que el input cambia de no controlado a controlado.
     * 
     * Me saltaba este error en la consola:
     * installHook.js:1 A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components
     * No tiene sentido porque yo principalmente inicializo el estado formulario a un objeto con atributos vacíos.
     */
    return (
        <div>
            {mensajeEsVisible && (<MensajeFlotante mensaje={mensaje} />)}
            <h2>Editar Disco: {discoEditar.nombre}</h2>

            {/*He investigado sobre este evento onBlur y me parece majestuoso, en cuanto un input ha sido tocado y cambia el usuario el foco donde estaba interactuando se activa este evento.*/}
            {/*Entonces cuando se ha cambiado el foco, llamo a la función validar input.*/}
            {
                !formulario ? <Cargando /> : (
                    <div className="container-editar-disco">
                        <fieldset>
                            <legend>Editar</legend>
                            <form name="formDiscos" ref={formRef}>
                                <label htmlFor="nombre">Nombre: </label>
                                <input
                                    id="nombre"
                                    type="text"
                                    name="nombre"
                                    value={formulario.nombre || ''}
                                    onChange={cambiarEstado}
                                    onBlur={(evento) => {
                                        validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                                    }}
                                    required
                                />
                                {
                                    //En caso de que en el estado errores haya errores los mostramos.
                                    errores.nombre && (
                                        <div className="mensaje-error">{errores.nombre}</div>
                                    )
                                }

                                <label htmlFor="caratula">Caratula del disco: </label>
                                <input
                                    id="caratula"
                                    type="text"
                                    name="caratula"
                                    value={formulario.caratula || ''}
                                    onChange={cambiarEstado}
                                    onBlur={(evento) => {
                                        validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                                    }}
                                />
                                {
                                    //En caso de que en el estado errores haya errores los mostramos.
                                    errores.caratula && (
                                        <div className="mensaje-error">{errores.caratula}</div>
                                    )
                                }

                                <label htmlFor="grupo">Grupo o intérprete: </label>
                                <input
                                    id="grupo"
                                    type="text"
                                    name="grupoInterprete"
                                    value={formulario.grupoInterprete || ''}
                                    onChange={cambiarEstado}
                                    onBlur={(evento) => {
                                        validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                                    }}
                                    required
                                />
                                {
                                    //En caso de que en el estado errores haya errores los mostramos.
                                    errores.grupoInterprete && (
                                        <div className="mensaje-error">{errores.grupoInterprete}</div>
                                    )
                                }

                                <label htmlFor="año">Año de publicación: </label>
                                <input
                                    id="año"
                                    type="text"
                                    name="año"
                                    value={formulario.año || ''}
                                    onChange={cambiarEstado}
                                    onBlur={(evento) => {
                                        validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                                    }}
                                />
                                {
                                    //En caso de que en el estado errores haya errores los mostramos.
                                    errores.año && <div className="mensaje-error">{errores.año}</div>
                                }

                                <label htmlFor="genero">Género: </label>
                                <select
                                    name="genero"
                                    id="genero"
                                    value={formulario.genero || ''}
                                    onChange={cambiarEstado}
                                >
                                    <option value="rock">Rock</option>
                                    <option value="pop">Pop</option>
                                    <option value="jazz">Jazz</option>
                                    <option value="blues">Blues</option>
                                    <option value="hiphop">Hip-Hop</option>
                                    <option value="rap">Rap</option>
                                    <option value="reggae">Reggae</option>
                                    <option value="salsa">Salsa</option>
                                    <option value="cumbia">Cumbia</option>
                                    <option value="electronica">Electrónica</option>
                                    <option value="metal">Metal</option>
                                    <option value="punk">Punk</option>
                                    <option value="clasica">Clásica</option>
                                    <option value="country">Country</option>
                                    <option value="reggaeton">Reggaetón</option>
                                    <option value="trap">Trap</option>
                                    <option value="folk">Folk</option>
                                    <option value="indie">Indie</option>
                                    <option value="flamenco">Flamenco</option>
                                    <option value="bachata">Bachata</option>
                                    <option value="tango">Tango</option>
                                    <option value="kpop">K-Pop</option>
                                    <option value="rnb">R&B</option>
                                    <option value="lofi">Lo-Fi</option>
                                </select>

                                <label htmlFor="localizacion">Localización: </label>
                                <input
                                    type="text"
                                    id="localizacion"
                                    name="localizacion"
                                    value={formulario.localizacion || ''}
                                    onChange={cambiarEstado}
                                    onBlur={(evento) => {
                                        validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                                    }}
                                />
                                {
                                    //En caso de que en el estado errores haya errores los mostramos.
                                    errores.localizacion && (
                                        <div className="mensaje-error">{errores.localizacion}</div>
                                    )
                                }

                                <div className="checkbox-container">
                                    <label htmlFor="prestado">Prestado: </label>
                                    <input
                                        type="checkbox"
                                        id="prestado"
                                        name="prestado"
                                        checked={formulario.prestado || ""}
                                        onChange={cambiarEstado}
                                    />
                                </div>

                                <button
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => {
                                        editarDisco();
                                    }}
                                >
                                    Editar Disco
                                </button>
                            </form>
                        </fieldset>
                        {!discoEditar ? (
                            <Cargando />
                        ) : (
                            <div className="container-disco vista-previa-editar">
                                <h2>Valores del disco sin editar</h2>
                                <h3>Nombre: {discoEditar.nombre}</h3>
                                <div className="caratula-editar">
                                    {discoEditar.caratula && <p>Carátula:</p>}
                                    {discoEditar.caratula && (
                                        <img
                                            src={discoEditar.caratula}
                                            alt={`Caratula del disco ${discoEditar.nombre}`}
                                        />
                                    )}
                                </div>

                                <p>Grupo/Intérprete: {discoEditar.grupoInterprete}</p>
                                {discoEditar.genero && (
                                    <strong>Género: {discoEditar.genero}</strong>
                                )}
                                {discoEditar.localizacion && (
                                    <p>Localización: {discoEditar.localizacion}</p>
                                )}
                                {discoEditar.prestado && <strong>Prestado</strong>}
                                {discoEditar.año && <small>Año: {discoEditar.año}</small>}
                            </div>)}
                    </div>
                )}
        </div>
    );
};

export default EditarDisco;
