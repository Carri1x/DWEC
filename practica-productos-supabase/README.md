# DOCUMENTACIÓN PARA EL PROFESOR.
He actualizado absolutamente todos los componentes, clases, hooks y componentes. Todo está en código a nivel de temario de clase.

> Si quieres acceder a las otras versiones de la app te dejo [aquí el enlace a mi repositorio **DWEC**](https://github.com/Carri1x/DWEC).


1. He añadido mejoras en: 
    - [En el componente `<Cargando />`](#cargando). 
        Ahora mismo en todas las partes del sitio web si acceden fuera de React (peticiones), saldrá el mensaje (detallado) de la acción que se está llevando a cabo.

    - En el componente `<Rutas />`.
        Antes hacía uso exclusivo (e innecesario) de subrutas (`<Outlet />`) para navegar entre páginas, como: `<ListadoProductos />`, `<EditarProductos />`, `<ListaCompraDetalles />`... He pasado a mejorarlo y dejar todas las rutas planas (sin subrutas); porque era algo innecesario.

    - He puesto comentarios en **todos** los componentes que lo requerían.

>He cambiado "casi" toda la app de productos. Agradecería que le hecharas un vistazo a todo para puedas darme feedback si fuera necesario.


---

# DIFICULTADES ENFRENTADAS EN EL CÓDIGO. :warning:
## CARGANDO
Los componentes comparten la misma variable del HOOK `cargando`, en esta parte modularizamos y tenemos el estado cargando en la parte más alta, por lo que es buena práctia. Pero al compartir ese estado con los demás componentes que hacen una petición lo que provoca es que todos los componentes que están montados y comparten ese mismo estado `cargando` se activen todos los componentes cargando que están en cada una de las partes del código.

:star::star::star::star::star:
Ahora voy a dejar un componente `<Cargando />` de cada proveedor por cada componente padre que vaya a usarlo si los pequeños lo usan pues solamente se iniciará el padre, así no se montarán ninguno de estos porque compartan estado.

Esto ahora me recuerda al cambio de mensaje de lo que está haciendo la IA cuando le preguntas algo y se pone a hacer diferentes cosas para llegar a tu respuesta. Me gusta el resultado que he llegado a este enfrentamiento que al principio era tan complicado...
Ahora es espectacular, en el momento (por ejemplo) que vamos a insertar un producto nuevo hacemos esta función:
##### Crear producto.
:star::star::star::star::star:
```
const crearProducto = async () => {
    try {
        await insertarProductoAPI(nuevoProducto);
        lanzarMensaje(`Producto ${nuevoProducto.nombre} creado correctamente.`);
        cargarProductos();
    } catch (error) {
        lanzarMensaje(error.message, tiposDeMensaje.error)
    } 
}
```
¿Qué va a hacer? Tanto el `mensajeCargando` de `insertarProdutoAPI()` como de `cargarProductos()` entonces si bajamos la latencia de la red en el navegador podremos ver que los dos mensajes aparecen. :rocket:
##### Insertar producto.
```
//1. Inserta producto. Visualiza este mensaje principalmente...

const insertarProductoAPI = async(producto) => {
    setMensajeCargando(`Guardando el producto ${producto.nombre}...`)
    try {
        await peticion(supabaseConexion.from('Productos').insert(producto));
    } catch (error) {
        throw error;
    }
}
```
Luego de haber insertado el producto, recoge todos los productos con `cargarProductos()`.
##### Cargar productos.
```
//2. Carga todos los productos y cambia al mensaje de esta función.
//¡¡Esta (traerProductosAPI())es la función que tiene (cargarProductos()) del HOOK/API!!

const traerProductosAPI = async() => {
    setMensajeCargando('Obteniendo los productos...')
    try {
        const data = await peticion(supabaseConexion.from('Productos').select('*'));
        return data;
    } catch (error) {
        throw error;
    }
}
```


¿Por qué era tan complicado? :tired_face:  Porqué al principio lo tenía en general por encima de todos los componentes y los empezaba a actualizar con useEffect cada vez que lo hacía entonces hacía peticiones infinitas. Hacía el useEffect se actualizaba el estado cargando y así repetidamente haciendo un bucle infinito.:infinity:

---