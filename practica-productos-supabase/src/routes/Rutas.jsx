import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Inicio from "../pages/Inicio.jsx";
import ListadoProductos from '../pages/ListadoProductos.jsx'
import CrearProducto from "../pages/CrearProducto.jsx";
import EditarProducto from "../pages/EditarProducto.jsx";
import ListaCompraDetalles from "../pages/ListaCompraDetalles.jsx";

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Inicio />}/>
                <Route path="*" element={<Inicio />} />
                <Route path="/login" element={<Login/>}/> 
                <Route path="/register" element={<Register />} /> 
                <Route path="/crear-producto" element={<CrearProducto/>} /> 
                <Route path="/editar-producto/:idProducto" element={<EditarProducto/>} /> 
                <Route path="/listado-productos" element={<ListadoProductos />}/>
                <Route path="/lista-compra/:idLista" element={<ListaCompraDetalles/>} />
                <Route path="/lista-compra/" element={<ListaCompraDetalles/>} />
            </Routes>
        </>
    );
};

export default Rutas;