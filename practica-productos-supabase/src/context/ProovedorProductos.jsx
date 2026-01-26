import { createContext, useEffect } from "react";
import useProductosAPI from "../hooks/useProductosAPI.js";

const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {
    const errorInicial = '';

    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState(errorInicial);
    const { traerProductos } = useProductosAPI();

    const cargarProductos = async() => {
        try {
            const productosAPI =  await traerProductos();
            
            setProductos(productosAPI);

        } catch (error) {  
            setMensaje(error.message);
        }
    }

    

    const datosAExportar = {
        mensaje,
        productos,
        cargarProductos,
    }

    return (
        <contextoProductos.Provider value={datosAExportar}>
            {children}
        </contextoProductos.Provider>
    );
};
export default ProveedorProductos;