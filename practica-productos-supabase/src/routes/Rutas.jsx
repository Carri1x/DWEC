import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Inicio from "../pages/Inicio.jsx";
import PaginaListadoProductos from '../pages/PaginaListadoProductos.jsx'
import CrearProducto from "../pages/CrearProducto.jsx";
import EditarProducto from "../pages/EditarProducto.jsx";
import ListaCompraDetalles from "../pages/ListaCompraDetalles.jsx";
import Perfil from "../pages/Perfil.jsx";


const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Inicio />}/>
                <Route path="*" element={<Inicio />} />
                <Route path="/login" element={<Login/>}/> 
                <Route path="/register" element={<Register />} /> 
                <Route path="/perfil" element={<Perfil />}/>
                <Route path="/crear-producto" element={<CrearProducto/>} /> 
                <Route path="/editar-producto/:idProducto" element={<EditarProducto/>} /> 
                <Route path="/listado-productos" element={<PaginaListadoProductos />}/>
                <Route path="/lista-compra/" element={<ListaCompraDetalles/>} />
                <Route path="/lista-compra/lista/:idLista" element={<ListaCompraDetalles/>} />
                <Route path="/lista-compra/usuario/:idPropietario" element={<ListaCompraDetalles/>}/>
            </Routes>
        </>
    );
};

export default Rutas;