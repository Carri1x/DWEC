import './CalculoCantidadPrecio.css';
import { useState, useEffect } from 'react';
import { formatearPesoEspanya, formatearMonedaEspanya } from '../libraries/libreria.js';
import useContextoListaCompra from '../hooks/useContextoListaCompra.js';

const CalculoCantidadPrecio = () => {

    const {
        lista,
    } = useContextoListaCompra()

    //Estos estados tienen que ver con el total, tanto cantidad, como coste y el peso de toda la lista del usuario.
    const [cantidadTotalProductos, setCantidadTotalProductos] = useState(0);
    const [costeTotalProductos, setCosteTotalProductos] = useState(0);
    const [pesoTotalProductos, setPesoTotalProductos] = useState(0);

    const calcularCestaUsuario = () => {
        //Si no hay productos en la lista no hacemos la operación.
        if (!lista.productos) return;
        //--------------------------------------- CÁLCULO CANTIDAD TOTAL PRODUCTOS --------------------------------
        //Sacamos la cantidad total de los productos de la lista.
        const cantidad = lista.productos.reduce((acum, producto) => {
            return acum + producto.cantidad;
        }, 0); // NOTA RECORDATORIO: Si no ponemos este cero en la primera iteración acum será igual a un producto por lo tanto será [object Object]+segundoValor.

        setCantidadTotalProductos(cantidad);

        //--------------------------------------- CÁLCULO PRECIO TOTAL PRODUCTOS --------------------------------
        const precio = lista.productos.reduce((acum, producto) => {
            return acum + (producto.precio * producto.cantidad);
        }, 0); // NOTA RECORDATORIO: Si no ponemos este cero en la primera iteración acum será igual a un producto por lo tanto será [object Object]+segundoValor.
        setCosteTotalProductos(precio);

        //--------------------------------------- CÁLCULO PESO TOTAL PRODUCTOS --------------------------------
        const peso = lista.productos.reduce((acum, producto) => {
            return acum + (producto.peso * producto.cantidad);
        }, 0); // NOTA RECORDATORIO: Si no ponemos este cero en la primera iteración acum será igual a un producto por lo tanto será [object Object]+segundoValor.
        setPesoTotalProductos(peso);
    }

    /**
     * Este useEffect va a calcular el TOTAL DE LOS PRODUCTOS que tiene el usuario, el TOTAL DEL PRECIO y el TOTAL DEL PESO.
     */
    useEffect(() => {
        calcularCestaUsuario();
    });

    return (
      <>
        {cantidadTotalProductos !== 0 && 
        (
          <div className="total-cantida-precio-lista">
            <p>Total productos: {cantidadTotalProductos}</p>
            <p>Total peso: {formatearPesoEspanya(pesoTotalProductos)} kg</p>
            <p>Total precio: {formatearMonedaEspanya(costeTotalProductos)}</p>
            {
              //En caso de que el peso sea mayor que 10 kg pasaremos a avisar al usuario para que traiga su coche por el peso excesivo.
              pesoTotalProductos >= 10 && (
                <div className="aviso-peso-elevado">
                  <p>
                    El peso es muy elevado, recomendamos venir en coche para
                    recoger su compra.
                  </p>
                </div>
              )
            }
          </div>
        )}
      </>
    );
}

export default CalculoCantidadPrecio;