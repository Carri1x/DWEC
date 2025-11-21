import './InsertarDisco.css';
import { useEffect, useRef, useState } from 'react';
import { validarInput, contieneErrores, formularioValido } from '../libraries/forms.js';
import { printObject } from '../libraries/util.js';

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
    const [formulario, setFormulario] = useState(formInicial);
    const [errores, setErrores] = useState(formInicial);
    const [disabled, setDisabled] = useState(true);
    const formRef = useRef(null);

    /**
     * Cambiamos el valor del formulario, de forma que cada cambio en el input está controlado.
     * @param {Input que ha accionado el evento} evento 
     */
    const cambiarEstado = (evento) => {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    useEffect(() => {
        //Si el formulario tiene los campos obligatiorios con valores y NO contiene errores habilitamos el botón de guardar disco.
        if(formularioValido(formulario, errores)){
            setDisabled(false); // Cambiamos el estado a habilitado para guardar los datos del disco.
        } else {
            setDisabled(true); // Cambiamos el estado a deshabilitado para guardar los datos del disco.
        }
    },[formulario,errores]); //Dependemos de los cambios en el objeto formulario y de errores 

    return (
        <>
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
                        
                    >
                        Guardar
                    </button>

                </form>
            </fieldset>
        </>
    );
}

export default InsertarDisco;