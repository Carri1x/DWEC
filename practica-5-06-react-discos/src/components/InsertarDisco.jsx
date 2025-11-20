import './InsertarDisco.css';

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

    const validarInput = (evento) => {
        const {name, value} = evento.target;
        switch(name){
            case 'nombre':
                if(!nombreValido(value)){ //En caso de que el nombre no sea válido. 
                    
                }
                break;
        }
    }

    /**
     * Cambiamos el valor del formulario, de forma que cada cambio en el input está controlado.
     * @param {Input que ha accionado el evento} evento 
     */
    const cambiarEstado = (evento) => {
        const {name, value} = evento.target;
        setFormulario({...formulario, [name]:value});
        validarInput(evento);
    }
    return (
        <>
            <fieldset>
                <legend>Añadir disco</legend>
                <form name="formDiscos">
                    <label htmlFor="nombre">Nombre: </label>
                    <input 
                        id="nombre" 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre del disco"
                        onChange={cambiarEstado}
                    />

                    <label htmlFor="caratula">Caratula del disco: </label>
                    <input
                        id="caratula"
                        type="text"
                        name="caratula"
                        placeholder="Url de la caratula del disco"
                        onChange={cambiarEstado}
                    />

                    <label htmlFor="grupo">Grupo o intérprete: </label>
                    <input
                        id="grupo"
                        type="text"
                        name="grupoInterprete"
                        placeholder="Grupo o Intérprete del disco"
                        onChange={cambiarEstado}
                    />

                    <label htmlFor="año">Año de publicación: </label>
                    <input
                        id="año"
                        type="text"
                        name="año"
                        placeholder="Año de publicación del disco"
                        onChange={cambiarEstado}
                    />

                    <label htmlFor="genero">Género: </label>
                    <select name="genero" id="genero" onChange={cambiarEstado}>
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
                    />

                    <div className="checkbox-container">
                        <label htmlFor="prestado">Prestado: </label>
                        <input 
                            type="checkbox" 
                            id="prestado" 
                            name="prestado"
                            onChange={cambiarEstado} 
                        />
                    </div>

                    <button>Guardar</button>

                </form>
            </fieldset>
        </>
    );
}

export default InsertarDisco;