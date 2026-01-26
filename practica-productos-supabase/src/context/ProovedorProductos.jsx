import { createContext } from "react";


const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {


    const [productos, setProductos] = useState([]);

    

    return (
        <contextoProductos.Provider value={{}}>
            {children}
        </contextoProductos.Provider>
    );
};
export default ProveedorProductos;