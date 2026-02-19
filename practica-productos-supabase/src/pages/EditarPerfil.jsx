import { useState } from "react";
import { useParams } from "react-router-dom";

const EditarPerfil = () => {
    const {idUsuario} = useParams();

    const fromularioInicial = {
        
    }

    const [formulario, setFormulario] = useState(formularioInicial);

    const actualizarEstadoPerfil = (evento) => {
        const {name, value} = evento.target;
        
    }

    console.log(idUsuario)
    return(
        <>
            <div className="contenedor-editar-perfil">
                <form>
                    <label htmlFor="nombre">Nombre: </label>
                    <input type="text" name="nombre" id="nombre" 
                        onChange={(evento) => {
                            actualizarEstadoPerfil(evento)
                        }}
                    />

                    <label htmlFor="descripcion">Descripcion: </label>
                    <textarea name="descripcion" rows={20} cols={40}
                        onChange={(evento) => {
                            actualizarEstadoPerfil(evento)
                        }}
                    />
                </form>

            </div>
        </>
    )
}

export default EditarPerfil;