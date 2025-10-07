import React, {useState} from "react";
import './Matricula.css'
import DiscentesList from './DiscentesList';

const Matricula = (props) => {
    const todos = props.alumnos.discentes;
    const [discentes, setDiscentes] = useState(todos);
    const [ordenAscendente, setOrdenAscendente] = useState(true);

    /**
     * Función para filtrar por los discentes deseados.
     * @param {*} condicion = Tipo de discentes que deseamos que aparezcan en el navegador.
     */
    const filtrarDiscentes = (condicion) => {
        //Si la condición es 'TODOS' asignamos el valor principal de todos los discentes.
        if(condicion == 'TODOS') {
            setDiscentes(todos);
        } else {
            //Si no es todos y es otra condición, hacemos el cambio.
            setDiscentes(
                //Filtramos los discentes desde todos .
                todos.filter((discente) => {
                    //Vemos todos los atributos para reutilizar esta misma función 'filtarDiscentes'.
                    for (const atributo in discente) {
                        if (!Object.hasOwn(discente, atributo)) return;
                        //Si el valor de alguno de los atributos coincide con la condición le permitimos el acceso a setDiscentes.
                        if (discente[atributo] === condicion) return true;
                        //Si el valor de alguno de sus atributos incluye la condición le permitimos el acceso a setDiscentes.
                        if (String(discente[atributo]).includes(condicion)) return true;
                    }
                    //Si no ha entrado en ninguno de los 'if' no queremos que entre en setDiscentes.
                    return false;
                })
            );
        }
    }

    /**
     * Función para ordenar los discentes en el estado que discentes se encuentre en ese mismo momento.
     */
    const ordenar = () => {
        //Creamos un array de discentes temporal.
        const temp = [...discentes];

        temp.sort((a, b) => {
            const apellidoA = a.apellidos.toLowerCase();
            const apellidoB = b.apellidos.toLowerCase();
            //En caso de que sea orden ascendente daremos el resultado que sería normalmente haciendo un .sort.
            //Si es orden descendente damos el inverso.
            if(apellidoA > apellidoB) return ordenAscendente ? 1 : -1;
            //Aquí igual, si el orden es ascendente damos el resultado normal de ejecutar un .sort.
            //Si es descendente damos el resultado inverso.
            if(apellidoA < apellidoB) return ordenAscendente ? -1 : 1;
            //Si son iguales los nombres damos 0.
            return 0;
        });

        //Una vez ordenado asignamos cambiamos el estado.
        setDiscentes(temp);
        //Cambiamos el orden de ascendente a descendente y viceversa para la próxima vez.
        setOrdenAscendente(!ordenAscendente);
    }

    const desmatricular = (id) => {
        setDiscentes(
            todos.map((discente) => {
                if(discente.id !== id){
                    return discente;
                }
            })
        );
    }

    return (
        <>
            <button onClick={() => {
                filtrarDiscentes('TODOS');
            }}>TODOS</button>

            <button onClick={() => {
                filtrarDiscentes('2DAW');
            }}>2DAW</button>

            <button onClick={() => {
                filtrarDiscentes('DAW');
            }}>Curso DAW</button>
            
            <button onClick={() => {
                filtrarDiscentes('lectura');
            }}>Afición a la Lectura</button>

            <button onClick={() => {
                ordenar();
            }}>Ordenar</button>

            <button >Desmatricular</button>

            <DiscentesList discentes={discentes} funcionDesmatricular = {desmatricular} />
        </>
    );
}


export default Matricula;