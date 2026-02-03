
const ListaCompra = (props) => {

    const {id, created_at,nombre} = props.value;

    return (
        <div className="container-lista" data-id={`${id}`}>
            <p>{nombre}</p>
            <small>{created_at}</small>
        </div>
    )
}
export default ListaCompra;