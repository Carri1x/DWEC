import { createContext , useEffect, useState} from "react";
import { traerPeliculas } from "../libraries/peticiones";

const contextoPeliculas = createContext();

const ProveedorPeliculas = ({children}) => {
    
    const urlsPeliculas = [
        "https://swapi.py4e.com/api/films/",
        "https://swapi.info/api/films",
        "https://swapi.dev/api/films/"
    ]
    const [peliculas, setPeliculas] = useState([]);

    /**
     * Función que busca las películas en las urls pasadas por parámetro.
     * ¡Importante! Los datos serán de la primera url que haya respondido primero.
     * 
     * Los datos se cargan en el State películas.  
     * 
     * @param {String[]} urls La dirección donde se van a pedir los datos para recoger las películas.
     */
    const cargarPeliculas = async (urls) => {
        const peliculasDB = await traerPeliculas(urls);
        setPeliculas(peliculasDB);
    }

    useEffect(() => {
        cargarPeliculas(urlsPeliculas);
    },[]);

    return(
        <contextoPeliculas value={peliculas}> 
            {children}
        </contextoPeliculas>
    );
}

export default ProveedorPeliculas;

export {contextoPeliculas};