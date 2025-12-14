import ProveedorPeliculas from "../context/ProveedorPeliculas.jsx";
import PeliculaNombres from "../components/PeliculaNombres.jsx";
const PaginaPeliculas = () => {
    return (
        <div className="contenedor-pagina-peliculas">
            <ProveedorPeliculas>
                <PeliculaNombres />
            </ProveedorPeliculas>
        </div>
    );
}

export default PaginaPeliculas;