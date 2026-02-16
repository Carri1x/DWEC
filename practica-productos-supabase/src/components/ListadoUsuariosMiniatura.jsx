 import useContextoListaCompra from '../hooks/useContextoListaCompra.js';
import UsuarioMiniatura from './UsuarioMiniatura.jsx';

const ListadoUsuariosMiniatura = () => {

    const {
        usuarios,
    } = useContextoListaCompra();

    console.log(usuarios)

    return (
        <div className="listado-usuarios-miniatura">
            {
                usuarios && usuarios.length > 0 
                && usuarios.map((usuario) => {
                    return <UsuarioMiniatura value={usuario}/>
                })
            }
        </div>
    )
}

export default ListadoUsuariosMiniatura;