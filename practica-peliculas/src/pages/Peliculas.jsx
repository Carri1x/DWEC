import Contenedor from "../components/Contenedor.jsx";
import PeliculaMiniatura from "../components/PeliculaMiniatura.jsx";
import './Peliculas.css';

const Peliculas = () => {
    let nombreAplicacion = "Práctica 4-07";

    return (
        <>
            <h1>{nombreAplicacion}</h1>
            <div className="peliculas-container">
                <Contenedor>
                    <PeliculaMiniatura
                        titulo="Matrix"
                        cartel="https://m.media-amazon.com/images/I/71D8+NFLZmL._UF1000,1000_QL80_.jpg"
                        año={1999}
                    ></PeliculaMiniatura>
                </Contenedor>

                <Contenedor>
                    <PeliculaMiniatura
                        titulo="Django desencadenado"
                        cartel="https://pics.filmaffinity.com/django_unchained-956246347-mmed.jpg"
                        año={2012}
                    ></PeliculaMiniatura>
                </Contenedor>

                <Contenedor>
                    <PeliculaMiniatura
                        titulo="Shutter Island"
                        cartel="https://m.media-amazon.com/images/M/MV5BN2FjNWExYzEtY2YzOC00YjNlLTllMTQtNmIwM2Q1YzBhOWM1XkEyXkFqcGc@._V1_.jpg"
                        año={2010}
                    ></PeliculaMiniatura>
                </Contenedor>
            </div>
        </>
    );

}

export default Peliculas;