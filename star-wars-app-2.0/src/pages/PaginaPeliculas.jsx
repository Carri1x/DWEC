import { useState } from "react";
import ProveedorPeliculas from "../context/ProveedorPeliculas.jsx";
import Pelicula from '../components/Pelicula.jsx';
import ListaPeliculas from "../components/ListaPeliculas.jsx";


const PaginaPeliculas = () => {
    const [idPelicula, setIdPelicula] = useState(0);

    const mostrarDetallesPelicula = (evento) =>{
        //Si es el contenedor de la película que se ha querido seleccionar procedemos a mandar el id en el componente Pelicula para mostrar los detalles.
        if(evento.target.classList.contains('contenedor-pelicula-nombre')){
            const idPeliculaSeleccionada = evento.target.id;
            setIdPelicula(idPeliculaSeleccionada);
        }
    }

    return (
        <div className="contenedor-pagina-peliculas" onClick={mostrarDetallesPelicula}>
            <ProveedorPeliculas>
                <ListaPeliculas />
                {
                    //Si ha sido seleccionado el id mostramos la película entera, en caso contrario un mensaje ofreciendo la opción de ver una película.
                    idPelicula !== 0 ? 
                        <Pelicula idPeliculaSeleccionada={idPelicula} /> :
                            <p>Selecciona una película para ver sus detalles</p>
                }
            </ProveedorPeliculas>
        </div>
    );
}

export default PaginaPeliculas;