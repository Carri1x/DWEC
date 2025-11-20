

const InsertarDisco = () => {
    return (
        <>
            <fieldset>
                <legend>Añadir disco</legend>
                <form name="formDiscos">
                    <label htmlFor="nombre">Nombre: </label>
                    <input id="nombre" type="text" name="nombre" placeholder="Nombre del disco" />

                    <label htmlFor="caratula">Caratula del disco: </label>
                    <input
                        id="caratula"
                        type="text"
                        name="caratula"
                        placeholder="Url de la caratula del disco"
                    />

                    <label htmlFor="grupo">Grupo o intérprete: </label>
                    <input
                        id="grupo"
                        type="text"
                        name="grupoInterprete"
                        placeholder="Grupo o Intérprete del disco"
                    />

                    <label htmlFor="año">Año de publicación: </label>
                    <input
                        id="año"
                        type="text"
                        name="año"
                        placeholder="Año de publicación del disco"
                    />

                    <label htmlFor="genero">Género: </label>
                    <select name="genero" id="genero">
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
                    <input type="text" is="localizacion" name="localizacion" placeholder="Localización del disco: ES-001AA" />

                    <div className="checkbox-container">
                        <label htmlFor="prestado">Prestado: </label>
                        <input type="checkbox" id="prestado" name="prestado" />
                    </div>

                    <button>Guardar</button>

                </form>
            </fieldset>
        </>
    );
}

export default InsertarDisco;