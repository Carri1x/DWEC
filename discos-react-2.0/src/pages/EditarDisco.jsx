import { useParams } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import { contieneErrores, formularioVacio, validarInput } from "../libraries/forms.js";
import Cargando from "../components/Cargando.jsx";
import './EditarDisco.css';
import useDiscos from "../hooks/useDiscos.js";

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
    const { id } = useParams();
    const { buscarDiscoPorId } = useDiscos();
    const [discoEditar, setDiscoEditar] = useState({});
    const [formulario, setFormulario] = useState(formInicial);
    const formRef = createRef();
    const [errores, setErrores] = useState({});
    const [disabled, setDisabled] = useState(true);


    const cambiarEstado = (evento) => {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    const buscarDisco = async () => {
        try {
            const disco = await buscarDiscoPorId(id);
            if (disco) {
                setDiscoEditar(disco);
            }
        } catch (error) {
            console.log("EditarDisco: No se ha encontrado el disco.")
        }
    }

    const editarDisco = () => {

    }

    useEffect(() => {
        buscarDisco();
    }, []);

    /*useEffect(() => {
        /*************************** IMPORTANTE ***************************
            Hay que explicar bien estas líneas. Esta condición (LÍNEA 79) es un poco compleja.

            - SOLO PODRÁS ACCIONAR EL BOTÓN DE ACTUALIZAR EL DISCO, SI -> 
            1.- SI EL FORMULARIO NO TIENE ERRORES.
            2.- SI EL FORMULARIO NO ESTÁ VACIO. 
                    (PERO SI EL FORMULARIO ESTÁ VACÍO Y A CAMBIADO EL ESTADO DE DISCO PRESTADO 
                        A OTRO VALOR ¡"¡ESTO SE VERÁ COMO UNA MODIFICACIÓN DE ESTE DISCO!"! POR LO TANTO PODRÁ ACTUALIZARSE ESTE DISCO).

            EJEMPLO 1: 
            (TRUE && (FALSE || TRUE)) 
                1.- (TRUE) NO HAY ERRORES.
                2.- (FALSE) ESTÁ VACÍO EL FORMULARIO (NO HA ESCRITO NADA).
                3.- (TRUE) EL USUARIO HA CAMBIADO EL ESTADO DE PRESTADO.
                POR LO TANTO EL BOTÓN DE ACTUALIZAR DISCO SE HABILITA.
            EJEMPLO 2:
            (TRUE && (TRUE || FALSE)) 
                1.- (TRUE) NO HAY ERRORES.
                2.- (TRUE) EL FORMULARIO NO ESTÁ VACÍO (HA ESCRITO ALGO).
                3.- (FALSE) EL USUARIO NO HA CAMBIADO EL ESTADO DE PRESTADO.
                POR LO TANTO EL BOTÓN DE ACTUALIZAR DISCO SE HABILITA.

            PD: PODRÁ DECIRSE QUE EL PARÉNTESIS DESPUÉS DEL OPERADOR && ES UNA CONDICIÓN QUE HABLA SOBRE EL CAMBIO DEL ESTADO DEL FORMULARIO.
        *********************************************************************
       
        const prestadoModificado = formulario.prestado !== discoEditar.prestado; //¿¿HA CAMBIADO EL VALOR DE SI EL DISCO ES PRESTADO??
        //Si el formulario NO contiene errores habilitamos el botón de actualizar disco.
        if (!contieneErrores(errores) && (!formularioVacio(formulario) || prestadoModificado)) {
            console.log("algo")
            setDisabled(false); // Cambiamos el estado a habilitado para actualizar los datos del disco.
        } else {
            setDisabled(true); // Cambiamos el estado a deshabilitado para actualizar los datos del disco.
        }
    }, [formulario, errores]); //Dependemos de los cambios en el objeto formulario y de errores */
    useEffect(() => {
        /***************************
          Objetivo:
          Habilitar el botón de "Actualizar disco" solo si:
            1. No hay errores en el formulario.
            2. El usuario ha modificado algún campo del formulario
               - Esto incluye cambios en textos (titulo, grupo, etc.)
               - O cambios en el checkbox "prestado"
        ***************************/

        // 1️ Comprobamos si el formulario de texto está vacío
        // Solo consideramos los campos que NO son booleanos
        const camposTextoVacios = Object.keys(formulario)
            .filter(key => typeof formulario[key] !== 'boolean') // ignoramos checkbox
            .every(key => formulario[key].trim() === ''); // true si todos los textos están vacíos

        // 2️ Comprobamos si el checkbox "prestado" ha cambiado
        const prestadoModificado = formulario.prestado !== discoEditar.prestado;

        // 3️ Determinamos si el formulario se ha modificado
        // Se considera modificado si hay texto escrito o si se cambió el checkbox
        const formularioModificado = !camposTextoVacios || prestadoModificado;

        // 4️ Habilitamos o deshabilitamos el botón
        if (!contieneErrores(errores) && formularioModificado) {
            setDisabled(false); // habilitamos botón
        } else {
            setDisabled(true);  // deshabilitamos botón
        }

    }, [formulario, errores, discoEditar]); // dependencias necesarias

    return (
        <div>
            <h2>Editar Disco: {discoEditar.nombre}</h2>
            <div className="container-editar-disco">
                <fieldset>
                    <legend>Editar</legend>
                    {/*He investigado sobre este evento onBlur y me parece majestuoso, en cuanto un input ha sido tocado y cambia el usuario el foco donde estaba interactuando se activa este evento.*/}
                    {/*Entonces cuando se ha cambiado el foco, llamo a la función validar input.*/}
                    <form name="formDiscos" ref={formRef} >
                        <label htmlFor="nombre">Nombre: </label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            placeholder="Nombre del disco"
                            onChange={cambiarEstado}
                            onBlur={(evento) => {
                                validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                            }}
                            required
                        />
                        { //En caso de que en el estado errores haya errores los mostramos.
                            errores.nombre && (
                                <div className='mensaje-error'>
                                    {errores.nombre}
                                </div>
                            )
                        }

                        <label htmlFor="caratula">Caratula del disco: </label>
                        <input
                            id="caratula"
                            type="text"
                            name="caratula"
                            placeholder="Url de la caratula del disco"
                            onChange={cambiarEstado}
                            onBlur={(evento) => {
                                validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                            }}
                        />
                        { //En caso de que en el estado errores haya errores los mostramos.
                            errores.caratula && (
                                <div className='mensaje-error'>
                                    {errores.caratula}
                                </div>
                            )
                        }

                        <label htmlFor="grupo">Grupo o intérprete: </label>
                        <input
                            id="grupo"
                            type="text"
                            name="grupoInterprete"
                            placeholder="Grupo o Intérprete del disco"
                            onChange={cambiarEstado}
                            onBlur={(evento) => {
                                validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                            }}
                            required
                        />
                        { //En caso de que en el estado errores haya errores los mostramos.
                            errores.grupoInterprete && (
                                <div className='mensaje-error'>
                                    {errores.grupoInterprete}
                                </div>
                            )
                        }

                        <label htmlFor="año">Año de publicación: </label>
                        <input
                            id="año"
                            type="text"
                            name="año"
                            placeholder="Año de publicación del disco"
                            onChange={cambiarEstado}
                            onBlur={(evento) => {
                                validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                            }}
                        />
                        { //En caso de que en el estado errores haya errores los mostramos.
                            errores.año && (
                                <div className='mensaje-error'>
                                    {errores.año}
                                </div>
                            )
                        }

                        <label htmlFor="genero">Género: </label>
                        <select name="genero" id="genero" value={discoEditar.genero} onChange={cambiarEstado} >
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
                            placeholder="Localización del disco: ES-001AA"
                            onChange={cambiarEstado}
                            onBlur={(evento) => {
                                validarInput(evento, errores, setErrores); //Vamos al fichero forms.js
                            }}
                        />
                        { //En caso de que en el estado errores haya errores los mostramos.
                            errores.localizacion && (
                                <div className='mensaje-error'>
                                    {errores.localizacion}
                                </div>
                            )
                        }

                        <div className="checkbox-container">
                            <label htmlFor="prestado">Prestado: </label>
                            <input
                                type="checkbox"
                                id="prestado"
                                name="prestado"
                                checked={discoEditar.prestado}
                                onChange={cambiarEstado}
                            />
                        </div>

                        <button
                            type='button'
                            disabled={disabled}
                            onClick={() => {
                                editarDisco();
                            }}
                        >
                            Guardar
                        </button>

                    </form>
                </fieldset>
                {
                    !discoEditar ? <Cargando /> : (
                        <div className='container-disco'>
                            <h2>Valores del disco sin editar</h2>
                            <h3>Nombre: {discoEditar.nombre}</h3>
                            {discoEditar.caratula && <p>Carátula:</p>}
                            {discoEditar.caratula && (<img src={discoEditar.caratula} alt={`Caratula del disco ${discoEditar.nombre}`} />)}
                            <p>Grupo/Intérprete: {discoEditar.grupoInterprete}</p>
                            {discoEditar.genero && <strong>Género: {discoEditar.genero}</strong>}
                            {discoEditar.localizacion && <p>Localización: {discoEditar.localizacion}</p>}
                            {discoEditar.prestado && <strong>Prestado</strong>}
                            {discoEditar.año && <small>Año: {discoEditar.año}</small>}

                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default EditarDisco;