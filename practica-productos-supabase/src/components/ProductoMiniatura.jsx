import './ProductoMiniatura.css';
import añadir from '../assets/icono-mas.png';
import papelera from '../assets/papelera.png';  
import iconoMenos from '../assets/icono-menos.png';
import { useState, useEffect } from 'react';
import useContextoListaCompra from '../hooks/useContextoListaCompra.js';

const ProductoMiniatura = (props) => {
    const {
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

    useEffect(() => {
        if (cantidadProducto === cantidad) return;

        // Creamos un temporizador de 4 segundos.
        const temporizador = setTimeout(() => {
            if (!cantidadProducto) return; 
            console.log(`Enviando al backend: ${cantidadProducto} unidades de ${nombre}`);
            actualizarProductoCantidad(idLista, id, cantidadProducto);
        }, 4000);

        // Si el usuario vuelve a clicar antes de que pase el segundo, limpiamos el anterior temporizador.
        return () => clearTimeout(temporizador);
    }, [cantidadProducto]); 

    return (
        <div id={id} className="container-producto-miniatura">
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