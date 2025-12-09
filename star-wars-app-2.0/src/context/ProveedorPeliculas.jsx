import { createContext , useState} from "react";

const contextoPeliculas = createContext();

const ProveedorPeliculas = ({children}) => {

    const [peliculas, setPeliculas] = useState([]);

    return(
        <contextoPeliculas> 
            {children}
        </contextoPeliculas>
    );
}

export default ProveedorPeliculas;

export {contextoPeliculas};