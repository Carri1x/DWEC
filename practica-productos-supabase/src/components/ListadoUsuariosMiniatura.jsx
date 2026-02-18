import './ListadoUsuariosMiniatura.css'
import useContextoListaCompra from '../hooks/useContextoListaCompra.js';
import UsuarioMiniatura from './UsuarioMiniatura.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const ListadoUsuariosMiniatura = () => {

    const {
        usuarios,
        eliminarUsuario,
    } = useContextoListaCompra();

    const navegar = useNavigate();

    return (
        <div className="listado-usuarios-miniatura"
            onClick={async(evento) => {
                //Si el TARGET esta dentro de .container-usuario-miniatura y no es la papelera, 
                // cargaremos todas las listas del usuario al que se le ha seleccionado en el listado de usuarios.
                if(evento.target.closest('.container-usuario-miniatura') && !evento.target.classList.contains('papelera')){
                    const idPropietario = evento.target.closest('.container-usuario-miniatura').id;
                    navegar(`/lista-compra/usuario/${idPropietario}`);  
                    return;                  
                }
                //Si el TARGET está dentro de .container-usuario-miniatura y ES LA PAPELERA, 
                // ELIMINAREMOS AL USUARIO.
                if(evento.target.closest('.container-usuario-miniatura') && evento.target.classList.contains('papelera')) {
                    const idUsuario = evento.target.closest('.container-usuario-miniatura').id;
                    alert("Porque entra en borrar usuario??")
                    //await eliminarUsuario(idUsuario)
                }
            }}
        >
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