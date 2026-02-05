import './ListaCompra.css'
import { formatearFechaHoraSupabase } from "../libraries/libreria.js";
import papelera from '../assets/papelera.png';

const ListaCompra = (props) => {

    const {id, created_at, nombre} = props.value;

    return (
        <div className="container-lista" data-id={`${id}`}>
            <div className="lista-nombre">
                <p>{nombre}</p>
                <img src={papelera} alt="Papelera de reciclage" />
            </div>
            <small>Creada el día: {formatearFechaHoraSupabase(created_at)}</small>
        </div>
    )
}
export default ListaCompra;