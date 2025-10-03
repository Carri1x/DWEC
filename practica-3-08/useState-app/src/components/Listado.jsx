import React, {useState} from "react";

const Listado = () => {
    const [numeros, setNumeros] = useState([]);

    const generarNumero = () => {
        let nuevoNum = Math.floor(Math.random() * 100) + 1;
        if(numeros.length < 100){
            for(const numero of numeros){
                if(numero === nuevoNum){
                    generarNumero();
                    return;
                }
            }
        }
        setNumeros([...numeros, nuevoNum]);
    }

    const eliminarNumeros = () => {
        setNumeros([]);
    }

    const ordenar = () => {
        let ordenados = [...numeros].sort((a, b) => a - b);
        setNumeros(ordenados);
    }

    return(
        <>
        <ul>
            {numeros.length && Array.isArray(numeros) ? 
                numeros.map(numero => {
                    return (
                        <li
                            key={crypto.randomUUID()}
                        >
                        {numero}
                        </li>
                    );
                }) 

            : "No hay números."}
        </ul>
        <button onClick={generarNumero}>Generar</button>
        <button onClick={eliminarNumeros}>Eliminar</button>
        <button onClick={ordenar}>Ordenar</button>
        </>
    );
}

export default Listado;