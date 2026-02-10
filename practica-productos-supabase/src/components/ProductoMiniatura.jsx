import './ProductoMiniatura.css';
import añadir from '../assets/icono-mas.png';
import papelera from '../assets/papelera.png';  
import iconoMenos from '../assets/icono-menos.png';
import { useState, useEffect } from 'react';
import useContextoListaCompra from '../hooks/useContextoListaCompra.js';
import Cargando from '../shared/Cargando.jsx';

const ProductoMiniatura = (props) => {
    const {
        cargando,
        actualizarProductoCantidad,
    } = useContextoListaCompra()
    const idLista = props.idLista;
    const {id, nombre, peso, precio, cantidad} = props.value;
    const [cantidadProducto, setCantidadProducto] = useState(cantidad);


    /**
     * Cambia la cantidad de este Producto en concreto. En esta misma Lista.
     * @param {Event} evento 
     * @returns Si se hace un return en esta función es porque se ha terminado la función de "cambiarCantidad".
     */
    const cambiarCantidad = (evento) => {
        const valor = evento.target.value;
        if (valor === '') {
            setCantidadProducto('');
            return;
        }
        const num = parseInt(valor);
        if (isNaN(num)) return;
        setCantidadProducto(num < 0 ? 0 : num);
    };

    
    /**
     * Suma uno la cantidad de este producto en esa misma lista.
     */
    const sumar = () => {
        setCantidadProducto((cant) => {
            return cant + 1
        });
    }

    /**
     * Resta uno la cantidad de este producto en esa misma lista.
     * No puede ser la cantidad menor que uno, en ese caso el usuario deberá eliminar el producto.
     */
    const restar = () => {
        setCantidadProducto((cant) => {
            if(cant <= 1) return 1;
            return cant - 1
        });
    }

    /**
     * Cada vez que cambie la cantidad de un producto, se actualizará esta cantidad en la base de datos.
     * Cada 4 segundos se actualizará la cantidad del producto, si el usuario vuelve a cambiar la cantidad antes de que pasen los 4 segundos,
     * se reiniciará el temporizador y se volverán a contar otros 4 segundos para actualizar la cantidad.
     */
    useEffect(() => {
        if (cantidadProducto === cantidad) return;
        console.log("ProductoMiniatura: La esta liando fuerte")
        // Creamos un temporizador de 4 segundos.
        const temporizador = setTimeout(() => {
            if (!cantidadProducto) return; 
            actualizarProductoCantidad(idLista, id, cantidadProducto);
        }, 4000);

        // Si el usuario vuelve a clicar antes de que pase el segundo, limpiamos el anterior temporizador.
        return () => clearTimeout(temporizador);
    }, [cantidadProducto]); 

    return (
        <div id={id} className="container-producto-miniatura">
            {cargando && <Cargando contexto={'Actualizando la cantidad del producto...'} />}
            <p>{nombre}</p>
            <div className='miniatura-detalles'>
                <p>Peso: {peso}kg</p>
                <p>Precio: {precio}€</p>
                {cantidad && 
                <div className='miniatura-cantidad'> peti
                    <label>Cantidad: {cantidadProducto? cantidadProducto : 0}</label>
                    <input type="text" value={cantidadProducto} onChange={(evento) => {
                        //Cambia la cantidad de este input en cuanto está cambiando este valor del input.
                        cambiarCantidad(evento)
                    }} />
                </div>
                }
            </div>
            <div className='miniatura-opciones'>
                {cantidad && <img src={iconoMenos} alt="Simbolo para restar un producto" onClick={restar}/>}
                <img src={añadir} alt="Símbolo añadir producto" onClick={sumar}/>
                {cantidad && <img src={papelera} className='boton-borrar-producto' alt="Simbolo eliminar"/>}
            </div>
        </div>
    )
}

export default ProductoMiniatura;