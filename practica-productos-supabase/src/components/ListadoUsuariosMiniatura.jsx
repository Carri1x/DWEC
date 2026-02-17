import './ListadoUsuariosMiniatura.css'
import useContextoListaCompra from '../hooks/useContextoListaCompra.js';
import UsuarioMiniatura from './UsuarioMiniatura.jsx';

const ListadoUsuariosMiniatura = () => {

    const {
        usuarios,
    } = useContextoListaCompra();

    return (
        <div className="listado-usuarios-miniatura">
            <h2>Listado Usuarios</h2>
            <div className='container-listas'>
                {
                    usuarios && usuarios.length > 0
                    && usuarios.map((usuario) => {
                        return <UsuarioMiniatura key={usuario.id} value={usuario} />
                    })
                }
            </div>
            
        </div>
    )
}

export default ListadoUsuariosMiniatura;