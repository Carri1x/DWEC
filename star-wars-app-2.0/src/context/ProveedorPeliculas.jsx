import { createContext , useEffect, useState} from "react";
import { traerPeliculas } from "../libraries/peticiones";

const contextoPeliculas = createContext();

const ProveedorPeliculas = ({children}) => {
    
    const urlsPeliculas = [
        "https://swapi.py4e.com/api/films/",
        "https://swapi.info/api/films",
        "https://swapi.dev/api/films/"
    ]
    const [peliculasCntxt, setPeliculasCntxt] = useState([]);
    const [error, setError] = useState('');

    /**
     * Función que busca las películas en las urls pasadas por parámetro.
     * ¡Importante! Los datos serán de la primera url que haya respondido primero.
     * 
     * Los datos se cargan en el State películas.  
     * 
     * @param {String[]} urls La dirección donde se van a pedir los datos para recoger las películas.
     */
    const cargarPeliculas = async (urls) => {
        try{
            const peliculasDB = await traerPeliculas(urls);
            setPeliculasCntxt(peliculasDB);
        }catch(error){
            setError(error.message);
        }
        
    }

    const cosasParaExportar = {
        peliculasCntxt,
        error
    }

    useEffect(() => {
        cargarPeliculas(urlsPeliculas);
    },[]);

    return(
        <contextoPeliculas.Provider value={cosasParaExportar}> 
            {children}
        </contextoPeliculas.Provider>
    );
}

export default ProveedorPeliculas;

export {contextoPeliculas};