import './UsuarioMiniatura.css';

const UsuarioMiniatura = (props) => {
    const {id, nombre_completo, avatar_url} = props.value;
    return (
        <div id={id} className="container-usuario-miniatura">
            {avatar_url && <img src={avatar_url} alt={`Avatar de ${nombre_completo}`} />}
            <div className="miniatura-detalles">
                <p>{nombre_completo}</p>
            </div>
        </div>
    )
}

export default UsuarioMiniatura;