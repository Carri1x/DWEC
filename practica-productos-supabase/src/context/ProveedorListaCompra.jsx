import { createContext } from "react"

const contextoListaCompra = createContext();
const ProveedorListaCompra = ({children}) => {

    
    return (
        <contextoListaCompra.Provider value={{}}>
            {children}
        </contextoListaCompra.Provider>
    );
};

export default ProveedorListaCompra;
export {contextoListaCompra};