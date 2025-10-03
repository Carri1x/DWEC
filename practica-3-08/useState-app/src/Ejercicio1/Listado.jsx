import React, {useState} from "react";
import './Listado.css';

const Listado = () => {
    //Creo la variable Vegeta numeros. 
    const [numeros, setNumeros] = useState([]);

    /**
     * Genera un número aleatorio entre 1 y 100.
     * En caso de que ya exista este número se llama a si misma para generar otro número.
     */
    const generarNumero = () => {
        //Generamos el nuevo número
        let nuevoNum = Math.floor(Math.random() * 100) + 1;
        //Comprobamos si ha llegado a 100 elementos.
        if(numeros.length < 100){
            for(const numero of numeros){
                //Si el número existe en el array usamos recursividad.
                if(numero === nuevoNum){
                    generarNumero();
                    return;
                }
            }
        }
        //Guardamos el nuevo número, que no existe, en este array.
        setNumeros([...numeros, nuevoNum]);
    }

    /**
     * Eliminamos los números del array números.
     */
    const eliminarNumeros = () => {
        setNumeros([]);
    }

    /**
     * Ordena el array números.
     */
    const ordenar = () => {
        let ordenados = [...numeros].sort((a, b) => a - b);
        setNumeros(ordenados);
    }

    return(
        <>
        <ul>
            {
            //Si números tiene algún elemento y es un Array hacemos un print de números.
            numeros.length && Array.isArray(numeros) ? 
                numeros.map(numero => {
                    //Por cada número añadimos un elemento <li></li> y lo printeamos.
                    return (
                        <li
                            key={crypto.randomUUID()}
                        >
                        {numero}
                        </li>
                    );
                }) 

            : "No hay números."
            }
        </ul>
        <button onClick={() => {
            //Llamamos a la función que genera un número aleatorio.
            generarNumero()
            }}>Generar</button>

        <button onClick={() => {
            //Llamamos a la función que elimina todos los números.
            eliminarNumeros()
            }}>Eliminar</button>

        <button onClick={() => {
            //Llamamos a la función que ordena el array de números.
            ordenar()
            }}>Ordenar</button>
        </>
    );
}

export default Listado;