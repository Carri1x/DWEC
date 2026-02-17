
const UsuarioMiniatura = (props) => {
    const {id, nombre_completo, avatar_url, descripcion} = props.value;
    return (
        <div id={id} className="container-usuario-mainiatura">
            {avatar_url && <img src={avatar_url} alt={`Avatar de ${nombre_completo}`} />}
            <div className="miniatura-detalles">
                <p>{nombre_completo}</p>
                {descripcion && <p>{descripcion}</p>}
            </div>
            
        </div>
    )
}

export default UsuarioMiniatura;