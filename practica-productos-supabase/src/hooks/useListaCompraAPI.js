import { useState } from "react";

const useAPI = () => {
    const [cargando, setCargando] = useState(false);

    const peticion = async() => {
        try {
            const {data, error} = await query;
            if(error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }

    }

    return {

    }
}

export default useListaCompraAPI;