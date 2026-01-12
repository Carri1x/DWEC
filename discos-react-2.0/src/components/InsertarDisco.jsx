import './InsertarDisco.css';
import { useEffect, useRef, useState, useContext } from 'react';
import { validarInput, formularioValido, crearDisco } from '../libraries/forms.js';
import MensajeFlotante from './MensajeFlotante.jsx';
import { contextoDiscos } from '../context/ProveedorDiscos.jsx';

const InsertarDisco = () => {
    const formInicial = {
        nombre: "",
        caratula: "",
        grupoInterprete: "",
        año: "",
        genero: "",
        localizacion: "",
        prestado: false
    };

    const { guardarDisco } = useContext(contextoDiscos);

    //Estado del formulario.
    const [formulario, setFormulario] = useState(formInicial);
    //Estado de los errores del formulario.
    const [errores, setErrores] = useState(formInicial);
    //Variable para controlar el estado del botón de guardar disco.
    const [disabled, setDisabled] = useState(true);
    //Variable para controlar la visibilidad del mensaje flotante.
    const [esVisible, setEsVisible] = useState(false);
    //Referencia al formulario para resetearlo y limpiar sus inputs.
    const formRef = useRef(null);
    //Variables para el mensaje de disco guardado en la base de datos.
    const [mensaje, setMensaje] = useState(''); //Es el mensaje que se le va a mostrar al usuario.
    const [estado, setEstado] = useState('') //Es estado de className que se la va implementar dentro


    const mostrarMensaje = (mensaje, guardado) => {
        //Si se ha guardado el disco añadiremos el estado de este como guardado o no guardado (COLOR DEL MENSAJE)
        let exitoDeGuardado = 'disco-no-guardado'
        if (guardado) {
            exitoDeGuardado = 'disco-guardado';
        }

        setMensaje(mensaje);
        setEstado(exitoDeGuardado);
        setEsVisible(true);
        setTimeout(() => {
            setEsVisible(false);
        }, 3000);
    }

    /**
     * Cambiamos el valor del formulario, de forma que cada cambio en el input está controlado.
     * @param {Input que ha accionado el evento} evento 
     */
    const cambiarEstado = (evento) => {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    const guardarDiscoBD = async () => {
        // Si el formulario es válido lo guardamos.
        if (formularioValido(formulario, errores)) {
            const discoTemp = crearDisco(formulario);
            try {
                const discoGuardado = await guardarDisco(discoTemp);
                // Mostramos mensaje de éxito. TRUE SI HA SIDO GUARDADO.
                mostrarMensaje(`El disco ${discoGuardado.nombre}, se ha guardado correctamente.`, true)

                // Reseteamos el formulario.
                setFormulario(formInicial);
                formRef.current.reset();
                return;
            } catch (error) {
                mostrarMensaje(`${error.message}`, false);
            }
        } else {
            //En caso de que no se haya podido guardar en la base de datos notificamos al usuario.
            // Mostramos el mensaje de error. FALSE SI NO HA SIDO GUARDADO.
            mostrarMensaje(`El disco no se ha podido guardar en la base de datos, revisa las credenciales. `, false);
        }
    }

    useEffect(() => {
        //Si el formulario tiene los campos obligatiorios con valores y NO contiene errores habilitamos el botón de guardar disco.
        if (formularioValido(formulario, errores)) {
            setDisabled(false); // Cambiamos el estado a habilitado para guardar los datos del disco.
        } else {
            setDisabled(true); // Cambiamos el estado a deshabilitado para guardar los datos del disco.
        }
    }, [formulario, errores]); //Dependemos de los cambios en el objeto formulario y de errores 

    return (
        <>
            {esVisible && (<MensajeFlotante mensaje={mensaje} estado={estado} />)}
            <fieldset>
                <legend>Añadir disco</legend>
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
                    <select name="genero" id="genero" onChange={cambiarEstado} >
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
                            onChange={cambiarEstado}
                        />
                    </div>

                    <button
                        type='button'
                        disabled={disabled}
                        onClick={() => {
                            guardarDiscoBD();
                        }}
                    >
                        Guardar
                    </button>

                </form>
            </fieldset>
        </>
    );
}

export default InsertarDisco;